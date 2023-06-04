# 腾讯动漫

## 配置 (Surge)

```properties
[MITM]
hostname = i.ac.qq.com

[Script]
腾讯动漫Cookie = type=http-request,pattern=^https:\/\/i.ac.qq.com\/.+\/SignIn\/signIn$,requires-body=0,script-path=https://github.com/wuhuhuuuu/study/raw/main/Scripts/Tencent_Comic/Tencent.Comic.cookie.js
腾讯动漫 = type=cron,cronexp=3 0 * * *,script-path=https://github.com/wuhuhuuuu/study/raw/main/Scripts/Tencent_Comic/Tencent.Comic.js,wake-system=1,script-update-interval=0
```

## 配置（Loon）

```properties
[MITM]
hostname = i.ac.qq.com

[Script]
http-request ^https:\/\/i.ac.qq.com\/.+\/SignIn\/signIn$ script-path=https://github.com/wuhuhuuuu/study/raw/main/Scripts/Tencent_Comic/Tencent.Comic.cookie.js, timeout=10, tag=腾讯动漫Cookie, img-url=https://github.com/wuhuhuuuu/study/raw/main/Scripts/Tencent_Comic/Tencent.Comic.png
cron "3 0 * * *" script-path=https://github.com/wuhuhuuuu/study/raw/main/Scripts/Tencent_Comic/Tencent.Comic.js, timeout=10, tag=腾讯动漫, img-url=https://github.com/wuhuhuuuu/study/raw/main/Scripts/Tencent_Comic/Tencent.Comic.png
```
## 配置 (QuanX)

```properties
[mitm]
hostname = i.ac.qq.com

[rewrite_local]
^https:\/\/i.ac.qq.com\/.+\/SignIn\/signIn$ url script-request-header https://github.com/wuhuhuuuu/study/raw/main/Scripts/Tencent_Comic/Tencent.Comic.cookie.js

[task_local]
3 0 * * * https://github.com/wuhuhuuuu/study/raw/main/Scripts/Tencent_Comic/Tencent.Comic.js, tag=腾讯动漫签到, img-url=https://github.com/wuhuhuuuu/study/raw/main/Scripts/Tencent_Comic/Tencent.Comic.png
```

## 说明

> 先在登录成功后, 再打开获取 Cookie 的脚本

1. 先复制相关信息到对应字段
2. 打开 APP 手动签到一次
3. 系统提示: `获取Cookie: 成功`
4. 最后就可以获取cookie脚本注释掉了

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:03:00`执行一次.

## 感谢

[@chavyleung](https://github.com/chavyleung)