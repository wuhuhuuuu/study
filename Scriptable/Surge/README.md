# Introduce

 * script     : Surge.js
 * version    : 1.0
 * author     : wuhu.（50岁，来自大佬国的一点乐色
 * date       : 2023-06-29
 * github     : https://github.com/wuhuhuuuu/study/tree/main/Scriptable/Surge
 * Changelog  : v1.0 - 基本完成所有布局，万事俱备 只欠东风（小组件交互）2023-06-29
1. 小组件交互必须配置 **httpApi**，**Surge—-更多设置—-httpapi**
2. Scriptable 中运行该脚本，即可调起 UI 来设置 **httpApi 的信息、预览、选择暗黑模式，及脚本一键更新功能**
3. 小组件总共有两种尺寸，小尺寸则包含 **出站模式** 及 **功能开关**，中尺寸聚合了上面两种尺寸
4. 由于小尺寸的小组件包含两种，可在桌面长按小组件输入参数来替换，默认情况则选择“出站模式”
   “出站模式”：输入 **0** 或者 **outbound**
   “功能开关”：输入 **1** 或者 **modify**