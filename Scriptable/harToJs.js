// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: screwdriver;
// share-sheet-inputs: file-url;
function writeJs() {
  let url = args.fileURLs[0]
  let string = FileManager.local().readString(url)
  const json = JSON.parse(string)
  const request = json.log.entries[0].request;
  const headers = request.headers;
  const postData = request?.postData.text;
  const header = {};
  headers.forEach(item => {
    header[item.name] = item.value;
  });
  
  let body = ifJSON(postData)
  let script = `  let request = new Request("${request.url}")
  request.method = "${request.method}"
  request.headers = ${JSON.stringify(header)}
  request.body = ${body}
  let resp = await request.loadString()
  console.log(resp)`

  const name = request.url.split("/")[2];
  let fm = icloudOrNot() ? FileManager.iCloud() : FileManager.local()
  let dict = fm.documentsDirectory()
  fm.writeString(`${dict}/${name}.js`, script)
}

function icloudOrNot() {
  try {
    var fm = FileManager.iCloud()
    var dict = fm.documentsDirectory()
  } catch (e) {
    fm = e ? FileManager.local() : FileManager.iCloud()
  }
  dict = fm.documentsDirectory()
  const result = dict.includes("iCloud~dk~simonbs~Scriptable")
  return result
}

function ifJSON(json) {
  let result = null;
  try {
    const test = JSON.parse(json);
    result = JSON.stringify(json)
  } catch (e) {
    result = json;
  }
  return result;
}


config.runsInActionExtension ? writeJs() : console.log("Please run in ActionExtension")