// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: phone-square;
/********************************************************
 * script     : 10099.js
 * version    : 1.0
 * author     : wuhu.（50岁，来自大佬国的一点乐色
 * date       : 2023-07-02
 * github     : https://github.com/wuhuhuuuu/study/tree/main/Scriptable/10099
 * Changelog  : v1.0(7.2) - 基本完成所有布局，配合boxjs食用
----------------------------------------------- */



let localVersion = "1.0"

let widget = new ListWidget()
const widgetStack = widget.addStack()
widgetStack.layoutVertically()
const logoStack = widgetStack.addStack()
logoStack.setPadding(0, 10, 0, 0)
const rowStack = widgetStack.addStack()
rowStack.setPadding(15, 0, 0, 0)
rowStack.layoutVertically()


async function createWidget() {
  const logo = await logoImg()
  const logoNode = logoStack.addImage(logo)
  
  const info = await userInfo()
  if (JSON.stringify(info) !== "{}") {
    setStack("yensign.circle.fill", "话费", info.fee)
    setStack("antenna.radiowaves.left.and.right.circle.fill", "流量", info.flow)
    setStack("phone.circle.fill", "语音", info.voice)
  } else {
    rowStack.addText("获取不到数据！！")
  }
}


async function logoImg() {
  const url = "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/10099/10099.png"
  let req = new Request(url)
  return await req.loadImage()
}


function setStack(symbolName, text, res) {
  const stack = rowStack.addStack()
  stack.centerAlignContent()
  stack.setPadding(5, 0, 5, 0)
  
  const iconStack = stack.addStack()
  iconStack.setPadding(0, 0, 0, 2)
  const textStack = stack.addStack()
  textStack.setPadding(0, 0, 0, 5)
  const resultStack = stack.addStack()
  
  const img = SFSymbol.named(symbolName)
  const icon = iconStack.addImage(img.image)
  icon.imageSize = new Size(17, 17)
  
  const key = textStack.addText(text)
  key.font = Font.semiboldMonospacedSystemFont(14)
  
  const result = resultStack.addText(res)
  result.font = Font.systemFont(14)
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
  
  const result = {}
  const resp = await req.loadJSON()
  if (resp.status === "000000") {
    result.fee = resp.data.userData.fee/100 + "元"
    result.flow = (resp.data.userData.flow/1048576).toFixed(2) + "GB"
    result.voice = resp.data.userData.voice + "分钟"
  } else {
    await setNotification("无有效Cookie", "请重新获取！！", null)
  }
  return result
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
  await createWidget()
  Script.setWidget(widget)
  Script.complete()
  widget.presentSmall()
}
