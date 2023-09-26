$app.strings = {
  en: {
    app: "Please run in Action Extension!",
    failure: "failure to save the script!"
  },
  "zh-Hans": {
    app: "请在分享面板中运行！",
    failure: "保存脚本失败！"
  }
};
function writeJs() {
  const data = $context.data;
  const json = JSON.parse($data(data).string);
  const request = json.log.entries[0].request;
  const headers = request.headers;
  const postData = request?.postData.text;
  const result = {
    url: "",
    method: "",
    header: {},
    body: null
  };

  result.url = request.url;
  result.method = request.method;
  headers.forEach(item => {
    result.header[item.name] = item.value;
  });
  result.body = ifJSON(postData);

  const name = request.url.split("/")[2];
  $addin.save({
    name: name,
    data: $data({
      string: `let resp = await $http.request(${JSON.stringify(
        result
      )})\nconsole.log(resp.data)`
    }),
    handler: function (success) {
      success
        ? $app.openURL(`jsbox://open?name=${name}`)
        : $ui.toast($l10n("failure"));
    }
  });
}

function ifJSON(json) {
  let result = null;
  try {
    result = JSON.parse(json);
  } catch (e) {
    result = json;
  }
  return result;
}

$app.env == $env.action ? writeJs() : $ui.toast($l10n("app"));
