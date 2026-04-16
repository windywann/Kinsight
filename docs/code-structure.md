# Kinsight Demo 代码结构说明

## 1. 重构目标

本次重构主要解决 3 个问题：

- 原有页面全部散落在项目根目录，页面数量增多后难以查找
- 大量 CSS 和 JS 直接写在 HTML 内部，维护和复用成本高
- 页面之间的跳转关系、业务模块边界、资源职责都不够清晰

重构后保留原生 `HTML + CSS + JavaScript` 方案，不引入额外构建工具，重点完成：

- 全量页面迁移到按业务分类的子目录
- 页面样式与脚本从 HTML 中分离
- CSS、JS 按模块分类存放
- 页面链接统一更新为新目录结构

---

## 2. 当前目录结构

```text
Kinsight/
├── assets/
│   ├── css/
│   │   ├── causal/
│   │   ├── device/
│   │   ├── home/
│   │   └── uplift/
│   └── js/
│       ├── causal/
│       ├── device/
│       ├── home/
│       └── uplift/
├── docs/
│   └── code-structure.md
├── pages/
│   ├── causal/
│   ├── device/
│   ├── home/
│   └── uplift/
└── 设计规范.md
```

---

## 3. 目录职责说明

### 3.1 `pages/`

存放所有页面文件，按业务域分类。

#### `pages/home/`
首页相关页面。

#### `pages/uplift/`
Uplift 建模相关页面，包括：

- 项目管理
- 项目详情
- 任务详情
- 人群包管理
- 人群包详情

#### `pages/causal/`
因果发现相关页面，包括：

- 项目管理
- 项目详情

#### `pages/device/`
端智能建模相关页面，包括：

- 项目管理
- 任务详情
- eve 包管理
- 新建任务弹窗页

### 3.2 `assets/css/`

存放页面样式文件，按业务模块分类。

规则：

- 一个页面对应一个独立 CSS 文件
- 文件名与页面文件保持一致
- 页面只通过 `<link>` 引入，不再内嵌大段 `<style>`

### 3.3 `assets/js/`

存放页面脚本文件，按业务模块分类。

规则：

- 一个页面对应一个独立 JS 文件
- 文件名与页面文件保持一致
- 页面只通过 `<script src="..."></script>` 引入，不再内嵌大段脚本

### 3.4 `docs/`

存放项目说明性文档。

当前已新增：

- `docs/code-structure.md`：说明当前代码结构、页面映射和维护规范

---

## 4. 页面迁移映射

### 首页

- `home-demo.html` → `pages/home/home-demo.html`

### Uplift 建模

- `uplift-task-list-demo.html` → `pages/uplift/uplift-task-list-demo.html`
- `uplift-project-detail-demo.html` → `pages/uplift/uplift-project-detail-demo.html`
- `uplift-task-detail-demo.html` → `pages/uplift/uplift-task-detail-demo.html`
- `uplift-audience-package-demo.html` → `pages/uplift/uplift-audience-package-demo.html`
- `uplift-audience-package-detail-demo.html` → `pages/uplift/uplift-audience-package-detail-demo.html`

### 因果发现

- `causal-project-list-demo.html` → `pages/causal/causal-project-list-demo.html`
- `causal-project-detail-demo.html` → `pages/causal/causal-project-detail-demo.html`

### 端智能建模

- `task-list-demo.html` → `pages/device/task-list-demo.html`
- `task-detail-demo.html` → `pages/device/task-detail-demo.html`
- `eve-package-demo.html` → `pages/device/eve-package-demo.html`
- `create-task-modal.html` → `pages/device/create-task-modal.html`

---

## 5. 资源映射规则

### CSS 映射规则

页面样式文件统一放到：

```text
assets/css/<模块>/<页面同名>.css
```

示例：

- `pages/causal/causal-project-list-demo.html`
  - 对应 `assets/css/causal/causal-project-list-demo.css`
- `pages/uplift/uplift-task-detail-demo.html`
  - 对应 `assets/css/uplift/uplift-task-detail-demo.css`

### JS 映射规则

页面脚本文件统一放到：

```text
assets/js/<模块>/<页面同名>.js
```

示例：

- `pages/causal/causal-project-detail-demo.html`
  - 对应 `assets/js/causal/causal-project-detail-demo.js`
- `pages/device/task-list-demo.html`
  - 对应 `assets/js/device/task-list-demo.js`

---

## 6. 当前重构结果

本次已经完成：

- 根目录页面全部迁移到 `pages/`
- 页面内联样式基本已拆分到 `assets/css/`
- 页面内联脚本基本已拆分到 `assets/js/`
- 页面之间的跳转链接已切换到新路径
- 首页原有独立 `home-demo.css` / `home-demo.js` 也已纳入统一目录

---

## 7. 后续维护规范

后续新增页面时，建议遵守以下规则：

### 7.1 页面新增规则

新增页面必须放到对应业务目录：

- 首页类页面 → `pages/home/`
- Uplift 页面 → `pages/uplift/`
- 因果发现页面 → `pages/causal/`
- 端智能建模页面 → `pages/device/`

### 7.2 样式规则

- 不再在 HTML 中写大段 `<style>`
- 页面私有样式放在对应模块目录下
- 如果未来多个页面出现重复样式，可继续抽出：

```text
assets/css/common/
```

### 7.3 脚本规则

- 不再在 HTML 中写大段内联 `<script>`
- 页面逻辑放在独立 JS 文件中
- 如果未来多个页面出现重复逻辑，可继续抽出：

```text
assets/js/common/
```

例如可进一步抽离：

- 导航展开逻辑
- toast 提示
- 分页逻辑
- 公共弹窗能力
- URL 参数解析工具

### 7.4 命名规则

建议继续保持：

- 页面名、CSS 文件名、JS 文件名一一对应
- 业务前缀明确，例如：
  - `uplift-*`
  - `causal-*`
  - `task-*`
  - `home-*`

这样可以降低查找和维护成本。

---

## 8. 推荐的下一步优化

这次重构已经完成“目录整理 + 样式脚本分离”，如果后续继续优化，建议按下面顺序做：

1. 抽公共样式层：`assets/css/common/`
2. 抽公共脚本层：`assets/js/common/`
3. 统一导航、按钮、表格、弹窗、分页等通用结构
4. 再考虑是否需要模板化或组件化

当前这一步已经足够让代码结构从“单文件散落”变成“按模块可维护”。
