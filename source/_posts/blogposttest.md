---
title: blogposttest12
tags:
  - math
  - computer
date: 2026-05-07 06:44:15
cover: /images/test_cover.jpg
description: test for blogpost

---

# Project Iroha - 互動式技術文件庫

一個結合 **VitePress** 和 **Vue** 的現代技術文檔系統，專為清晰、互動式的技術教學設計。

--- 

| test      | hihi                  |
| --------- | --------------------- |
| hihi      | testse1               |
| **iroha** | test**test**`dai`suki |
| *hihi*    | testse1               |

| 功能           | 說明                                |
| ------------ | --------------------------------- |
| **創建技術文檔**   | 撰寫 Markdown 格式的教學文章，自動生成網站        |
| **互動角色對話**   | 使用 Iroha & Yachiyo 角色加強文章的可讀性與趣味度 |
| **深度知識卡片**   | 提供「IROHA's TIPS」區塊用於詳細解釋原理        |
| **代碼詳細拆解**   | 給代碼添加結構化註解，清楚標示要素和邏輯              |
| **自動生成 PDF** | 一鍵將文檔轉換為高品質 PDF 文件                |
| **本地實時預覽**   | 邊編寫邊實時看到效果                        |
| **自動目錄儀表板**  | 系統自動檢測所有章節，生成漂亮的導航卡片              |

--- 

``` bash
hexo new "My New Post" 
```

```
.
├── package.json              # 專案配置 + npm 腳本
├── build-pdf.js              # PDF 自動生成工具
├── index.md                  # 首頁儀表板
├── README.md                 # 本文件
│
├── 文檔文件 (可自由添加)
│   ├── example.md            # 格式示例
│   ├── test1.md              # 測試文檔
│   └── [your-content].md     # 你的教學內容
│
├── dist/                     # 構建輸出 (npm run build)
├── dist_pdf/                 # PDF 輸出 (npm run pdf)
│
└── .vitepress/               # VitePress 配置
    ├── config.ts             # 主配置
    ├── posts.data.mts        # 自動檢測文檔列表
    └── theme/                # 樣式主題
```

```python
int test = 5; 
print("HI")
```
test 
``` python
hihi
``` 
``` python 
print("Hello Iroha")
``` 

![iroha](../images/article_image/HNlfK_dbEAAYDfT.jpg) 

