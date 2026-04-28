# 项目目录与命名规范

## 目录结构

- `index.html`：酒店浏览首页，保留在根目录，方便部署直接访问。
- `pages/`：二级页面，例如酒店详情页、酒店文化页。
- `assets/css/`：全部样式文件。
- `assets/js/`：全部业务脚本文件。
- `assets/images/common/`：通用图片，例如 logo。
- `assets/images/hotels/{hotel-id}/`：每个酒店独立图片目录。
- `assets/vendor/`：本地第三方库，例如 jQuery。
- `docs/`：项目说明和命名规范。

## 文件命名

统一使用小写英文、短横线连接，不使用中文、空格或下划线。

示例：

- 页面：`pages/hotel-aurelle.html`
- 样式：`assets/css/hotel-aurelle.css`
- 脚本：`assets/js/hotel-aurelle.js`
- 图片：`assets/images/hotels/aurelle/hero-exterior.png`

## 酒店编号

每家酒店使用一个稳定的 `hotel-id`，只使用小写英文。

当前编号：

- `bw`：B&W 隐奢度假酒店
- `aurelle`：Aurelle Bay Hotel 奥瑞尔海湾酒店
- `nexora`：NEXORA SKYLINE HOTEL 奈索拉云境酒店
- `sylvara`：SYLVARA FOREST RETREAT 西尔瓦森林秘境酒店

## 新增酒店规则

假设新增酒店编号为 `sunset`：

1. 新建详情页：`pages/hotel-sunset.html`
2. 新建样式：`assets/css/hotel-sunset.css`
3. 新建脚本：`assets/js/hotel-sunset.js`
4. 新建图片目录：`assets/images/hotels/sunset/`
5. 图片按用途命名：
   - `hero-exterior.png`
   - `lobby.png`
   - `room-suite.png`
   - `restaurant.png`
   - `infinity-pool.png`
6. 在 `assets/js/hotel-list.js` 的 `hotels` 数组中新增一条酒店数据。

## 路径规则

- 根目录 `index.html` 引用资源时使用：`assets/...`
- `pages/` 内页面引用资源时使用：`../assets/...`
- 酒店列表里的详情链接使用：`pages/hotel-{hotel-id}.html`
