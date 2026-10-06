---
title: FFmpeg 集成 | uTools 开发者文档
source: https://www.u-tools.cn/docs/developer/utools-api/ffmpeg.html
fetched: 2026-10-07
---

> 来源：[FFmpeg 集成 | uTools 开发者文档](https://www.u-tools.cn/docs/developer/utools-api/ffmpeg.html)

# FFmpeg 集成
[FFmpeg](https://ffmpeg.org) 是功能强大的开源音视频处理工具，uTools 以独立扩展的形式提供 FFmpeg 能力。用户首次调用 `utools.runFFmpeg` 时，uTools 会自动引导下载并集成 FFmpeg 命令行工具。
注意：FFmpeg 版本为 v7.1

## `utools.runFFmpeg(args[, onProgress])`
执行 FFmpeg 命令

### 类型定义
ts
```
function runFFmpeg(
args: string[],
onProgress?: (progress: RunProgress) => void
): PromiseLike<void>;
function runFFmpeg(
args: string[],
options: {
onProgress?: (progress: RunProgress) => void,
onLog?: (text: string) => void
}
): PromiseLike<void>;
```

- `args`: ffmpeg 运行参数(数组)
- `onProgress`: 处理进度中的回调函数
- `onLog`: 用于接收 ffmpeg 执行过程中的日志输出回调
- 返回 Promise

`PromiseLike` 类型定义
`PromiseLike` 是 `Promise` 的扩展类型，包含 `kill()` 和 `quit()` 函数
默认情况下，你可以单纯把它当作 `Promise` 来使用，但是扩展了 `kill()` 和 `quit()` 函数，可以让你在运行过程中强制结束 FFmpeg 运行，或者通知 FFmpeg 退出。
ts
```
interface PromiseLike extends Promise<void> {
kill(): void;
quit(): void;
}
```

#### PromiseLike 字段说明
- `kill()`- 强制结束 FFmpeg 运行

- `quit()`- 通知 FFmpeg 退出，类似命令行下按 q 键

`RunProgress` 类型定义ts
```
interface RunProgress {
bitrate: string;
fps: number;
frame: number;
percent?: number;
q: number | string;
size: string;
speed: string;
time: string;
}
```

#### RunProgress 字段说明
- `bitrate`- 视频或音频的比特率，表示每秒传输的比特数

- `fps`- 当前处理的视频帧率，每秒处理的帧数

- `frame`- 已处理的帧数

- `percent`- 处理完成百分比

- `q`- 质量指标

- `size`- 已处理输出的文件大小

- `speed`- 当前的处理速度

- `time`- 前已处理的时间

### 示例代码
视频压缩
js
```
utools.runFFmpeg(
["-i", "/path/to/input.mp4", "-c:v", "libx264", "-crf", "30", "-preset", "fast", "-tag:v", "avc1", "-movflags", "faststart", "-c:a", "aac", "-b:a", "128k", "-map", "0:v", "-map", "0:a?", "/path/to/output.mp4"],
(progress) => {
console.log("压缩中 " + progress.percent + "%");
}
).then(() => {
console.log("压缩完成");
}).catch((error) => {
console.log("出错了：" + error.message);
});
```

视频转 GIF
js
```
function getConvertToGifArgs(inputVideo, outputGif, fps = 15, width = 200, loop = true, type = 'gif') {
const args = [
'-i', inputVideo,
'-vf', `fps=${fps},${width ? `scale=${width || -1}:-1:flags=lanczos${type === 'gif' ? ',' : ''}` : ''}${type === 'gif' ? 'split[s0][s1];[s0]palettegen=[p];[s1][p]paletteuse' : ''}`,
'-loop', loop ? '0' : '-1'
]
if (type === 'webp') {
args.push('-an', '-preset', 'picture')
}
args.push(outputGif)
return args
}
const args = getConvertToGifArgs('/path/to/input.mp4', '/path/to/output.gif')
const runPromise = utools.runFFmpeg(args, () => { console.log('转换中 ' + progress.percent + '%') })
runPromise.then(() => {
console.log('转换完成啦')
}).catch((error) => {
console.log('出错了：' + error.message)
})
// 执行 runPromise.kill() 强制取消转换
```

音频提取
js
```
utools.runFFmpeg(["-i", "/path/to/input.mp4", "-q:a", "0", "-map", "a", "/path/to/output.mp3"]).then(() => {
console.log("提取完成");
}).catch((error) => {
console.log("出错了：" + error.message);
});
```

获取视频信息
js
```
utools.runFFmpeg(["-i", "/path/to/source.mp4"]).catch((error) => {
// 根据返回的错误信息提取，error.message 信息示例：
/*
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from '/path/to/source.mp4':
Metadata:
major_brand     : isom
minor_version   : 512
compatible_brands: isomiso2avc1mp41
encoder         : Lavf61.7.100
Duration: 00:00:07.00, start: 0.000000, bitrate: 2002 kb/s
Stream #0:0[0x1](und): Video: h264 (High 4:4:4 Predictive) (avc1 / 0x31637661), yuv444p(tv, smpte170m/bt470bg/smpte170m, progressive), 720x1280, 1926 kb/s, 10 fps, 10 tbr, 10240 tbn (default)
Metadata:
handler_name    : VideoHandler
vendor_id       : [0][0][0][0]
encoder         : Lavc61.19.101 libx264
Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, mono, fltp, 70 kb/s (default)
Metadata:
handler_name    : SoundHandler
vendor_id       : [0][0][0][0]
At least one output file must be specified
*/
const videoStream = error.message.match(/Stream #\d+:\d+.*Video: ([^\n]+)/);
const audioStream = error.message.match(/Stream #\d+:\d+.*Audio: ([^\n]+)/);
const durationMatch = error.message.match(/Duration: ([^,]+)/);
const bitrateMatch = error.message.match(/bitrate:\s*(\d+ kb\/s)/);
const videoMetadata = {
duration: durationMatch?.[1] || null,
bitrate: bitrateMatch?.[1] || null,
video: videoStream?.[1] || null,
audio: audioStream?.[1] || null,
}
});
```

录屏
js
```
function ffmpegRecorder (speaker, microphone, captureMouse, area, outputFile) {
// Windows 录屏
if (utools.isWindows()) {
if (speaker && typeof speaker !== 'string') {
throw new Error('扬声器录制需要启用「立体声混音」')
}
return utools.runFFmpeg(
[
...(microphone ? ['-f', 'dshow', '-i', `audio=${microphone}`] : []),
...(speaker ? ['-f', 'dshow', '-i', `audio=${speaker}`] : []),
'-f', 'gdigrab',
'-framerate', '30',
'-draw_mouse', captureMouse ? '1' : '0',
...(area ? ['-offset_x', String(Math.round(area.x)), '-offset_y', String(Math.round(area.y)), '-video_size', `${Math.round(area.width)}x${Math.round(area.height)}`] : []),
'-i', 'desktop',
...((microphone && speaker) ? ['-filter_complex', '[0:a][1:a]amix=inputs=2:duration=longest:dropout_transition=2[aout]', '-map', '2:v', '-map', '[aout]'] : []),
'-r', '30',
'-c:v', 'libx264',
'-pix_fmt', 'yuv420p',
'-preset', 'ultrafast',
'-crf', '23',
...((microphone || speaker) ? ['-c:a', 'aac', '-b:a', '192k'] : []),
outputFile
]
)
}
// macOS 录屏
if (utools.isMacOS()) {
if (speaker || microphone) {
throw new Error('不支持录制声音')
}
return utools.runFFmpeg(
[
'-f', 'avfoundation',
'-framerate', '30',
'-capture_cursor', captureMouse ? '1' : '0',
...(
typeof area === 'object'
? ['-i', String(area.screenId), '-vf', `crop=${area.width}:${area.height}:${area.x}:${area.y}`]
: ['-i', String(area)]
),
'-c:v', 'libx264',
'-pix_fmt', 'yuv420p',
'-preset', 'ultrafast',
'-crf', '23',
outputFile
]
)
}
}

const recorder = ffmpegRecorder(false, false, true, null, '/path/to/capture_desktop.mp4')

setTimeout(() => {
//执行 run.quit() 结束录屏
recorder.quit()
}, 10000)
```
