// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: phone-square;
/********************************************************
 * script     : 10099.js
 * version    : 1.1
 * author     : wuhu.（50岁，来自大佬国的一点乐色
 * date       : 2023-07-03
 * github     : https://github.com/wuhuhuuuu/study/tree/main/Scriptable/10099
 * Changelog  :
v1.0(7.2) - 基本完成所有布局，配合boxjs食用
v1.1(7.3) - 文字排版调整，抄了亿点点代码😂
----------------------------------------------- */



let localVersion = "1.1"

let widget = new ListWidget()
widget.setPadding(10, 10, 10, 10)
widget.backgroundColor = (Device.isUsingDarkAppearance() ? Color.black() : Color.white())

// const rowStack = widgetStack.addStack()
// rowStack.setPadding(15, 0, 0, 0)
// rowStack.layoutVertically()

fee = {
  title: '剩余话费',
  number: 0
}

flow = {
  title: '剩余流量',
  number: 0,
  unit: 'GB',
  icon: 'antenna.radiowaves.left.and.right',
  iconColor: new Color('1ab6f8')
}

voice = {
  title: '剩余语音',
  number: 0,
  unit: '分钟',
  en: 'MIN',
  icon: 'phone.fill',
  iconColor: new Color('30d15b')
}

updateTime = {
  title: '更新时间',
  number: 0,
  icon: 'arrow.triangle.2.circlepath',
  unit: '',
  iconColor: new Color('FF8648')
}


async function createWidget() {
  const logoStack = widget.addStack()
  logoStack.addSpacer()
  const logo = logoStack.addImage(await logoImg())
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


async function logoImg() {
  const url = "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/10099/10099.png"
  let req = new Request(url)
  return await req.loadImage()
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
    await setNotification("无有效Cookie", "请重新获取！！", null)
  }
}


async function BoxjsData() {
  const url = "http://boxjs.com/query/boxdata"
  let req = new Request(url)
  const resp = await req.loadJSON()
  const data = resp.datas
  if (data["10099"]) {
    const json = JSON.parse(data["10099"])
    Keychain.set("10099.body", JSON.stringify(json.body))
    Keychain.set("10099.headers", JSON.stringify(json.headers))
  } else {
    const sub = JSON.stringify(resp.usercfgs.appsubs)
    const str = "https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json"
    const match = sub.match(str)
    if (!match) {
      await setNotification("Boxjs找不到10099相关信息", "点击该通知即可一键安装Boxjs订阅！！", "http://boxjs.com/#/sub/add/https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json")
    }
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
    let options = ["预览小组件", "添加Boxjs订阅", "更新脚本"]
    
    let idx = await generateAlert("10099 Widget", "Designed by wuhu.", options)
    switch(idx) {
        case 0:
          await userInfo()
          await createWidget()
          Script.setWidget(widget)
          Script.complete()
          widget.presentSmall()
          break
        case 1:
          Safari.openInApp("http://boxjs.com/#/sub/add/https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json", false)
          break
        case 2:
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
  await createWidget()
  Script.setWidget(widget)
  Script.complete()
  widget.presentSmall()
}