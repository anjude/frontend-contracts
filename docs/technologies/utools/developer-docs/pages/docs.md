---
title: 基础文档 | uTools 开发者文档
source: https://www.u-tools.cn/docs/developer/docs.html
fetched: 2026-10-07
---

> 来源：[基础文档 | uTools 开发者文档](https://www.u-tools.cn/docs/developer/docs.html)

# 基础文档

## [插件应用目录结构](information__file-structure.md)
一个插件应用应该包含哪些文件，了解插件应用项目的文件目录结构

## [plugin.json 配置](information__plugin-json.md)
插件应用基础配置文件 plugin.json 配置说明

## [认识 preload](information__preload-js__preload-js.md)
`plugin.json` 配置的 `preload` js 文件可以调用 Node.js API 的本地原生能力和 Electron 渲染进程 API

## [使用 Node.js](information__preload-js__nodejs.md)
`preload` js 文件遵循 `CommonJS` 规范，通过 `require` 引入 Node.js (16.x 版本) 模块

# API 文档

## [事件](api-reference__utools__events.md)
你可以根据需要，事先传递一些回调函数给这些事件，uTools 会在对应事件被触发时调用它们

## [窗口](api-reference__utools__window.md)
用来实现一些跟 uTools 窗口相关的功能

## [复制](api-reference__utools__copy.md)
执行复制文本、图像、文件(夹)

## [输入](api-reference__utools__input.md)
向系统窗口粘贴文本、图片、文件及向系统窗口输入文本

## [系统](api-reference__utools__system.md)
弹出通知、打开文件、在资源管理器中显示文件...

## [屏幕](api-reference__utools__screen.md)
取色、截图、及获取屏幕信息

## [用户](api-reference__utools__user.md)
通过用户接口，可以获取到用户的基本信息、临时 token 等

## [动态指令](api-reference__utools__features.md)
动态控制插件应用的功能指令

## [模拟按键](api-reference__utools__simulate.md)
模拟用户的键盘与鼠标按键操作

## [AI](api-reference__utools__ai.md)
调用 AI 能力，支持 Function Calling

## [FFmpeg](api-reference__utools__ffmpeg.md)
FFmpeg 以独立扩展的方式集成到 uTools, 可直接调用 FFmpeg

## [本地数据库](api-reference__db__local-db.md)
数据存储(离线优先，支持云备份&同步)

## [dbStorage](api-reference__db__db-storage.md)
基于 [本地数据库](api-reference__db__local-db.md) 基础上，封装的一套类 localStorage API

## [dbCryptoStorage](api-reference__db__db-crypto-storage.md)
基于 [本地数据库](api-reference__db__local-db.md) 数据加密存储, dbStorage 加密存储版本

## [可编程浏览器](api-reference__ubrowser__ubrowser.md)
uTools browser 简称 ubrowser，是根据 uTools 的特性，量身打造的一个可编程浏览器

## [ubrowser 管理](api-reference__ubrowser__ubrowser.md)
用于管理 ubrowser 的实例对象，以及设置 ubrowser 的代理对象等

## [团队应用](api-reference__team.md)
团队版插件应用相关的接口

## [用户付费](api-reference__payment.md)
插件应用接入增值付费

## [服务端 API](api-reference__server.md)
服务端使用 uTools 相关的一些接口。
