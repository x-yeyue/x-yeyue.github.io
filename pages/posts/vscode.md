---
title: vscode快捷键及c++文件配置
date: 2026-04-03 21:40:30
updated: 2026-04-03 21:40:30
categories: 笔记
tags: 
  - 笔记
  - vscode
  - 快捷键
  - 杂项
---

# 快捷键

## 窗口快捷键

**打开|关闭左栏** `ctrl + D`

**打开|关闭下栏** `ctrl + J`


## 打开项目

`ctrl + K & ctrl + O`

## 打开文件

`ctrl + P` , 输入文件名

## 调用命令

**打开命令框** `ctrl + shift + P`

## 终端

**打开终端** ```ctrl + ` ```

**新建终端** ```ctrl + shift + ` ```

## 文件操作

**跳转至行** 
- `ctrl + G`, 输入行号  
- `ctrl + P`, `:` + 行号

**按单词移动** `ctrl + left|right`

**按单词删除** `ctrl + backspace`

**选中单词** 
- `ctrl + D`
- 多次点击 `ctrl + D` 选择多个相同单词

**删除行** `ctrl + shift + K` | `shift + delete`

**行中换行** `ctrl + enter`

**注释一行** `ctrl + /`

**添加一个缩进** `ctrl + ]`

**去除一个缩进** `ctrl + [`

**向上|向下移动行** `alt + up|down`

# 配置c++环境

**注意:** 文件名不能包含中文，否则会报错。

预定义变量:
- `${file}` : 当前打开的代码文件。
- `${fileDirname}` : 当前文件所在目录。
- `${workspaceFolder}` : 项目根目录。
- `${workspaceFolderBasename}` : 项目根目录名称。 
- `${fileBasenameNoExtension}` : 当前打开的代码文件的文件名(不含后缀)。

## c_cpp_properties.json

> 该文件属于 VScode 官方的 C/C++ 扩展(Microsoft C/C++)。

- **作用:** 为 VScode 提供 *C/C++* 项目的语言服务配置。用于支撑编译器的语法高亮、只能提示、代码跳转、头文件查找等功能。
- **生成方式:** 通过 VScode 命令面板(`Ctrl + Shift + P`) 输入 `C/C++: Edit Configurations(JSON)` 自动生成，也可收到那个创建。

```json
{
  // 版本号，扩展用
  "version": 4,
  "configurations": [
    {
      // 当前配置方案名
      "name": "WinLibs-GCC",
      // 指定编译器绝对路径（如 Linux 下 /usr/bin/g++、Windows 下 g++.exe 路径）
      "compilerPath": "D:\\App\\mingw64\\bin\\g++.exe", 
      // C 语言标准（仅影响 IntelliSense）
      "cStandard": "c23",
      // C++ 语言标准（仅影响 IntelliSense）
      "cppStandard": "c++20",
      // 选择解析模式（Windows 下的 GCC）
      "intelliSenseMode": "windows-gcc-x64",
      // 代码提示与头文件跳转需要搜索的目录（工作区与 src）
      "includePath": ["${workspaceFolder}/src/**", "${workspaceFolder}/**"],
      // 需要全局定义的宏（这里留空）
      "defines": []
    }
  ]
}
```

## tasks.json

> VScode 中*编译构建任务的核心配置文件*，负责定义程序的编译构建规则，生成可执行文件，依赖 C/C++ 扩展。

**作用:** 配置*自动化构建任务*，替代手动在终端输入 `g++ main.cpp -o main.exe`。

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            // 任务执行类型(shell/process)
            "type": "shell",
            // 当前编译方案名
            "label": "build cpp to bin",
            // 指定要执行的编译工具
            "command": "g++",
            // 编译命令给参数数组
            "args": [
	            // 生成包含调试信息的可执行文件(无则断点无效)
                "-g3",
                // 源文件:当前打开的代s码文件
                "${file}",
                // 指定输出可执行文件，和后面输出文件路径参数联系
                "-o",
                // 输出文件路径(windows)
                "${workspaceFolder}/bin/${fileBasenameNoExtension}.exe",
                // 指定 C++ 语言标准，与 c_cpp_properties.json 保持一致
                "-std=c++20",
            ],
            // 配置任务执行时的附加环境
            "options": {
	            // 任务执行的工作目录
                "cwd": "${workspaceFolder}"
            },
            // 配置编译任务执行时，终端面板的显示行为，避免无关信息干扰，提升使用体验。
            "presentation": {
				// 编译成功时不显示终端，仅编译失败时显示（推荐）
			    // 可选 "always"（总是显示终端）、"never"（从不显示终端）
				"reveal": "silent", 
			    // 所有编译任务复用同一个终端面板，避免生成多个面板
			    "panel": "shared", 
			    // 不回显编译命令本身，仅显示编译结果（警告/错误）
			    "echo": false 
            },
            "group": {
                "kind": "build",
                "isDefault": true
            },
            // 捕获编译过程中编译器输出的错误和警告信息
            // C/C++ 项目(GCC/g++/Clang)固定使用 "$gcc"，MSVC 编译器使用 "$msvc"
            "problemMatcher": [
                "$gcc"
            ],
            "detail": "生成编译文件,输出到 bin 目录下。"
        },
        {
            // 任务执行类型(shell/process)
            "type": "shell",
            // 当前编译方案名
            "label": "build cpp",
            // 指定要执行的编译工具
            "command": "g++",
            // 编译命令给参数数组
            "args": [
	            // 生成包含调试信息的可执行文件(无则断点无效)
                "-g3",
                // 源文件:当前打开的代码文件
                "${file}",
                // 指定输出可执行文件，和后面输出文件路径参数联系
                "-o",
                // 输出文件路径(windows)
                "main",
                // 指定 C++ 语言标准，与 c_cpp_properties.json 保持一致
                "-std=c++20",
            ],
            // 配置任务执行时的附加环境
            "options": {
	            // 任务执行的工作目录
                "cwd": "${workspaceFolder}"
            },
            // 配置编译任务执行时，终端面板的显示行为，避免无关信息干扰，提升使用体验。
            "presentation": {
				// 编译成功时不显示终端，仅编译失败时显示（推荐）
			    // 可选 "always"（总是显示终端）、"never"（从不显示终端）
				"reveal": "silent", 
			    // 所有编译任务复用同一个终端面板，避免生成多个面板
			    "panel": "shared", 
			    // 不回显编译命令本身，仅显示编译结果（警告/错误）
			    "echo": false 
            },
            "group": {
                "kind": "build",
                "isDefault": false
            },
            // 捕获编译过程中编译器输出的错误和警告信息
            // C/C++ 项目(GCC/g++/Clang)固定使用 "$gcc"，MSVC 编译器使用 "$msvc"
            "problemMatcher": [
                "$gcc"
            ]
        },
        {
            "type": "cppbuild",
            "label": "C/C++: g++.exe 生成活动文件",
            "command": "D:\\App\\mingw64\\bin\\g++.exe",
            "args": [
                "-fdiagnostics-color=always",
                "-g",
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}.exe"
            ],
            "options": {
                "cwd": "D:\\App\\mingw64\\bin"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": false
            },
            "detail": "调试器生成的任务。"
        }
    ]
}
```

## launch.json

> VScode 中 *调试配置核心文件*，依赖 C/C++ 扩展。

- **作用:** 指定调试器类型、待调试程序路径、运行参数、工作目录等，让 VScode 识别如何启动调试、连接调试器。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
	    // 当前调试方案名
      "name": "build cpp to bin",
      // 调试器类型(固定)
      "type": "cppdbg",
      // 调试请求类型(launch/attach)
      "request": "launch",
      // 待调试的可执行文件路径
      // "program": "${fileDirname}/${fileBasenameNoExtension}.exe",
      "program": "${workspaceFolder}\\bin\\${fileBasenameNoExtension}.exe",
      // 程序运行的命令行参数
      "args": [],
      // 是否在程序入口处暂停(main 处，方便调试)
      "stopAtEntry": false,
      // 调试时的工作目录
      "cwd": "${workspaceFolder}",
      "environment": [],
      // 是否启用外部控制台窗口
      "externalConsole": false,
      "MIMode": "gdb",
      // 调试器后端可执行文件的绝对路径
      // "miDebuggerPath": "/usr/bin/gdb",
      "miDebuggerPath": "D:\\App\\mingw64\\bin\\gdb.exe",
      // 调试器后端(如 GDB)预先发送的初始化命令列表
      "setupCommands": [
        {
          "description": "Enable pretty printing",
          "text": "-enable-pretty-printing",
          "ignoreFailures": true
        }
      ],
      // 调试前执行的前置任务(关联 tasks.json 中的编译任务->label)
      "preLaunchTask": "build cpp to bin",
      // 调试引擎日志配置
      "logging": {
        "engineLogging": false
      }
    }
  ]
}
```
