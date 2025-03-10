// PWA: Service Worker 登録
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
            console.error("Service Worker registration failed:", error);
        });
}

// HLS動画を読み込む
function loadVideo() {
    const video = document.getElementById("video");
    const url = document.getElementById("m3u8-url").value;

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
    }
    video.play();
}

// 動画を停止
function stopVideo() {
    const video = document.getElementById("video");
    video.pause();
    video.src = "";
}

// ピクチャインピクチャ機能
function enterPiP() {
    const video = document.getElementById("video");
    if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
        if (video !== document.pictureInPictureElement) {
            video.requestPictureInPicture().catch(error => {
                console.error("PiPエラー:", error);
            });
        } else {
            document.exitPictureInPicture();
        }
    } else {
        alert("このブラウザではPiPがサポートされていません。");
    }
}
