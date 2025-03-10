let hls = null; // HLS.jsのインスタンス

function loadVideo() {
    const video = document.getElementById('video');
    const url = document.getElementById('m3u8-url').value;

    if (!url) {
        alert("m3u8 URLを入力してください");
        return;
    }

    if (hls) {
        hls.destroy(); // 既存のストリームを破棄
    }

    if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
    } else {
        alert("お使いのブラウザはHLSをサポートしていません");
    }
}

function stopVideo() {
    const video = document.getElementById('video');
    if (hls) {
        hls.destroy();
        hls = null;
    }
    video.pause();
    video.src = "";
}