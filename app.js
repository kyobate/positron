function loadVideo() {
    const video = document.getElementById('video');
    const url = document.getElementById('m3u8-url').value;

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function() {
            video.play();
        });
    } else {
        alert("HLS再生をサポートしていないブラウザです");
    }
}

function stopVideo() {
    const video = document.getElementById('video');
    video.pause();
    video.src = "";
}