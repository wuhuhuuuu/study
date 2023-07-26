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

module.exports = info => {
  return {
    type: "vstack",
    props: {
      alignment: $widget.horizontalAlignment.center
    },
    views: [setLayout(info.fee), setLayout(info.flow), setLayout(info.voice)]
  };
};
