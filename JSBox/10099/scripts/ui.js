const small = require("./widgets/small");
const update = require("./update");

module.exports = info => {
  $ui.render({
    props: {
      title: "10099",
      navBarHidden: true
    },
    views: [
      {
        type: "list",
        props: {
          style: 0,
          separatorHidden: false,
          rowHeight: 100,
          template: {
            views: [
              {
                type: "label",
                props: {
                  id: "scriptName",
                  font: $font("bold", 30)
                },
                layout: function (make) {
                  make.left.inset(20);
                  make.top.inset(30);
                }
              },
              {
                type: "label",
                props: {
                  id: "author",
                  font: $font(15),
                  color: $color("systemGray3")
                },
                layout: (make, view) => {
                  make.left.equalTo(view.prev);
                  make.top.equalTo(view.prev.bottom).offset(10);
                }
              },
              {
                type: "image",
                props: {
                  id: "image",
                  cornerRadius: 13,
                  smoothCorners: true
                },
                layout: function (make) {
                  make.left.inset(20);
                  make.top.inset(7);
                  make.size.equalTo(90);
                }
              },
              {
                type: "label",
                props: {
                  id: "title",
                  font: $font(20)
                },
                layout: (make, view) => {
                  make.top.equalTo(view.prev).offset(10);
                  make.left.equalTo(view.prev.right).offset(20);
                }
              },
              {
                type: "label",
                props: {
                  id: "describe",
                  font: $font(12),
                  color: $color("systemGray2")
                },
                layout: (make, view) => {
                  make.left.equalTo(view.prev);
                  make.top.equalTo(view.prev.bottom).offset(10);
                }
              }
            ]
          },
          data: [
            {
              scriptName: {
                text: "10099"
              },
              author: { text: "Designed by wuhu." }
            },
            {
              image: { data: $data({ path: "./assets/wuhuhuuuu.png" }) },
              title: { text: $l10n("README") },
              describe: { text: "How to config." }
            },
            {
              image: {
                data: $data({ path: "./assets/small.png" })
              },
              title: {
                text: $l10n("PREVIEW")
              },
              describe: {
                text: $l10n("SMALL")
              }
            },
            {
              image: {
                data: $data({
                  path: "./assets/script.png"
                })
              },
              title: { text: $l10n("UPDATE") },
              describe: { text: $l10n("UPDATE_SCRIPT") }
            }
          ]
        },
        layout: $layout.fill,
        events: {
          didSelect: function (sender, indexPath, data) {
            switch (indexPath.row) {
              case 0:
                $safari.open({
                  url: "https://github.com/wuhuhuuuu"
                });
                break;
              case 1:
                $ui.push({
                  views: [
                    {
                      type: "markdown",
                      props: {
                        content: $file.read("./README.md").string
                      },
                      layout: $layout.fill
                    }
                  ]
                });
                break;
              case 2:
                $widget.setTimeline(ctx => {
                  return small(info, ctx);
                });
                break;
              case 3:
                update(
                  "https://github.com/wuhuhuuuu/study/raw/main/JSBox/10099.box"
                );
                break;
            }
          }
        }
      }
    ]
  });
};
