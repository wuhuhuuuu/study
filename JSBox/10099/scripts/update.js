module.exports = url => {
  const link = url.split(".box")[0] + "/config.json";
  $http.get({
    url: link,
    handler: function (resp) {
      const version = resp.data.info.version;
      const localversion = JSON.parse($file.read("./config.json").string).info
        .version;
      if (version > localversion) {
        $ui.alert({
          title: $l10n("UPDATE"),
          message: $l10n("IF_NEW"),
          actions: [
            {
              title: $l10n("OK"),
              disabled: false,
              style: $alertActionType.destructive,
              handler: function () {
                $http.download({
                  url: url,
                  showsProgress: true,
                  backgroundFetch: true,
                  progress: function (bytesWritten, totalBytes) {
                    var percentage = (bytesWritten * 1.0) / totalBytes;
                  },
                  handler: function (resp) {
                    const file = resp.data;
                    const name = $addin.current.displayName;
                    $addin.save({
                      name: name,
                      data: file,
                      handler: function (success) {
                        success
                          ? $addin.run(name)
                          : $ui.error($l10n("UPDATE_RESULT"));
                      }
                    });
                  }
                });
              }
            },
            {
              title: $l10n("CANCEL"),
              style: $alertActionType.default,
              handler: function () {
                console.log($l10n("CANCEL"));
              }
            }
          ]
        });
      } else {
        $ui.alert({
          title: $l10n("UPDATE"),
          message: $l10n("LAST_VERSION"),
          actions: [
            {
              title: $l10n("OK"),
              disabled: false,
              style: $alertActionType.default,
              handler: function () {}
            }
          ]
        });
      }
    }
  });
};
