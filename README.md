# MessageWall 留言墙

一个全栈留言墙应用，支持用户发布文字留言和图片分享，进行点赞、评论等互动。

---

## 项目结构

```
MessageWall/
├── server/                        # 后端服务
│   ├── config/
│   │   └── index.ts               # 数据库及服务器配置
│   ├── controller/
│   │   └── dbService.ts           # 业务逻辑层（CRUD 操作）
│   ├── lib/
│   │   └── db.ts                  # 数据库连接池 & SQL 封装 & 表初始化
│   ├── routes/
│   │   └── index.ts               # API 路由定义
│   ├── views/                     # EJS 模板文件
│   ├── index.ts                   # Express 服务入口
│   ├── tsconfig.json
│   └── package.json
│
├── web/                           # 前端应用
│   ├── src/
│   │   ├── api/
│   │   │   ├── index.ts           # API 请求封装
│   │   │   └── types.ts           # 请求类型定义
│   │   ├── assets/
│   │   │   ├── fonts/             # 字体 & 图标字体 (iconfont)
│   │   │   └── images/            # 图片 & 视频资源
│   │   ├── components/
│   │   │   ├── TopBar.vue         # 顶部导航栏
│   │   │   ├── FooterBar.vue      # 底部栏
│   │   │   ├── TitleBar.vue       # 标题栏
│   │   │   ├── Tabs.vue           # 标签页容器
│   │   │   ├── TabsItem.vue       # 标签项
│   │   │   ├── NoteCard.vue       # 文字留言卡片
│   │   │   ├── PhotoCard.vue      # 图片卡片
│   │   │   ├── CardDetail.vue     # 卡片详情弹窗
│   │   │   ├── NewCard.vue        # 新建留言表单
│   │   │   ├── YlModal.vue        # 通用模态框
│   │   │   ├── YlViewer.vue       # 图片预览器
│   │   │   └── YlButton.vue       # 通用按钮
│   │   ├── consts/
│   │   │   └── index.ts           # 常量（标签、颜色、头像等）
│   │   ├── router/
│   │   │   └── index.ts           # Vue Router 路由配置
│   │   ├── store/
│   │   │   └── index.ts           # Pinia 状态管理
│   │   ├── styles/
│   │   │   ├── common.less        # 全局 Less 样式
│   │   │   └── tailwind.css       # Tailwind CSS 入口
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript 类型定义
│   │   ├── utils/
│   │   │   ├── index.ts           # 工具函数
│   │   │   ├── request.ts         # Axios 请求封装
│   │   │   └── env.ts             # 环境变量
│   │   ├── views/
│   │   │   ├── YileIndex.vue      # 主布局页
│   │   │   └── WallMsg.vue        # 留言墙 / 照片墙视图
│   │   ├── App.vue                # 根组件
│   │   └── main.ts                # 应用入口
│   ├── tailwind.config.js         # Tailwind 配置
│   ├── vite.config.ts             # Vite 构建配置
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 功能特性

- **留言墙** — 发布文字留言，支持分类标签（全部、旅行、日常、学习、工作、美食、运动）
- **照片墙** — 分享图片，支持分类浏览（我、ta、喜欢的、有意义的、值得纪念的）
- **点赞/踩/撤销** — 对留言和照片进行反馈互动
- **评论系统** — 对留言进行评论回复
- **卡片式 UI** — 瀑布流布局展示，支持详情弹窗
- **图片预览** — 照片墙支持大图预览和前后切换
- **响应式设计** — 基于 Tailwind CSS 的现代化界面

---

## 技术栈

| 层级 | 技术 |
|------|------|
| **前端框架** | Vue 3 (Composition API) + TypeScript |
| **构建工具** | Vite 7 |
| **CSS 方案** | Tailwind CSS 4 + Less |
| **状态管理** | Pinia 3 |
| **路由** | Vue Router 4 |
| **HTTP 请求** | Axios |
| **Mock 数据** | MockJS |
| **后端框架** | Express 5 + TypeScript |
| **数据库** | MySQL (mysql2) |
| **模板引擎** | EJS |
| **文件上传** | Multer |
| **热重载** | Nodemon |

---

## 快速开始

### 环境要求

- **Node.js** >= 18
- **MySQL** >= 5.7
- **包管理器**：npm / yarn / pnpm

### 1. 克隆项目

```bash
git clone <repository-url>
cd MessageWall
```

### 2. 配置数据库

编辑 `server/config/index.ts`，确保数据库连接信息正确：

```ts
export default {
  port: 3000,
  database: {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root',
    WALL: 'WALL',
  },
}
```

> 数据库和表结构会在服务首次启动时自动创建（详见 `server/lib/db.ts` 中的 `initialize()` ）。

### 3. 启动后端

```bash
cd server
yarn install        # 或 npm install
yarn start          # 或 npm start，通过 nodemon 启动
```

后端服务默认运行在 `http://localhost:3000`。

### 4. 启动前端

```bash
cd web
pnpm install        # 或 npm install / yarn install
pnpm dev            # 或 npm run dev / yarn dev
```

前端开发服务器默认运行在 `http://localhost:3001`，通过 Vite 代理将 `/api` 请求转发到后端。

### 5. 访问应用

打开浏览器访问 `http://localhost:3001`。

---

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/insertwall` | 新建留言 / 图片 |
| POST | `/insertfeedback` | 添加反馈（点赞/踩/撤销） |
| POST | `/insertcomment` | 添加评论 |
| POST | `/removewall` | 删除留言（级联删除关联数据） |
| POST | `/removefeedback` | 删除反馈 |
| POST | `/removecomment` | 删除评论 |
| GET | `/selectwalls` | 分页查询留言列表（含点赞数/踩数/评论数） |
| GET | `/selectcommentpage` | 分页查询评论列表 |

---

## 数据库表结构

### walls（留言墙主表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK) | 主键自增 |
| type | INT | 0=文字, 1=图片 |
| message | VARCHAR(255) | 留言内容 |
| name | VARCHAR(100) | 留言者姓名 |
| userId | VARCHAR(100) | 留言者 ID |
| moment | DATETIME | 留言时间 |
| label | INT | 标签分类 |
| color | INT | 卡片颜色 |
| imgurl | VARCHAR(255) | 图片地址 |

### feedbacks（反馈表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK) | 主键自增 |
| wallId | INT | 关联留言 ID |
| userId | VARCHAR(100) | 反馈者 ID |
| type | INT | 0=喜欢, 1=举报, 2=撤销 |
| moment | DATETIME | 反馈时间 |

### comments（评论表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK) | 主键自增 |
| wallId | INT | 关联留言 ID |
| userId | VARCHAR(100) | 评论者 ID |
| imgurl | VARCHAR(255) | 评论者头像 |
| comment | VARCHAR(255) | 评论内容 |
| name | VARCHAR(100) | 评论者姓名 |
| moment | DATETIME | 评论时间 |

---

## 开发说明

- 前端使用 **Vite 代理** 解决开发环境跨域问题，`/api` 前缀的请求会被转发到后端
- 后端使用 **TypeScript** 编写，通过 `nodemon` 实现文件变更自动重启
- 数据库在首次启动时 **自动建库建表**，无需手动执行 SQL
- 前端样式方案为 **Tailwind CSS + Less 混合使用**，全局 Less 变量通过 `vite.config.ts` 自动注入