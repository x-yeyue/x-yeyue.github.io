---
title: python虚拟环境
date: 2026-04-03 21:40:30
updated: 2026-04-03 21:40:30
categories: 笔记
tags: 
  - 笔记
  - python
---

# 生成 `.venv` 文件夹

```bash
python3 -m venv .venv
# 若提示 "python 不是内部命令"，改用 "python3"
```

# 激活虚拟环境

## windows

### cmd

```cmd
.venv\Scripts\activate.bat
```

### Powershell

```powershell
.\.venv\Scripts\Activate.ps1
	```

## mac\linux

```bash
source .venv/bin/activate
```

# 关联VScode

按 `ctrl + Shift + P` 输入 `Python:Select Interpreter` -> 选择 `.venv` 文件夹下的解释器。