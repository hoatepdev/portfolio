---
title: "如何在 Mac 安裝 Node.js & NPM"
category: DevEnv
publishedAt: 2024-01-03
summary: "新年剛好把 MacOS 重灌，讓這台老 macbook pro 2020 重獲新生，也藉此機會重新建置開發環境。因此我們將示範如何在 Mac 安裝 Node.js 以及 NPM，其實直接從官網安裝 Node.js 時就會同時安裝 NPM，因此我將以 Mac 作為示範如何在成功安裝 Node.js，並且展示成功結果！"
tags:
  - Node
  - npm
  - Mac
  - Install
banner: /images/banner/posts/mac-install-nodejs-npm.webp
hidden: true
---

新年剛好把 MacOS 重灌，讓這台老 macbook pro 2020 重獲新生，也藉此機會重新建置開發環境。

因此我們將示範如何在 Mac 安裝 `Node.js` 以及 `NPM`，其實直接從官網安裝 `Node.js` 時就會同時安裝 `NPM`，因此我將以 Mac 作為示範如何在成功安裝 `Node.js`，並且展示成功結果！

![如何在 Mac 安裝 Node.js & NPM by Hugo](/images/banner/posts/mac-install-nodejs-npm.webp)

👉🏻 [Node.js 官網連結](https://nodejs.org/en?source=post_page-----3d7101d998f4--------------------------------)

#### 下載 LTS 的版本

![選擇 LTS 版本](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*aREalwTkLM8kSMAokcCBvw.png)

#### 點擊下載的 `node-vx.x.x.pkg` 檔安裝 `Node.js`

緊接著就是點擊 MacOS 安裝的一堆確認（建議安裝時可以看一下細節！）

![](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*dAvr0F9ceBHDgU7PCeDGtA.png)

![](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*62YZY321G_LxvvFvHNiblA.png)

![](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*jpdJaKgGK14D8H1ypSuQ3g.png)

![](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*PNhmDNjLvukKMrVKwQhjRg.png)

![](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*F8rHXI-ZTIJkwpb9G6aGWw.png)

![](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*IaKki0SZuybAVHPCev-G-g.png)

#### 成功安裝後我們回到 Terminal

安裝成功後，我們可以透過 Terminal 使用 `which` 確認是否安裝成功，可以試著在 Terminal 輸入以下命令：

```bash
$ which npm
/usr/local/bin/npm

$ which node
/usr/local/bin/node
```

![有成功回傳路徑就是成功！](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wWCsxVfJS98KftYNcypWhg.png)

#### 輸入 node & npm Command

我們可以就在 Terminal 做 `node` & `npm` 的 command 啦！

![node command](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*P_rTeMsh4tUrbfbdR4KkNw.png)

![npm command](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*YGQ7GD9BDgk49o0Y14hItQ.png)

#### 啟動一個 web server

我們可以另外寫一個 web server 的 app 來測試一下，這邊我們使用 `http` 來啟動一個 web server，實作程式碼如下：

```javascript
// server.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(3000, "localhost", () => {
  console.log("Server running at http://localhost:3000/");
});
```

接著我們透過 `node` 來啟動這個 web server，輸入以下命令：

```bash
$ node server.js
Server running at http://localhost:3000/
```

![run the server](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RKp-Y_Tet-mljSanTCKfcw.png)

接著我們前往瀏覽器點開 `http://localhost:3000/`，就可以看到 `Hello World` 的字串啦！結果如下圖，如果有看到 `Hello World` 就代表我們完全成功啦！

![Hello World !!!](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1JkRsWl-n7Gex7hsnbb7xA.png)

這樣就大功告成啦！祝大家開發順利！也祝大家新年快樂！
