const getBoxjsData = require("./getBoxjsData");

module.exports = async () => {
  let info = {
    fee: {
      title: "剩余话费",
      number: 0,
      unit: "元",
      icon: "yensign",
      iconColor: "#FFFFFF"
    },
    flow: {
      title: "剩余流量",
      number: 0,
      unit: "GB",
      icon: "antenna.radiowaves.left.and.right",
      iconColor: "#1ab6f8"
    },
    voice: {
      title: "剩余语音",
      number: 0,
      unit: "分钟",
      icon: "phone.fill",
      iconColor: "#30d15b"
    },
    updateTime: {
      title: "更新时间",
      number: 0,
      unit: "",
      icon: "arrow.2.circlepath",
      iconColor: "#FF8648"
    }
  };

  const reqInfo = JSON.parse(await getBoxjsData());
  if (reqInfo) {
    const resp = await $http.post({
      url: reqInfo.url,
      header: reqInfo.headers,
      body: JSON.parse(reqInfo.body)
    });
    const data = resp.data;
    if (data.status == "000000") {
      const userdata = data.data.userData;
      info.fee.number = userdata.fee / 100;
      info.flow.number = (userdata.flow / 1048576).toFixed(2);
      info.voice.number = userdata.voice;
      const date = new Date(parseInt(data.timestamp));
      const time = date.toTimeString();
      const match = time.match(/(\d{2}:\d{2})/);
      info.updateTime.number = match[0];
    } else {
      console.log("jile");
    }
  }
  return info;
};
