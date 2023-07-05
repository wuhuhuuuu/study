// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: globe-africa;
/********************************************************
 ************* MAKE SURE TO COPY EVERYTHING *************
 *******************************************************
 ************ © 2023 Copyright wuhu. ************/
/********************************************************
 * script     : Surge.js
 * version    : 1.2
 * author     : wuhu.（50岁，来自大佬国的一点乐色
 * date       : 2023-07-05
 * github     : https://github.com/wuhuhuuuu/study/tree/main/Scriptable/Surge
 * Changelog  :
v1.0(6.29) - 基本完成所有布局，万事俱备 只欠东风（小组件交互
1. 小组件交互必须配置httpAPI，Surge中 更多设置---httpAPI
2. Scriptable 中运行该脚本，即可调起 UI 来设置 httpAPI 的信息、预览、选择暗黑模式，及脚本一键更新功能
3. 小组件总共有两种尺寸，小尺寸则包含"出站模式"及"功能开关"，中尺寸聚合了上面两种尺寸
4. 由于小尺寸的小组件包含两种，可在桌面长按小组件输入参数来替换，默认情况则选择"出站模式"
   "出站模式"：输入 0 或者 outbound
   "功能开关"：输入 1 或者 modify
v1.1(6.30) - 优化背景及字体颜色，功能修改小组件添加字体，更新脚本功能添加通知
v1.2(7.5) - 优化代码逻辑，已经能够识别各开关是否开启。⚠️⚠️当httpAPI配置错误或不开启Surge的时候，所有开关将关闭！！
----------------------------------------------- */



// 基础设置
let localVersion = "1.2"
const host = Keychain.contains("Host") ? Keychain.get("Host") : "localhost"
const port = Keychain.contains("Port") ? Keychain.get("Port") : "6171"
const password = Keychain.contains("Password") ? Keychain.get("Password") : ""
const theme = Keychain.contains("theme") ? Keychain.get("theme") : "auto"
const param = args.widgetParameter ? args.widgetParameter : ""



let widget = new ListWidget()
const padding = 0
widget.setPadding(padding, padding, padding, padding)
widget.backgroundColor = setColor("#000000", "#FFFFFF")


// 出站模式 Widget
async function buildOutbound() {
    const headerStack = widget.addStack();
    headerStack.setPadding(10, 7, 10, 0);
    const headerText = headerStack.addText("Outbound Mode");
    headerText.font = Font.mediumSystemFont(18);
    headerText.textColor = setColor("#FFFFFF", "#000000")


    const direct = await loadImage("arrow.left.and.right")
    const proxy = await loadImage("return.right")
    const rule = await loadImage("arrow.triangle.branch")
    
    await addOutbound(widget, direct, '直接连接', "direct")
    await addOutbound(widget, proxy, '全局代理', "proxy")
    await addOutbound(widget, rule, "规则模式", "rule")
}


async function addOutbound(stack, image, symbol, mode) {
    const rowStack = stack.addStack()
    rowStack.centerAlignContent()
    rowStack.cornerRadius = 15
    const res = await buttonAction("outbound", "get")
    if (res.mode === mode) rowStack.backgroundColor = setColor("#333333", "#EBEBEB")
    rowStack.setPadding(5, 20, 5, 20)
    
    const imageNode = rowStack.addImage(image)
    imageNode.tintColor = new Color("3A87FE")
    imageNode.imageSize = new Size(25, 25)
    rowStack.addSpacer(10)
    
    const symbolText = rowStack.addText(symbol)
    symbolText.textColor = setColor("#FFFFFF", "#000000")
    symbolText.font = Font.mediumSystemFont(16)
}


// 功能开关 Widget
async function buildModify() {
    const capture = await loadImage("record.circle")
    const mitm = await loadImage("lock.slash.fill")
    const rewrite = await loadImage("arrow.uturn.right")
    const script = await loadImage("chevron.left.forwardslash.chevron.right")
    
    await addModify(widget, capture, mitm, "FF4015", "FFAB01", "Capture", "MITM")
    await addModify(widget, rewrite, script, "982ABC", "0061FE", "Rewrite", "Script")
}


async function addModify(stack, left, right, lcol, rcol, ltext, rtext) {
    const rowStack = stack.addStack()
    rowStack.centerAlignContent()
    rowStack.layoutVertically()
    rowStack.addSpacer(7)
    
    const imgStack = rowStack.addStack()
    imgStack.setPadding(0, 25, 0, 10)
    const textStack = rowStack.addStack()
    textStack.setPadding(0, 10, 0, 10)
    
    const limgNode = imgStack.addImage(left)
    const leftRes = await buttonAction("features/"+ltext.toLowerCase(), "Get")
    limgNode.tintColor = (leftRes.enabled ? new Color(lcol) : new Color("CDCDCD"))
    limgNode.imageSize = new Size(35, 35)
    imgStack.addSpacer(30)
    const rimgNode = imgStack.addImage(right)
    if (rtext === "Script") {
        path = "features/scripting"
    } else {
        path = "features/mitm"
    }
    const rightRes = await buttonAction(path, "GET")
    rimgNode.tintColor = (rightRes.enabled ? new Color(rcol) : new Color("CDCDCD"))
    rimgNode.imageSize = new Size(35, 35)
    
    const leftText = textStack.addText(ltext)
    leftText.textColor = new Color('707070')
    leftText.font = Font.semiboldSystemFont(15)
    textStack.addSpacer(20)
    const rightText = textStack.addText(rtext)
    rightText.textColor = new Color('707070')
    rightText.font = Font.semiboldSystemFont(15)
}


// 综合出站模式及功能开关（中尺寸）
async function combination() {
    const rowStack = widget.addStack()
    
    const leftStack = rowStack.addStack()
    leftStack.layoutVertically()
    leftStack.setPadding(25, 5, 10, 20)
    
    const direct = await loadImage("arrow.left.and.right")
    const proxy = await loadImage("return.right")
    const rule = await loadImage("arrow.triangle.branch")
    await addOutbound(leftStack, direct, '直接连接', "direct")
    await addOutbound(leftStack, proxy, '全局代理', "proxy")
    await addOutbound(leftStack, rule, "规则模式", "rule")
    
    const rightStack = rowStack.addStack()
    rightStack.layoutVertically()
    rightStack.setPadding(15, 5, 20, 10)
    const capture = await loadImage("record.circle")
    const mitm = await loadImage("lock.slash.fill")
    const rewrite = await loadImage("arrow.uturn.right")
    const script = await loadImage("chevron.left.forwardslash.chevron.right")
    await addModify(rightStack, capture, mitm, "FF4015", "FFAB01", "Capture", "MITM")
    await addModify(rightStack, rewrite, script, "982ABC", "0061FE", "Rewrite", "Script")
}


// 小组件预览及设置
async function previewandset() {
    let options = ["httpAPI", "主题", "出站模式(小尺寸)", "功能开关(小尺寸)", "聚合版(中尺寸)", "更新脚本"]
    
    let idx = await generateAlert("Surge Widget", "Designed by wuhu.", options)
    switch(idx) {
        case 0:
            const title = "httpAPI Setting"
            const message = "httpAPI 相关设置，应与 Surge 中的设置相同。【注】：所有设置都可打开，https务必关掉！！！"
            const options = ["Host", "Port", "Password"]
            let response = await generateAlert(title, message, options)
            if (response === 0) {
                await KeySet("Host", `目前已设置为${host}`, "本机：localhost", "localhost")
            } else if (response === 1) {
                await KeySet("Port", `目前已设置为${port}`, "默认：6171", "6171")
            } else if (response === 2) {
                await KeySet("Password", `目前已设置为${password}`, "请输入密码！！！", null)
            }
            break
        case 1:
            let resp = await generateAlert("主题模式设置", `白天、夜晚及自动，默认选择自动模式\n目前的选择为${theme}`, ["白天", "夜晚", "自动"])
            if (resp === 0) {
                Keychain.set("theme", "light")
            } else if (resp === 1) {
                Keychain.set("theme", "dark")
            } else if (resp === 2) {
                Keychain.set("theme", "auto")
            }
            break
        case 2:
            await buildOutbound()
            await widget.presentSmall()
            break
        case 3:
            await buildModify()
            await widget.presentSmall()
            break
        case 4:
            await combination()
            await widget.presentMedium()
            break
        case 5:
            await update()
            break
    }
}


function setColor(darkColor, lightColor) {
    switch (theme) {
    case "dark":
        return new Color(darkColor)
        break
    case "light":
        return new Color(lightColor)
        break
    case "auto":
        return (Device.isUsingDarkAppearance() ? new Color(darkColor) : new Color(lightColor))
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


async function KeySet(title, message, placeholder, text) {
    let alert = new Alert()
    alert.title = title
    alert.message = message
    
    alert.addTextField(placeholder, text)
    alert.addAction("OK")
    alert.addCancelAction("Cancel")
    
    await alert.presentAlert()
//     console.log(alert.textFieldValue(0))
    
    Keychain.set(title, alert.textFieldValue(0))
    console.log(Keychain.get(title))
}


async function loadImage(symbolname) {
  const sf = SFSymbol.named(symbolname)
  sf.applyBoldWeight()
  return sf.image
}


async function update() {
    const fm = FileManager.iCloud()
    const dict = fm.documentsDirectory()
    const scriptName = Script.name()
    
    const url = "https://github.com/wuhuhuuuu/study/raw/main/Scriptable/Surge/Surge.js"
    let req = new Request(url)
    req.method = "GET"
    const resp = await req.loadString()
    
    const regex = /let localVersion = "([\d.]+)"/
    const match = resp.match(regex);
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


// 小组件交互
async function buttonAction(path, method, body) {
    try {
        const url = `http://${host}:${port}/v1/${path}`
        console.log(url)
        let request = new Request(url)
        request.method = method
        request.headers = {"X-Key": `${password}`}
        request.body = JSON.stringify(body)
        const res = await request.loadJSON()
        if (res) {
            if (res.error) {
                let notification = new Notification()
                notification.title = "httpapi 密码设置错误"
                notification.subtitle = "请检查相关设置！！"
                notification.sound = "alert"
                await notification.schedule()
            } else {
                return res
            }
        }
    } catch (e) {
        return e
    }
}




if (config.runsInApp) {
    previewandset()
} else {
    if (config.widgetFamily === "small") {
        if (param === "0" || param === "outbound") {
            await buildOutbound()
        } else if (param === "1" || param === "modify") {
            await buildModify()
        } else {
            await buildOutbound()
        }
    } else if (config.widgetFamily === "medium") {
        await combination()
    }
}

Script.setWidget(widget)
Script.complete()