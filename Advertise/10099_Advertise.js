let resp = JSON.parse($response.body);
const postersToExclude = [
    "首页-轮播图-新版",
    "首页-甄选推荐",
    "首页-底部广告位",
    "分类-轮播图",
    "我的-非广电轮播图",
    "我的-轮播图",
    "新首页-顶部轮播图",
    "新首页-甄选推荐",
    "新首页-底部轮播图",
    "新首页-模板A-增值业务-1"
];
const result = resp.data.filter(item => !postersToExclude.includes(item.posterStandName));
resp.data = result;
$done({ body: JSON.stringify(resp) });