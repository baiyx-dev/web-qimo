# shiyan6

> 面向文旅场景的酒店浏览与沉浸式展示平台，静态站点，部署于 Render。

## 项目概览

栖境旅宿是一个纯前端酒店展示平台，支持酒店筛选、排序与详情浏览。目前包含 4 家虚拟酒店品牌和一个历史文化子页面，每家酒店拥有独立的详情页、样式和交互脚本。

## 技术栈

- **前端：** HTML5 + CSS3 + 原生 JavaScript
- **依赖：** jQuery 3.7.1（本地引入）
- **字体：** Google Fonts — Manrope / Noto Serif SC / Noto Sans SC
- **部署：** Render 静态站点（render.yaml）

## 目录结构

```
shiyan6/
├── index.html                  # 首页：酒店列表、搜索筛选、标签排序
├── render.yaml                 # Render 部署配置
├── .gitignore
├── pages/
│   ├── hotel-bw.html           # B&W 海岸隐奢度假酒店
│   ├── hotel-bw-history.html   # B&W 历史文化页
│   ├── hotel-aurelle.html      # Aurelle Bay Hotel 奥瑞尔海湾酒店
│   ├── hotel-nexora.html       # NEXORA SKYLINE HOTEL 奈索拉云境酒店
│   └── hotel-sylvara.html      # SYLVARA FOREST RETREAT 西尔瓦森林秘境酒店
├── assets/
│   ├── css/                    # 样式文件（每页面独立 CSS）
│   ├── js/                     # 业务脚本（每页面独立 JS + hotel-list.js）
│   ├── images/
│   │   ├── common/             # 通用图片（logo、首页背景）
│   │   └── hotels/{hotel-id}/  # 各酒店独立图片目录
│   └── vendor/                 # 第三方库（jQuery）
└── docs/
    └── naming-conventions.md   # 命名规范与新增酒店指引
```

## 酒店品牌

| 编号 | 名称 | 城市 | 价格 | 评分 | 标签 |
|------|------|------|------|------|------|
| `bw` | B&W 海岸隐奢度假酒店 | 海岸度假区 | ¥1,680 | 4.9 | 海景、疗愈、隐奢 |
| `aurelle` | Aurelle Bay Hotel 奥瑞尔海湾酒店 | 海南·陵水 | ¥1,460 | 4.8 | 海景、疗愈、轻奢 |
| `nexora` | NEXORA SKYLINE HOTEL 奈索拉云境酒店 | 上海·陆家嘴 | ¥1,880 | 4.86 | 城市、科技、夜景 |
| `sylvara` | SYLVARA FOREST RETREAT 西尔瓦森林秘境酒店 | 云南·香格里拉 | ¥1,580 | 4.88 | 森林、疗愈、自然 |

## 主要功能

- **搜索筛选：** 按关键词、价格区间、体验标签（海景/亲子/城市/科技/森林/疗愈）筛选
- **排序：** 推荐优先 / 价格低到高 / 评分高到低
- **酒店详情页：** 每间酒店有沉浸式展示页面，包含图片轮播、设施介绍等
- **历史文化页：** B&W 品牌专属子页面
- **响应式设计：** 适配移动端与桌面端

## 命名规范

- 文件名：小写英文 + 短横线连接（`hotel-aurelle.html`）
- 资源路径：根目录引用 `assets/...`，pages 内引用 `../assets/...`
- 酒店图片：按用途命名（`hero-exterior.png`、`lobby.png`、`room-suite.png` 等）

## 新增酒店步骤

1. 创建详情页 `pages/hotel-{id}.html`
2. 创建样式 `assets/css/hotel-{id}.css`
3. 创建脚本 `assets/js/hotel-{id}.js`
4. 创建图片目录 `assets/images/hotels/{id}/`
5. 在 `assets/js/hotel-list.js` 的 `hotels` 数组中新增数据

## 近期提交

- `c2a2e79` — Reorganize hotel site pages and assets
- `afe74c4` — add history culture page
- `355661a` — Add logo treatment and refine hero interactions
- `7b0a934` — Refine scroll-triggered animation behavior
- `4417244` — Initial site setup for GitHub and Render deployment
