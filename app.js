// HLS.jsを使用して動画を再生する関数
function loadVideo() {
    const videoElement = document.getElementById("video");
    const m3u8Url = document.getElementById("m3u8-url").value;

    if (!m3u8Url) {
        alert("m3u8 URL を入力してください");
        return;
    }

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(m3u8Url);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoElement.play();
        });
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = m3u8Url;
        videoElement.play();
    } else {
        alert("このブラウザは HLS 再生に対応していません");
    }
}

// cURL のヘッダーを解析する関数
function parseCurlHeaders(curlCommand) {
    const headers = {};
    const lines = curlCommand.split("\\n");
    let url = "";

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith("curl ")) {
            url = line.split(" ")[1].replace(/['"]/g, "");
        } else if (line.startsWith("-H '") || line.startsWith('-H "')) {
            const header = line.substring(4, line.length - 1);
            const [key, value] = header.split(": ");
            if (key.toLowerCase() !== "priority") { // priority ヘッダーを除外
                headers[key] = value;
            }
        }
    });

    return { url, headers };
}

// cURL で入力された情報を使って動画を再生
function loadVideoWithCurl() {
    const curlInput = document.getElementById("curl-input").value;
    const { url, headers } = parseCurlHeaders(curlInput);

    if (!url) {
        alert("正しい cURL コマンドを入力してください");
        return;
    }

    console.log("Fetching URL:", url);
    console.log("Headers:", headers);

    fetch(url, { headers })
        .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.blob();
        })
        .then(blob => {
            const videoUrl = URL.createObjectURL(blob);
            const videoElement = document.getElementById("video");
            videoElement.src = videoUrl;
            videoElement.play();
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("CORS 制限のため動画の取得に失敗しました。");
        });
}
