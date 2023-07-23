# Introduce

 * script     : 10099.js
 * version    : 1.1
 * author     : wuhu.（50岁，来自大佬国的一点乐色
 * date       : 2023-07-03
 * github     : https://github.com/wuhuhuuuu/study/tree/main/Scriptable/10099
 * Changelog  : 
### v1.0(7.2) - 基本完成所有布局，配合boxjs食用
### v1.1(7.3) - 文字排版调整，抄了亿点点代码😂
v1.2(7.5) - 直接做掉cookie失效的通知，防止无效通知刷屏😂，当小组件数据都为0即获取不到信息
v1.3(7.7) - 更改代码逻辑，捕捉错误，使得获取不到数据能显示小组件，不至于ssl错误
v1.4(7.10) - logo缓存机制，防止后续因网络差拉取不到图片，小组件显示不了，存储文件夹为 images/10099
v1.5(7.21) - 新增了锁屏界面AccessoryRec小组件，需iOS16及以上
v1.6(7.23) - 由于目前查询所需数据不仅仅是cookie如此简单，故直接用Boxjs配合10099.cookie.js是最简单的方式，该版本去掉请求数据缓存，直接时刻调用Boxjs数据