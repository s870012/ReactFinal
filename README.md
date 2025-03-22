# Black Heart 電商網站

- 電商網站，使用 **React**、**Bootstrap 5** 和 **Vite** 建立。
- 僅作為練習用途，不作為商業使用。


## 功能

- 品牌故事、活動資訊介紹。
- 產品列表頁面，讓使用者選擇商品。
- 基本電商購物車操作，新增、刪減、移除。
- 基本電商訂單下定流程。
- 使用 Bootstrap 5 進行響應式頁面設計。

## 技術

- **React**：前端框架，用於構建用戶界面。
- **Bootstrap 5**：CSS 框架，用於快速構建響應式頁面。
- **Vite**：快速構建工具，用於開發和構建 React 應用。
- **React Router**：用於頁面路由管理。
- **Axios**：用於處理與後端 API 的請求。

## 安裝與運行

首先，確保你的開發環境中已安裝 [Node.js](https://nodejs.org/)。

### 1. 安裝依賴
```bash
$ npm install
```

### 3. 啟動開發伺服器
```bash
$ npm run dev
```

### 使用
- 進入網站後，可以進行註冊或登入。
- 在預約頁面選擇你希望預約的服務，並選擇時間。
- 預約成功後，會顯示你的預約詳細資訊。

### 結構
這個專案的文件結構大致如下：

```bash
/public                # 靜態資源
/src                   # 資源
  /components          # React 元件
  /pages               # 頁面
  /router              # 路由設置
  App.jsx               # 主應用文件
  main.js              # 應用入口文件
/vite.config.js        # Vite 配置文件
```