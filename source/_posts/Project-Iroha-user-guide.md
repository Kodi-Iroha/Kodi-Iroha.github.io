---
title: Project-Iroha guide
tags:
  - interest
date: 2026-08-05 10:31:33
cover: /images/test_cover.jpg
description: guide line to creating post and running this website 

---

# Project - Iroha guide 

--- 

## New computer edit 

1. Copy down current repo file 
```
git clone https://github.com/Kodi-Iroha/Project-Iroha.git
```
2. Get into website folder 
```
cd Project-Iroha
```
3. Install hexo and other requirements 
```  
npm install
``` 

--- 


## Daily edit 

1. Update current folder (synchronize with the website) 
``` 
# download file from main branch 
git pull origin main 
```   

2. Create new blog post 
``` 
# use build-in command 
hexo new "Post Name" 
```  

3. Use custom command to preview post 
``` 
heox s 
``` 

4. Upload to Github and post it to public website 
``` 
git add .
git commit -m "Post Name and Changes" 
git push origin main
``` 
