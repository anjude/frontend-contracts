# 通用实时房间协议

## 连接与约束

`GET /api/so/realtime-room/ws` 以 WebSocket 升级，客户端使用 `Authorization: Bearer <JWT>` 请求头。房间归属于登录态的 appId，成员身份取登录态的 openid，不接受客户端指定身份。微信客户端使用对应环境的 `wss://` 地址。房间 ID 为服务端生成的随机标识，邀请链接应避免公开传播。

每条消息为 JSON 文本，字段使用 camelCase。服务端连接帧最大 40000 字节，共享数据、私有数据和事件数据各不超过 32768 字节。房间人数 2～8，TTL 60～7200 秒，TTL 固定从创建开始。服务端约每 25 秒发 WebSocket ping，客户端应正常响应 pong；网络断开后必须重新连接、`join` 并取快照。平台需允许 Socket 合法域名和端口。

## 请求和响应

每个请求包含唯一 `id`、`action`，响应以相同 `id`、`type: response`、`action` 和 `code` 对应；成功的房间操作返回 `snapshot`。`ping` 只返回成功状态。`code` 为 `ok`、`invalid`、`expired`、`full`、`forbidden`、`conflict`、`unavailable`。房间数据格式由业务自行约定。

| 动作 | 参数 | 行为 |
| --- | --- | --- |
| `create` | `maxMembers`、`ttlSeconds`、`data` | 创建并加入房间，返回快照和随机 `roomId` |
| `join` | `roomId` | 加入或以相同身份恢复；已有成员恢复不会占用新名额 |
| `snapshot` | `roomId` | 读取共享数据、成员和自己的私有数据 |
| `compare_set` | `roomId`、`expectedVersion`、`data` | 对整个共享数据做原子版本比较与替换 |
| `private_set` | `roomId`、`expectedVersion`、`data` | 对自己的私有数据做原子版本比较与替换 |
| `event` | `roomId`、`eventType`、`data` | 给当前成员广播临时事件，不持久化 |
| `leave` | `roomId` | 主动离开并删除自己的私有数据；连接关闭 |
| `ping` | 无 | 应用层心跳响应 |

对 `compare_set` 或 `private_set` 返回 `conflict` 时，读取 `snapshot`，在最新版本基础上合并并重试。操作是否允许、字段约束及重试幂等由具体业务负责。`eventType` 为 1～64 字符，事件内容对房间成员可见，不能存放私密数据。

`snapshot` 包含 `roomId`、`version`、`members`（成员 openid 数组）、`maxMembers`、`expiresAt`（毫秒时间戳）、`data`，以及可选的 `privateData`；仅返回请求者本人的私有数据。共享或私有数据的任何更新都会增加共同版本。成员加入、离开也会增加版本。

房间发生变化时服务端广播 `{ "type": "changed", "roomId": "...", "version": 2 }`，客户端收到后读取 `snapshot`。事件广播为 `{ "type": "event", "roomId": "...", "sender": "...", "eventType": "...", "data": ... }`。推送是即时通知，不是持久队列；客户端断线和重连后必须读取快照，长时间连接也应定期同步，以弥补通知丢失。

每条连接只能绑定一个房间；连接断开不自动释放成员位置，确保相同身份能恢复。结束后可显式 `leave`，或等待房间过期。通用后端不校验题目、回合和游戏规则；它不提供防作弊，也不会自动根据私有数据判断揭晓条件。
