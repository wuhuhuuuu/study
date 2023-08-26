// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: phone-square;
/********************************************************
 * script     : 10099.js
 * version    : 1.7
 * author     : wuhu.（50岁，来自大佬国的一点乐色
 * date       : 2023-07-02
 * github     : https://github.com/wuhuhuuuu/study/tree/main/Scriptable/10099
 * Changelog  :
v1.0(7.2) - 基本完成所有布局，配合boxjs食用
v1.1(7.3) - 文字排版调整，抄了亿点点代码😂
v1.2(7.5) - 直接做掉cookie失效的通知，防止无效通知刷屏😂，当小组件数据都为0即获取不到信息
v1.3(7.7) - 更改代码逻辑，捕捉错误，使得获取不到数据能显示小组件，不至于ssl错误
v1.4(7.10) - logo缓存机制，防止后续因网络差拉取不到图片，小组件显示不了，存储文件夹为 images/10099
v1.5(7.21) - 新增了锁屏界面AccessoryRec小组件，需iOS16及以上
v1.6(7.23) - 由于目前查询所需数据不仅仅是cookie如此简单，故直接用Boxjs配合10099.cookie.js是最简单的方式，该版本去掉请求数据缓存，直接时刻调用Boxjs数据
v1.7(7.24) - 弃Alert，换UITable，无他，逼格高矣
v1.8(8.27) - filemanager判断更全面，不再局限于icloud
----------------------------------------------- */

let localVersion = "1.8";
let fee = {
  "title": "剩余话费",
  "number": 0,
  "unit": "元",
  "icon": "yensign",
  "iconColor": new Color("000000")
};

let flow = {
  "title": "剩余流量",
  "number": 0,
  "unit": "GB",
  "icon": "antenna.radiowaves.left.and.right",
  "iconColor": new Color("1ab6f8")
};

let voice = {
  "title": "剩余语音",
  "number": 0,
  "unit": "分钟",
  "icon": "phone.fill",
  "iconColor": new Color("30d15b")
};

let updateTime = {
  "title": "更新时间",
  "number": 0,
  "icon": "arrow.triangle.2.circlepath",
  "unit": "",
  "iconColor": new Color("FF8648")
};

async function createAccessoryRec() {
  await userInfo();
  let widget = new ListWidget();
  widget.setPadding(10, 10, 10, 10);
  widget.backgroundColor = Color.dynamic(Color.white(), Color.black());
  const bodyStack = widget.addStack();
  bodyStack.layoutVertically();

  setStack(bodyStack, fee);
  bodyStack.addSpacer(5);
  setStack(bodyStack, flow);
  bodyStack.addSpacer(5);
  setStack(bodyStack, voice);
  await widget.presentAccessoryRectangular();
}

async function createSmall() {
  await userInfo();
  let widget = new ListWidget();
widget.setPadding(10, 10, 10, 10);
widget.backgroundColor = Color.dynamic(Color.white(), Color.black());

  const logoStack = widget.addStack();
  logoStack.addSpacer();
  const logo = logoStack.addImage(
    await logoImage(
      "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/10099/10099.png"
    )
  );
  logo.imageSize = new Size(105.6, 34.8);
  logoStack.addSpacer();
  widget.addSpacer();

  const feeStack = widget.addStack();
  feeStack.centerAlignContent();
  feeStack.addSpacer();
  const feeValue = feeStack.addText("¥" + `${fee.number}`);
  feeValue.font = Font.mediumRoundedSystemFont(21);
  feeStack.addSpacer();
  widget.addSpacer();

  const bodyStack = widget.addStack();
  bodyStack.layoutVertically();

  setStack(bodyStack, flow);
  bodyStack.addSpacer();
  setStack(bodyStack, voice);
  bodyStack.addSpacer();
  setStack(bodyStack, updateTime);
  await widget.presentSmall();
}

async function logoImage(url) {
  const name = url.split("/").pop();
  const fm = icloudOrNot() ? FileManager.iCloud() : FileManager.local();
  const dict = fm.documentsDirectory();
  if (fm.fileExists(`${dict}/images/10099/${name}`)) {
    return Image.fromFile(`${dict}/images/10099/${name}`);
  } else {
    if (!fm.fileExists(`${dict}/images/10099`))
      fm.createDirectory(`${dict}/images/10099`, true);
    try {
      let req = new Request(url);
      const image = await req.loadImage();
      fm.writeImage(`${dict}/images/10099/${name}`, image);
      return image;
    } catch (e) {
      console.warn("logoImage❌❌:\n" + e);
    }
  }
}

function setStack(stack, data) {
  const rowStack = stack.addStack();
  rowStack.centerAlignContent();

  const img = SFSymbol.named(data.icon);
  img.applyHeavyWeight();
  let icon = rowStack.addImage(img.image);
  icon.imageSize = new Size(13, 13);
  icon.tintColor = data.iconColor;
  rowStack.addSpacer(4);
  let title = rowStack.addText(data.title);
  rowStack.addSpacer();
  let number = rowStack.addText(data.number + data.unit);
  title.font = Font.systemFont(13);
  number.font = Font.systemFont(13);
}

async function userInfo() {
  try {
    let reqInfo = await BoxjsData();
    let req = new Request(reqInfo.url);
    req.method = "POST";
    req.headers = reqInfo.headers;
    req.body = reqInfo.body;
    const resp = await req.loadJSON();
    if (resp.status === "000000") {
      fee.number = resp.data.userData.fee / 100;
      flow.number = (resp.data.userData.flow / 1048576).toFixed(2);
      voice.number = resp.data.userData.voice;
      const date = new Date(parseInt(resp.timestamp));
      const time = date.toTimeString();
      const match = time.match(/(\d{2}:\d{2})/);
      updateTime.number = match[0];
    } else {
      console.error("cookie已过期，请重新获取！！");
    }
  } catch (e) {
    console.warn("userInfo❌❌:\n" + e);
  }
}

async function BoxjsData() {
  try {
    const url = "http://boxjs.com/query/boxdata";
    let req = new Request(url);
    const resp = await req.loadJSON();
    const data = resp.datas;
    const sub = JSON.stringify(resp.usercfgs.appsubs);
    const str =
      "https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json";
    const match = sub.match(str);
    if (!match) {
      await setNotification(
        "Boxjs找不到10099相关信息",
        "点击该通知即可一键安装Boxjs订阅！！",
        "http://boxjs.com/#/sub/add/https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json"
      );
    } else {
      if (data["10099"]) {
        const json = JSON.parse(data["10099"]);
        return json;
      } else {
        console.log(
          "Boxjs中获取不到10099相关cookie，请重新用10099.cookie.js获取！！😎😎"
        );
      }
    }
  } catch (e) {
    console.error("BoxjsData❌❌:\n" + e);
  }
}

async function setNotification(title, subtitle, openURL) {
  let notification = new Notification();
  notification.title = title;
  notification.subtitle = subtitle;
  notification.sound = "complete";
  notification.openURL = openURL;
  await notification.schedule();
}

async function previewUITable() {
  const wuhuIntro = UITableCell.text("10099", "Designed by wuhu.");
  wuhuIntro.centerAligned();
  const smallImage = UITableCell.image(
    await logoImage(
      "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/10099/small.jpeg"
    )
  );
  smallImage.rightAligned();
  const recImage = UITableCell.image(
    await logoImage(
      "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/10099/accessoryRec.jpeg"
    )
  );
  recImage.rightAligned();
  const boxjsImage = UITableCell.image(
    await logoImage(
      "https://github.com/chavyleung/scripts/raw/master/box/icons/BoxJs.png"
    )
  );
  boxjsImage.rightAligned();
  const scriptImage = UITableCell.image(
    await logoImage(
      "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/10099/10099.png"
    )
  );
  scriptImage.rightAligned();

  const wuhu = new UITableRow();
  wuhu.addCell(wuhuIntro);
  wuhu.height = 70;
  wuhu.onSelect = async () => {
    await Safari.openInApp("https://github.com/wuhuhuuuu", false);
  };
  wuhu.dismissOnSelect = false;
  const smallWidget = new UITableRow();
  smallWidget.addText("预览", "Small小组件");
  smallWidget.addCell(smallImage);
  smallWidget.height = 125;
  smallWidget.onSelect = async () => {
    await createSmall();
  };
  smallWidget.dismissOnSelect = false;
  const recWidget = new UITableRow();
  recWidget.addText("预览", "Rec小组件");
  recWidget.addCell(recImage);
  recWidget.height = 125;
  recWidget.onSelect = async () => {
    await createAccessoryRec();
  };
  recWidget.dismissOnSelect = false;
  const boxjsSub = new UITableRow();
  boxjsSub.addText("Boxjs订阅", "一键添加");
  boxjsSub.addCell(boxjsImage);
  boxjsSub.height = 125;
  boxjsSub.onSelect = async () => {
    await Safari.openInApp(
      "http://boxjs.com/#/sub/add/https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json",
      false
    );
  };
  boxjsSub.dismissOnSelect = false;
  const updateScript = new UITableRow();
  updateScript.addText("更新脚本", null);
  updateScript.addCell(scriptImage);
  updateScript.height = 125;
  updateScript.onSelect = async () => {
    await update();
  };
  updateScript.dismissOnSelect = false;

  let ui = new UITable();
  ui.addRow(wuhu);
  ui.addRow(smallWidget);
  ui.addRow(recWidget);
  ui.addRow(boxjsSub);
  ui.addRow(updateScript);
  ui.showSeparators = true;
  await ui.present(true);
}

async function update() {
  const fm = icloudOrNot() ? FileManager.iCloud() : FileManager.local();
  const dict = fm.documentsDirectory();
  const scriptName = Script.name();

  const url =
    "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/10099/10099.js";
  let req = new Request(url);
  req.method = "GET";
  const resp = await req.loadString();

  const regex = /let localVersion = "([\d.]+)"/;
  const match = resp.match(regex);
  const version = match ? match[1] : "";

  if (version > localVersion) {
    fm.writeString(`${dict}/${scriptName}.js`, resp);
    let notification = new Notification();
    notification.title = "脚本更新成功啦🎉🎉";
    notification.subtitle = "点击该通知即可跳转！！！";
    notification.sound = "default";
    notification.openURL = `scriptable:///open/${scriptName}`;
    notification.addAction(
      "打开脚本🎉🎉",
      `scriptable:///open/${scriptName}`,
      false
    );
    await notification.schedule();
  } else {
    let notification = new Notification();
    notification.title = "脚本已是最新版，无需更新！🎉🎉";
    notification.sound = "default";
    await notification.schedule();
  }
}

function icloudOrNot() {
  let fm = FileManager
  let result = 1
  try {
    let fm_icloud = fm.iCloud().documentsDirectory()
  } catch (e) {
    result = e ? 0 : 1
  }
  return result
}

if (config.runsInApp) {
  await previewUITable();
} else {
  switch (config.widgetFamily) {
    case "small":
      await createSmall();
      break;
    case "accessoryRectangular":
      await createAccessoryRec();
      break;
  }
}
