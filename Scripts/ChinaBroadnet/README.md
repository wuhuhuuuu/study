# ChinaBroadnet

## 配置 (Surge)

```properties
[MITM]
hostname = wx.10099.com.cn

[Script]
ChinaBroadnet.cookie = type=http-request,pattern=https://wx.10099.com.cn/contact-web/api/busi/qryUserInfo,requires-body=1,max-size=0,script-path=https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.cookie.js,script-update-interval=0
ChinaBroadnet = type=cron,cronexp=3 0 * * *,script-path=https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.js,wake-system=1,script-update-interval=0
```
```properties
Panel 配置

[Panel]
ChinaBroadnet = script-name=ChinaBroadnet.Panel,update-interval=3600

[Script]
ChinaBroadnet.Panel = type=generic,script-path=https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.panel.js
```
## 配置（Loon）

```properties
[MITM]
hostname = wx.10099.com.cn

[Script]
http-request https://wx.10099.com.cn/contact-web/api/busi/qryUserInfo script-path=https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.cookie.js, requires-body=true, timeout=10, tag=ChinaBroadnet.cookie, img-url=https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.png
cron "3 0 * * *" script-path=https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.js, timeout=10, tag=ChinaBroadnet, img-url=https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.png
```
## 配置 (QuanX)

```properties
[mitm]
hostname = wx.10099.com.cn

[rewrite_local]
https://wx.10099.com.cn/contact-web/api/busi/qryUserInfo url script-request-body https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.cookie.js

[task_local]
3 0 * * * https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.js, tag=ChinaBroadnet, img-url=https://github.com/wuhuhuuuu/study/raw/main/Scripts/ChinaBroadnet/ChinaBroadnet.png
```

## 说明

> 先在登录成功后, 再打开获取 Cookie 的脚本

1. 先复制相关信息到对应字段
2. 打开 小程序 刷新一次
3. 系统提示: `获取Cookie: 成功`
4. 最后就可以获取cookie脚本注释掉了

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是通知信息脚本, 每天`00:03:00`执行一次.

## 感谢

[@chavyleung](https://github.com/chavyleung)
