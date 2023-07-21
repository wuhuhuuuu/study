// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: phone-square;
/********************************************************
 * script     : 10099.js
 * version    : 1.5
 * author     : wuhu.（50岁，来自大佬国的一点乐色
 * date       : 2023-07-02
 * github     : https://github.com/wuhuhuuuu/study/tree/main/Scriptable/10099
 * Changelog  :
v1.0(7.2) - 基本完成所有布局，配合boxjs食用
v1.1(7.3) - 文字排版调整，抄了亿点点代码😂
v1.2(7.5) - 直接做掉cookie失效的通知，防止无效通知刷屏😂，当小组件数据都为0即获取不到信息
v1.3(7.7) - 更改代码逻辑，捕捉错误，使得获取不到数据能显示小组件，不至于ssl错误
v1.4(7.10) - logo缓存机制，防止后续因网络差拉取不到图片，小组件显示不了，存储文件夹为 images/10099
v1.5(7.21) - 新增了锁屏界面AccessoryRec小组件
----------------------------------------------- */



let localVersion = "1.5"

let widget = new ListWidget()
widget.setPadding(10, 10, 10, 10)
widget.backgroundColor = Color.dynamic(Color.white(), Color.black())


let fee = {
  title: '剩余话费',
  number: 0,
  unit: '元',
  icon: 'yensign',
  iconColor: new Color('000000')
}

let flow = {
  title: '剩余流量',
  number: 0,
  unit: 'GB',
  icon: 'antenna.radiowaves.left.and.right',
  iconColor: new Color('1ab6f8')
}

let voice = {
  title: '剩余语音',
  number: 0,
  unit: '分钟',
  en: 'MIN',
  icon: 'phone.fill',
  iconColor: new Color('30d15b')
}

let updateTime = {
  title: '更新时间',
  number: 0,
  icon: 'arrow.triangle.2.circlepath',
  unit: '',
  iconColor: new Color('FF8648')
}


async function createAccessoryRec() {
  const bodyStack = widget.addStack()
  bodyStack.layoutVertically()
  
  setStack(bodyStack, fee)
  bodyStack.addSpacer()
  setStack(bodyStack, flow)
  bodyStack.addSpacer()
  setStack(bodyStack, voice)
}

async function createSmall() {
  const logoStack = widget.addStack()
  logoStack.addSpacer()
  const logo = logoStack.addImage(await logoImage())
  logo.imageSize = new Size(105.6, 34.8)
  logoStack.addSpacer()
  widget.addSpacer()
  
  const feeStack = widget.addStack()
  feeStack.centerAlignContent()
  feeStack.addSpacer()
  const feeValue = feeStack.addText("¥"+`${fee.number}`)
  feeValue.font = Font.mediumRoundedSystemFont(21);
  feeStack.addSpacer();
  widget.addSpacer();
  
  const bodyStack = widget.addStack()
  bodyStack.layoutVertically()
  
  setStack(bodyStack, flow)
  bodyStack.addSpacer()
  setStack(bodyStack, voice)
  bodyStack.addSpacer()
  setStack(bodyStack, updateTime)
}


async function logoImage() {
  const fm = FileManager.iCloud()
  const dict = fm.documentsDirectory()
  if (fm.fileExists(`${dict}/images/10099/10099.png`)) {
    return Image.fromFile(`${dict}/images/10099/10099.png`)
  } else {
    if (!fm.fileExists(`${dict}/images/10099`)) fm.createDirectory(`${dict}/images/10099`, true)
    try {
      const url = "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/10099/10099.png"
      let req = new Request(url)
      const image = await req.loadImage()
      fm.writeImage(`${dict}/images/10099/10099.png`, image)
      return image
    } catch (e) {
      console.warn("logoImage❌❌:\n"+e)
    }
  }
}


function setStack(stack, data) {
  const rowStack = stack.addStack()
  rowStack.centerAlignContent()
  
  const img = SFSymbol.named(data.icon)
  img.applyHeavyWeight()
  let icon = rowStack.addImage(img.image)
  icon.imageSize = new Size(13, 13)
  icon.tintColor = data.iconColor
  rowStack.addSpacer(4)
  let title = rowStack.addText(data.title)
  rowStack.addSpacer()
  let number = rowStack.addText(data.number + data.unit)
  title.font = Font.systemFont(13)
  number.font = Font.systemFont(13)
}


async function userInfo() {
  try {
    const url = "https://wx.10099.com.cn/contact-web/api/busi/qryUserInfo"
    const headers = (Keychain.contains("10099.headers") ? Keychain.get("10099.headers") : "")
    const body = (Keychain.contains("10099.body") ? Keychain.get("10099.body") : "")
    
    let req = new Request(url)
    req.method = "POST"
    if (headers && body) {
      req.headers = JSON.parse(headers)
      req.body = JSON.parse(body)
    } else {
      await BoxjsData()
    }
    
    const resp = await req.loadJSON()
    if (resp.status === "000000") {
      fee.number = resp.data.userData.fee/100
      flow.number = (resp.data.userData.flow/1048576).toFixed(2)
      voice.number = resp.data.userData.voice
      const date = new Date(parseInt(resp.timestamp))
      const time = date.toTimeString()
      const match = time.match(/(\d{2}:\d{2})/)
      updateTime.number = match[0]
    } else {
      console.error("cookie已过期，请重新获取！！")
    }
  } catch (e) {
    console.warn("userInfo❌❌:\n"+e)
  }
}


async function BoxjsData() {
  try {
    const url = "http://boxjs.com/query/boxdata"
    let req = new Request(url)
    const resp = await req.loadJSON()
    const data = resp.datas
    if (data["10099"]) {
      const json = JSON.parse(data["10099"])
      Keychain.set("10099.body", JSON.stringify(json.body))
      Keychain.set("10099.headers", JSON.stringify(json.headers))
    } else if (!data["10099"]) {
      console.log("Boxjs中获取不到10099相关cookie，请重新用10099.cookie.js获取！！😎😎")
    } else {
      const sub = JSON.stringify(resp.usercfgs.appsubs)
      const str = "https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json"
      const match = sub.match(str)
      if (!match) {
        await setNotification("Boxjs找不到10099相关信息", "点击该通知即可一键安装Boxjs订阅！！", "http://boxjs.com/#/sub/add/https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json")
      }
    }
  } catch (e) {
    console.warn("BoxjsData❌❌:\n"+e)
  }
}


async function setNotification(title, subtitle, openURL) {
  let notification = new Notification()
  notification.title = title
  notification.subtitle = subtitle
  notification.sound = "complete"
  notification.openURL = openURL
  await notification.schedule()
}


async function previewandset() {
    let options = ["预览Small组件", "预览AccessoryRec小组件", "添加Boxjs订阅", "更新脚本"]
    
    let idx = await generateAlert("10099 Widget", "Designed by wuhu.", options)
    switch(idx) {
        case 0:
          await userInfo()
          await createSmall()
          Script.setWidget(widget)
          Script.complete()
          widget.presentSmall()
          break
        case 1:
          await userInfo()
          await createAccessoryRec()
          Script.setWidget(widget)
          Script.complete()
          widget.presentAccessoryRectangular()
          break
        case 2:
          Safari.openInApp("http://boxjs.com/#/sub/add/https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json", false)
          break
        case 3:
          await update()
          break
    }
}


async function generateAlert(title, message, options) {
    let alert = new Alert()
    alert.title = title
    alert.message = message
    alert.addCancelAction("取消")
    
    for (const option of options) {
        alert.addAction(option)
    }
    
    const response = await alert.presentAlert()
    return response
}


async function update() {
    const fm = FileManager.iCloud()
    const dict = fm.documentsDirectory()
    const scriptName = Script.name()
    
    const url = "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/10099/10099.js"
    let req = new Request(url)
    req.method = "GET"
    const resp = await req.loadString()
    
    const regex = /let localVersion = "([\d.]+)"/
    const match = resp.match(regex)
    const version = (match ? match[1] : "")
    
    if (version > localVersion) {
        fm.writeString(`${dict}/${scriptName}.js`, resp)
        let notification = new Notification()
        notification.title = "脚本更新成功啦🎉🎉"
        notification.subtitle = "点击该通知即可跳转！！！"
        notification.sound = "default"
        notification.
 openURL = `scriptable:///open/${scriptName}`
        notification.addAction("打开脚本🎉🎉", `scriptable:///open/${scriptName}`, false)
        await notification.schedule()
    } else {
        let notification = new Notification()
        notification.title = "脚本已是最新版，无需更新！🎉🎉"
        notification.sound = "default"
        await notification.schedule()
    }
}


if (config.runsInApp) {
  await previewandset()
} else {
  await userInfo()
  switch (config.widgetFamily) {
    case "small":
      await createSmall()
      Script.setWidget(widget)
      Script.complete()
      widget.presentSmall()
      break
    case "accessoryRectangular":
      await createAccessoryRec()
      Script.setWidget(widget)
      Script.complete()
      widget.presentAccessoryRectangular()
  }
}