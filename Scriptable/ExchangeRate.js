// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: signature;
/*
Author: wuhu.
  2023.9.7
refer "https://github.com/vikiboss/60s"
*/

let params = args.widgetParameter
let currencys
if (params) {
  currencys = params.includes(",") ? params.split(",") : params.includes("，") ? params.split("，") : null
}

async function getInfo() {
  try {
    let url = "https://60s.viki.moe/ex-rates?c=cny"
    let request = new Request(url)
    let resp = await request.loadJSON()
    return resp.data
  } catch (e) {
    console.error(e)
  }

}

let widget = new ListWidget()
let stackAll = widget.addStack()
stackAll.layoutVertically()
stackAll.setPadding(-2, 0, -2, 0)
let titleStack = stackAll.addStack()
let date = new Date()
let updateTime = date.getHours() + ":" + date.getMinutes()
let time = titleStack.addStack().addText("更新" + updateTime)
time.font = Font.thinRoundedSystemFont(13)
titleStack.addSpacer()
let CNY = titleStack.addStack().addText("CNY")
CNY.font = Font.italicSystemFont(13)
stackAll.addSpacer()

let message = await getInfo()

addEachInfo("🇺🇸", "USD")
stackAll.addSpacer()
addEachInfo("🇭🇰", "HKD")
stackAll.addSpacer()
addEachInfo("🇯🇵", "JPY")
stackAll.addSpacer()
addEachInfo("🇪🇺", "EUR")
await widget.presentSmall()

function addEachInfo(icon, name) {
  let rowStack = stackAll.addStack()
  let iconStack = rowStack.addStack().addText(icon)
  iconStack.font = Font.mediumSystemFont(15)
  rowStack.addSpacer(10)
  let nameStack = rowStack.addStack().addText(name)
  nameStack.font = Font.blackSystemFont(12)
  rowStack.addSpacer()
  let rate = message ? (100/message[name]).toFixed(2) : "0.00"
  let rateStack = rowStack.addStack().addText(rate)
  rateStack.font = Font.blackMonospacedSystemFont(12)
}