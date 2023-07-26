module.exports = async () => {
  const resp = await $http.get({
    url: "http://boxjs.com/query/boxdata"
  });
  if (resp.data.hasOwnProperty("sysapps")) {
    const datas = resp.data.datas;
    const sub = JSON.stringify(resp.data.usercfgs.appsubs);
    const str =
      "https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json";
    const match = sub.match(str);
    if (!match) {
      console.error(
        "Boxjs订阅链接欠缺，链接已复制到剪切板上了，可直接于Boxjs中粘贴或者UI界面一键添加！！"
      );
      $clipboard.text =
        "https://github.com/wuhuhuuuu/study/raw/main/Scripts/wuhuhuuuu.boxjs.json";
    } else {
      if (datas["10099"]) {
        return datas["10099"];
      } else {
        console.log(
          "Boxjs中获取不到10099相关cookie，请重新用10099.cookie.js获取！！😎😎"
        );
      }
    }
  } else {
    return null;
  }
};
