// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: file-download;
// share-sheet-inputs: url;

let link = ""
if (config.runsInApp) {
  let text = Pasteboard.pasteString() ? Pasteboard.pasteString() : ""
  let alert = new Alert()
  alert.title = "Input URL!!"
  alert.addAction("OK")
  alert.addDestructiveAction("Cancel")
  alert.addTextField("", text)
  let result = await alert.present()
  if (result == 0) {
    link = alert.textFieldValue(0)
  }
} else if (config.runsInActionExtension) {
  link = args.urls[0]
}
if (link) {
  let url = urlParse(link)
  if (url) await download(url)
}
Script.complete()

function urlParse(url) {
  let match = url.match(/^https:\/\/github\.com\/(.+)\/blob\/(.+\.js$)/)
  if (match) {
    let uri = url.replace(/^https:\/\/github\.com\/(.+)\/blob\/(.+\.js$)/, "https://raw.githubusercontent.com/$1/$2")
    return uri
  }
}

function downWhere() {
  let fm = FileManager.iCloud()
  let result = 1
  try {
    let dict = fm.documentsDirectory()
  } catch (e) {
    result = e ? 0 : 1
  }
  return result
}

async function download(url) {
  let request = new Request(url)
  let content = await request.loadString()
  let jsName = url.substring(url.lastIndexOf("/") + 1)
  let fileName = decodeURIComponent(jsName)
  let fm = downWhere() ? FileManager.iCloud() : FileManager.local()
  let dict = fm.documentsDirectory()
  let filePath = fm.joinPath(dict, fileName)
  fm.writeString(filePath, content)
  console.log("Done!!!")
}