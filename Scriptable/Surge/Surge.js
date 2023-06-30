// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: globe-africa;
/********************************************************
 ************* MAKE SURE TO COPY EVERYTHING *************
 *******************************************************
 ************ © 2023 Copyright wuhu. ************/
/********************************************************
 * script     : Surge.js
 * version    : 1.0
 * author     : wuhu.（50岁，来自大佬国的一点乐色
 * date       : 2023-06-30
 * github     : https://github.com/wuhuhuuuu/study/tree/main/Scriptable/Surge
 * Changelog  : v1.0(6.29) - 基本完成所有布局，万事俱备 只欠东风（小组件交互
1. 小组件交互必须配置httpApi，Surge中 更多设置---httpapi
2. Scriptable 中运行该脚本，即可调起 UI 来设置 httpApi 的信息、预览、选择暗黑模式，及脚本一键更新功能
3. 小组件总共有两种尺寸，小尺寸则包含"出站模式"及"功能开关"，中尺寸聚合了上面两种尺寸
4. 由于小尺寸的小组件包含两种，可在桌面长按小组件输入参数来替换，默认情况则选择"出站模式"
   "出站模式"：输入 0 或者 outbound
   "功能开关"：输入 1 或者 modify
                v1.1(6.30) - 优化背景及字体颜色，功能修改小组件添加字体，更新脚本功能添加通知
----------------------------------------------- */



// 基础设置
let localVersion = "1.1"
const host = Keychain.contains("Host") ? Keychain.get("Host") : "localhost"
const port = Keychain.contains("Port") ? Keychain.get("Port") : "6171"
const password = Keychain.contains("Password") ? Keychain.get("Password") : ""
const theme = Keychain.contains("theme") ? Keychain.get("theme") : "auto"
const param = args.widgetParameter ? args.widgetParameter : ""



let widget = new ListWidget()
const padding = 0
widget.setPadding(padding, padding, padding, padding)
widget.url = 'https://github.com/wuhuhuuuu/study/tree/main/Scriptable/Surge'
widget.backgroundColor = setColor("#000000", "#FFFFFF")


// 出站模式 Widget
async function buildOutbound() {
    const headerStack = widget.addStack();
    headerStack.setPadding(10, 7, 10, 0);
    const headerText = headerStack.addText("Outbound Mode");
    headerText.font = Font.mediumSystemFont(18);
    headerText.textColor = setColor("#FFFFFF", "#000000")


    const directImage = await loadImage("arrow.left.and.right")
    const proxyImage = await loadImage("return.right")
    const ruleImage = await loadImage("arrow.triangle.branch")
    
    addOutbound(widget, directImage, '直接连接', "#3A87FE");
    addOutbound(widget, proxyImage, '全局代理', "#3A87FE") ;
    addOutbound(widget, ruleImage, "规则模式", "#3A87FE")
}
function addOutbound(stack, image, symbol, hex) {
    const rowStack = stack.addStack()
    rowStack.cornerRadius = 15
    rowStack.backgroundColor = setColor("#333333", "#EBEBEB")
    rowStack.setPadding(1, 20, 0, 20)
    rowStack.layoutHorizontally()
    
    const imageStack = rowStack.addStack()
    const symbolStack = rowStack.addStack()
    
    imageStack.setPadding(5, 0, 5, 10)
    symbolStack.setPadding(5, 0, 5, 8)
    
    const imageNode = imageStack.addImage(image)
    imageNode.tintColor = new Color(hex)
    imageNode.imageSize = new Size(25, 25)
    imageNode.leftAlignImage()
    
    const symbolText = symbolStack.addText(symbol)
    symbolText.textColor = setColor("#FFFFFF", "#000000")
    symbolText.font = Font.mediumSystemFont(16)
}


// 功能开关 Widget
async function buildModify() {
//     const headerStack = widget.addStack();
//     headerStack.setPadding(10, 35, 3, 0);
//     const headerText = headerStack.addText("Modify");
//     headerText.centerAlignText()
//     headerText.font = Font.mediumSystemFont(20);
//     if (isDarkTheme) {
//         headerText.textColor = new Color('#FFFFFF');
//     }
    
    const capture = await loadImage("record.circle")
    const mitm = await loadImage("lock.slash.fill")
    const rewrite = await loadImage("pencil")
    const script = await loadImage("terminal.fill")
    
    addModify(widget, capture, mitm, "FF6A00", "FEB43F", "Capture", "Mitm")
    addModify(widget, rewrite, script, "76BB40", "4F85F6", "Rewrite", "Script")
}
function addModify(stack, left, right, lcol, rcol, ltext, rtext) {
    const rowStack = stack.addStack()
    rowStack.layoutHorizontally()
    
    const leftStack = rowStack.addStack()
    leftStack.setPadding(5, 5, 5, 10)
    leftStack.layoutVertically()
    const rightStack = rowStack.addStack()
    rightStack.setPadding(5, 10, 5, 10)
    rightStack.layoutVertically()
    
    const limgStack = leftStack.addStack()
    limgStack.setPadding(0, 9, 0, 15)
    const ltextStack = leftStack.addStack()
    const rimgStack = rightStack.addStack()
    const rtextStack = rightStack.addStack()
     
    const leftImage = limgStack.addImage(left)
    leftImage.tintColor = new Color(lcol)
    leftImage.imageSize = new Size(40, 40)
    leftImage.centerAlignImage()
    const rightImage = rimgStack.addImage(right)
    rightImage.tintColor = new Color(rcol)
    rightImage.imageSize = new Size(40, 40)
    rightImage.centerAlignImage()
    
    const leftText = ltextStack.addText(ltext)
    leftText.font = Font.mediumSystemFont(15)
    leftText.textColor = new Color("#CDCDCD")
    const rightText = rtextStack.addText(rtext)
    rightText.font = Font.mediumSystemFont(15)
    rightText.textColor = new Color("#CDCDCD")
}


// 综合出站模式及功能开关（中尺寸）
async function combination() {
    const rowStack = widget.addStack()
    
    const leftStack = rowStack.addStack()
    leftStack.layoutVertically()
    leftStack.setPadding(35, 5, 5, 20)
    const directImage = await loadImage("arrow.left.and.right")
    const proxyImage = await loadImage("return.right")
    const ruleImage = await loadImage("arrow.triangle.branch")
    addOutbound(leftStack, directImage, '直接连接', "#3A87FE");
    addOutbound(leftStack, proxyImage, '全局代理', "#3A87FE") ;
    addOutbound(leftStack, ruleImage, "规则模式", "#3A87FE")
    
    const rightStack = rowStack.addStack()
    rightStack.layoutVertically()
    rightStack.setPadding(20, 5, 10, 10)
    const capture = await loadImage("record.circle")
    const mitm = await loadImage("lock.slash.fill")
    const rewrite = await loadImage("pencil")
    const script = await loadImage("terminal.fill")
    addModify(rightStack, capture, mitm, "FF6A00", "FEB43F", "Capture", "Mitm")
    addModify(rightStack, rewrite, script, "76BB40", "4F85F6", "Rewrite", "Script")
}


// 小组件预览及设置
async function previewandset() {
    let options = ["httpApi", "Theme", "Outbound", "Modify", "Combination", "Update Script"]
    
    let idx = await generateAlert("Surge Widget", "Designed by wuhu.", options)
    switch(idx) {
        case 0:
            const title = "httpApi Setting"
            const message = "HttpApi 相关设置，应与 Surge 中的设置相同。【注】：所有设置都可打开，https务必关掉！！！"
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
    
    Keychain.set(title, alert.textFieldValue(0))
}


async function loadImage(symbolname) {
  const sf = SFSymbol.named(symbolname)
  sf.applyLightWeight()
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
    
    if (version != localVersion) {
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
    const url = `http://${Host}:${Port}/v1/${path}`
    let request = new Request(url)
    request.method = method
    request.headers = {"X-Key": `${password}`}
    request.body = JSON.stringify(body)
    await request.loadJSON()
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

Script.setWidget(widget);
Script.complete();