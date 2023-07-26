const ui = require("./ui");
const getInfo = require("./getInfo");
const smallWidget = require("./widgets/small");
const accessoryRec = require("./widgets/accessoryRec");

module.exports.init = async () => {
  const info = await getInfo();
  if ($app.env === $env.widget) {
    $widget.setTimeline(ctx => {
      switch (ctx.family) {
        case $widgetFamily.small:
          return smallWidget(info, ctx);
          break;
        case $widgetFamily.accessoryRectangular:
          return accessoryRec(info);
          break;
      }
    });
  } else {
    ui(info);
  }
};
