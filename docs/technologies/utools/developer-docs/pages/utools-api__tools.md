---
title: 为 AI Agent 提供能力 | uTools 开发者文档
source: https://www.u-tools.cn/docs/developer/utools-api/tools.html
fetched: 2026-10-07
---

> 来源：[为 AI Agent 提供能力 | uTools 开发者文档](https://www.u-tools.cn/docs/developer/utools-api/tools.html)

# 为 AI Agent 提供能力

## `utools.registerTool(name, handler)`
注册一个工具方法，使其能够在运行时被 AI Agent 自动调用。

> ⚠️ 注册时机要求
`registerTool` 必须在页面初始化阶段执行：
- ✅ 推荐：`preload.js`
- ✅ 或与 `onPluginEnter` 同级作用域
- ❌ 不可写在 `onPluginEnter` 内部，AI Agent 调用时不会触发 `onPluginEnter`

### 类型定义
ts
```
function registerTool(
name: string,
handler: (params: Record<string, any>, ctx: ToolContext) => any
): void;
```

- `name` 工具名称，必须与 `plugin.json > tools` 中定义的 key 完全一致
- `handler` AI Agent 调用工具时执行的函数 - `params` 调用时传入的参数对象（由 `inputSchema` 自动构造）
- `ctx` 工具执行上下文

`ToolContext` 类型定义ts
```
interface ToolContext {
requestId: string | number;
sendProgress?: (options: {
progress: number;
total?: number;
message?: string;
}) => Promise<void>;
}
```

#### 字段说明
- `requestId`- 当前调用请求标识（MCP 客户端生成）

- `sendProgress`- 用于向 AI Agent 上报任务执行进度（适用于长时间任务）
- options 参数： - `progress` 当前进度值
- `total` 总数（可选）
- `message` 进度消息（可选）

> 注意：`sendProgress` 可能不存在（取决于 MCP 客户端能力），调用前必须做可选判断：`ctx.sendProgress?.()`

### 示例代码
js
```
// 简单工具
utools.registerTool('say_hi', async () => {
return 'hi'
})

// 带进度上报的长任务
utools.registerTool('video_convert', async ({ inputPath, format }, ctx) => {
const outputPath = `${window.utools.getPath('downloads')}/${Date.now()}.${format}`
const args =
format === 'webm'
? ['-i', inputPath, '-c:v', 'libvpx-vp9', '-crf', '30', '-b:v', '0', outputPath]
: ['-i', inputPath, outputPath]
await window.utools.runFFmpeg(args, (progress) => {
if (!ctx.sendProgress || progress.percent === undefined) return
ctx.sendProgress({
progress: progress.percent,
total: 100,
message: `视频处理中 ${progress.percent.toFixed(1)}%`
})
})
return { outputPath }
})
```

### 最佳实践

#### 1. 工具设计保持单一职责
- 一个工具只解决一个明确问题
- 避免“万能工具”，降低 AI 调用不确定性

#### 2. 工具应避免动态注册
避免在运行时通过条件判断动态注册工具，例如：
js
```
if (xxx) {
utools.registerTool(...)
}
```

#### 3. 参数必须与 `inputSchema` 严格一致
- AI Agent 会基于 `plugin.json` 中的 `inputSchema` 自动构造参数
- `handler` 内应直接消费参数，避免重复解析或结构推断

#### 4. 长任务必须提供进度反馈
适用于执行时间 ≥ 5s 的任务：
- 提升用户感知（避免“卡死”）
- 降低 MCP 客户端超时风险

js
```
ctx.sendProgress?.({ progress, total, message })
```

#### 5. 返回值保持结构化
统一返回对象，避免返回原始类型：
js
```
return {
outputPath,
duration,
size
}
```

#### 6. 错误处理要明确
直接抛出错误，由 AI Agent 感知并处理：
js
```
throw new Error('视频转换失败')
```
