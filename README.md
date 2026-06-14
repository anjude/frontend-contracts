# frontend-contracts

前端共享契约仓。这里统一维护 OpenAPI 契约与可复制到各前端项目的 TypeScript 类型/接口文件。

默认分支为 `master`。

## 目录约定

- `openapi/`：OpenAPI 契约源文件。
- `src/apis/`：接口路径与调用契约。
- `src/types/`：TS 类型、枚举与模型。

## 接口规范

### 基础路径

所有业务接口的基础路径为 `/api/so`。

### 响应格式

统一响应结构如下：

```json
{
  "err_code": 0,
  "msg": "success",
  "detail": "",
  "data": {}
}
```

- `err_code` 为 `0` 表示成功，负数表示失败。
- `data` 为业务数据，失败时通常为 `null`。

### 认证机制

- 大部分接口需要 JWT Token。
- 请求头统一使用 `Authorization: Bearer {token}`。

### 请求规范

- `GET` 用于查询，参数通过 query 传递。
- `POST` 用于创建、更新、删除，参数通过 JSON body 传递。

### 分页规范

- 分页参数使用 `offset` 和 `size`。
- `offset` 默认从 `0` 开始。
- `size` 默认 `20`，上限以具体接口文档为准。

### 字段约定

- OpenAPI 和后端文档使用 snake_case。
- 前端 TypeScript 类型使用 camelCase。
- 时间字段统一使用秒级时间戳。

### 使用建议

- 以 `openapi/*.yaml` 为唯一接口依据。
- 前端消费时优先使用 `src/types` 中的命名空间类型。
- API 路径常量使用 `src/apis` 中的 `*ApiPaths`。
