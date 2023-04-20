(function () {
    // 外部リンクを新しいウィンドウ（タブ）で開くようにする
    const anchors = [...document.querySelector("article").querySelectorAll("a")];
    const regex = new RegExp(`https?://${window.location.host}`)
    anchors.forEach(anchor => {
        if (!anchor.href.match(regex)) {
            anchor.setAttribute("target", "_blank")
            anchor.setAttribute("rel", "noopener noreferrer");
        }
    });
})();