function apps(url) {
    window.navigator.serviceWorker.register('/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
}

function openLink(url) {
    apps(url);
}

function cloak() {
    let url = window.location.href;
    var w = window.open("about:blank", "_blank");
    w.document.write('<iframe style="position: absolute;top: 0px;bottom: 0px;right: 0px;width: 100%;border: none;margin: 0;padding: 0;overflow: hidden;z-index: 99999;height: 100%;" src="' + url + '"></iframe>');
    window.close('', '_parent', '');
}