# Kinsight 启动指南

## 项目概述
当前仓库是原生 HTML/CSS/JavaScript 静态站点（无 Node 构建脚本）。
前端页面位于 `pages/` 目录，可通过本地静态服务器直接预览。

## . - Kinsight Static Frontend

### 快速启动

```bash
cd .
python3 -m http.server 7001
```

**启动后访问**：http://localhost:7001/pages/home/home-demo.html

```yaml
subProjectPath: .
command: python3 -m http.server 7001
cwd: .
port: 7001
previewUrl: http://localhost:7001/pages/home/home-demo.html
description: 使用 Python 静态文件服务器启动 Kinsight 前端站点，页面入口在 pages 目录下。
```

## 常用页面入口

- 首页：http://localhost:7001/pages/home/home-demo.html
- 因果发现项目管理：http://localhost:7001/pages/causal/causal-project-list-demo.html
- Uplift 项目管理：http://localhost:7001/pages/uplift/uplift-task-list-demo.html
- 端智能任务列表：http://localhost:7001/pages/device/task-list-demo.html
