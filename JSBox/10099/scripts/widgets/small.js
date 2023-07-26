function setLayout(data) {
  return {
    type: "hstack",
    props: {},
    views: [
      {
        type: "image",
        props: {
          symbol: {
            glyph: data.icon,
            size: 11,
            weight: "bold"
          },
          color: $color(data.iconColor),
          frame: {
            width: 15,
            height: 15
          }
        }
      },
      {
        type: "text",
        props: {
          text: data.title,
          font: {
            name: "default",
            size: 12
          },
          lineLimit: 1,
          frame: {
            width: 50,
            height: 15
          }
        }
      },
      {
        type: "text",
        props: {
          text: data.number + data.unit,
          font: {
            name: "default",
            size: 12
          },
          lineLimit: 1,
          frame: {
            width: 60,
            height: 15,
            alignment: $widget.alignment.trailing
          }
        }
      }
    ]
  };
}

module.exports = (info, ctx) => {
  return {
    type: "vstack",
    props: {
      frame: {
        width: ctx.displaySize.width,
        height: ctx.displaySize.height
      },
      background: $color("white", "black")
    },
    views: [
      {
        type: "image",
        props: {
          path: "assets/10099.png",
          resizable: true,
          scaledToFit: true,
          frame: {
            width: 120,
            height: 40
          }
        }
      },
      {
        type: "text",
        props: {
          text: "¥  " + info.fee.number,
          font: {
            name: "bold",
            size: 23
          }
        }
      },
      {
        type: "vstack",
        props: {
          alignment: $widget.horizontalAlignment.trailing
        },
        views: [
          setLayout(info.flow),
          setLayout(info.voice),
          setLayout(info.updateTime)
        ]
      }
    ]
  };
};
