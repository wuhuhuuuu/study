# QQ音乐

## 去开屏广告

### ad.tencentmusic.com

####1
https://ad.tencentmusic.com/config/uni?memberLevel=1&uuid=5053640559&userId=778889937&pid=9044699202624336612&userIdType=1

content-type: application/json

{
      "exp_name": "12230",
      "trans_key": "12230_12230003",
      "params": {
        "reward_close_tip_style": "2",
        "close_tip_cancel_button_text": "再看__residuetime__秒即可畅听",
        "kkrs": "hit"
      }


####2
https://ad.tencentmusic.com/posconfig?appName=com.tencent.QQMusic&version=12.0.5.106&sdkName=com.tencentmusic.ad.ios&sdkVersion=1.29.0&userIdType=1&userId=77889984374&memberLevel=1&uuid=5053640559&posid=9089890234298900218

content-type: application/json

{
  "retCode": 0,
  "period": 3600,
  "pos": {
    "clikthroVertiHiliteAfterTime": 2000,
    "getAdFailTracking": "http:\/\/adstats.tencentmusic.com\/getAdFail\/single?posId=9089890234298900218",
    "adVertiShowTime": 15000,
    "id": 9089890234298900218,
    "adShowAfterTime": 0,
    "adShowTime": 15000,
    "adShowSongOverTime": 20000,
    "appConfBySdk": false,
    "adMaxImpressionTimes": 1,
    "requestAd": true,
    "requestAdTimeout": 10000
  }
}


####3
https://ad.tencentmusic.com/sdk/config?version=v_20230118210527

content-type: application/json

{
  "retCode": 0,
  "conf": {
    "content": "{\"reportRule\":{\"enable\":false,\"reportInterval\":\"8\",\"saveInterval\":\"3\",\"reportRetryCount\":\"5\",\"timeEffect\":\"600\",\"reportMaxCount\":\"0\",\"reportThreshold\":\"10\",\"crashReportEnable\":true},\"rewardAdActive\":true,\"nativeAdActive\":true,\"loadImageByWeb\":100,\"loaderReuseSession\":true,\"useSafeMode\":true,\"dnsCachePreload\":100,\"dnsCacheValidTime\":3600,\"quicPerfmReportSample\":2,\"playWithCacheNew\":0,\"maReportBatch\":100,\"maReportByPB\":100,\"useInnerVAplayer\":true,\"dnsDiscCache\":100,\"dnsRequestMethod\":1,\"dnsTimeout\":5001,\"blackRangeCount\":3,\"quicDnsSpeed\":0,\"dnsRequestStrategyCmd\":\"1.2.0.1\",\"imageToWebp\":100,\"imageToWebpTag\":14161002}",
    "sdkConfStatus": null,
    "period": "3600",
    "matchConfCondition": null,
    "version": "v_20230118210527"
  },
  "timestamp": "1675521570"
}



### us.l.qq.com

https://us.l.qq.com/exapp?adposcount=1&block_effect=0&count=1&login_type=2&support_https=1&spsa=1&posid=4070643834392507&........

content-type: application/x-javascript

"rl": "https:\/\/c.l.qq.com\/click?oid=8141315111&cid=8141315543&click_data=EAAoADDbrQM6DW1rbW5mbDZ0YXB5eHNAGVoQRkU4QTI3MzQxQjE1QkFBOQ_viewid_46lxxesZwiPiISS9FokojQwdmazudbXdSw!vgOOCEKERqXge884LtQIy1L4Ee4pKQvaevJo8aQDC!sz2VORNI7zwsr7lJEcWEYenot4buH4lCLVsyas5SNve9f3TB89zcRrENeCVJ!APB8O581YoK6i7Ql9n_HyWf!yO0hAWezEulYEncBN3d0Wzrw_Y83V1ikG7l!aFwnBBYqLn2kxduBA!0UFzmVT3TAON1qoP15QuVYXtPIQZ213s78ilHRKn9yzZ4tSgE6HBtFPw3ytP!ceuCNElllk9MyVV9N9KVAGBjQjB5U9AwwbOErGoLp08guocd3qVTVaHoxWEL2svTjNtYWVm6XCzs6NMDgt0T8q2ZA4bbEg1QgnC!xmHOjkP&adtype=&appversion=1082343424&contract=0&jtype=0&wspm=1&i=1&os=1&clklpp=__CLICK_LPP__&cdnxj=1&xp=3&cm2expid=55003&cm2traceid=mkmnfl6tapyxs&pid=4070643834392507&vto=__VIDEO_PLAY_TIME__&report_source=__REPORT_SOURCE__&tl=1",
          "txt": "点击跳转详情页或第三方应用",
 