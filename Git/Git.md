# Git

安装

```bash
# linux
$ sudo apt-get install git

# Mac Os
$ brew install git
```

- Git Bash：命令行工具，类似于 Shell
- Git CMD：命令行工具
- Git FAQs：问题和解答
- Git GUI：图形用户界面
- Git Release Note：每个版本发布说明

Windows 安装后需要进行设置：

```bash
$ git config --global user.name "yourName"
$ git config --global user.email "email@example.com"
```

# 创建版本库

**仓库 Repository**：该目录中的所有文件，被 Git 管理跟踪，任何修改、删除都能跟踪，可以追踪历史、修改时间，方便还原

- `git init`：初始化仓库。将该仓库变成 Git 可以管理的仓库

`Initialized empty Git repository in /Users/michael/learngit/.git/` ：生成一个 `.git` 隐藏目录，用于跟踪管理版本库

Windows 自带的记事本在每个文件的开头添加了 `0xefbbbf` 的字符来保存 UTF-8 的文件

添加一个 `readme.md` 文件

- `git add xxx`：将文件添加到仓库

  ```bash
  $ git add readme.md
  ```

- `git commit`：提交到仓库

  - `-m 'xxx'`：添加说明

  ```bash
  $ git commit -m "wrote a readme file"
  ```

> 注意：
>
> 1. 命令必须在 Git 仓库内执行，即执行所有命令前必须先执行 `git init`
> 2. 添加文件时，文件必须在当前目录下不存在

- `git status`：查看当前仓库的状态。

- `git diff`：查看修改的内容

  ```bash
  $ git diff readme.md
  ```

# 时光机

## 版本回退

- `git log`：显示从最近到最远的提交日志。
  - `--pretty=oneline`：一行显示版本号

- `git reset`：回退到指定版本

  - `HEAD`：表示当前版本

    - `HEAD^`：上一个版本
    - `HEAD^^`：上上个版本
    - `HEAD~100`：往上 100 个版本

    ```bash
    # 回退指定版本, 写版本号的前几位
    $ git reset --hard 1094a
    ```

  - `--mixed`：将撤回的代码，存放到工作区，保留本地未提交内容

  - `--soft`：将撤回的代码，存放到暂存区，保留本地未提交内容

  - `--hard`：彻底回退到某个版本，本地没有 `commit` 的修改会被擦除 ( **慎用** )

    ```bash
    $ git reset --hard HEAD^
    ```

- `git reflog`：记录每一次命令

## 工作区和暂存区

- **工作区 ( Working Directory )**：电脑中的目录
- **版本库 ( Repository )**：工作区的隐藏目录 `.git`
  - **暂存区 ( stage / index )**：`git add` 命令将文件修改添加到暂存区
  - **分支 ( master ) **：`git commit` 命令将暂存区的所有内容提交到分支
  - `HEAD` 指针：指向 `master` 的指针

执行过程：修改 -> `git add .` 添加到暂存区 -> `git commit` 提交到分支

```sh
$ cat readme.md # 修改文件
$ git add readme.md # 添加到暂存区
$ git commit -m "git track changes" # 提交到分支
$ git status # 查看状态
```



## 撤销修改

```bash
$ git checkout -- readme.md
```

将 readme.md 文件在工作区中的修改全部撤销

- 修改但没有提交到暂存区，撤销到版本库
- 添加暂存区后的修改，撤销修改到添加暂存区时的状态

总结：将 `git commit` 回退到 `git add`

> **注意**：`--` 是撤销修改的意思，如果没有 `--` ，会变成切换分支命令

`git add` 后，使用 `git status` 查看状态，如果只是添加到暂存区，还没有提交 `commit`

可以使用 `git reset HEAD <file>` 将暂存区的修改撤销到工作区

```sh
$ git add .
$ git status
$ git reset HEAD readme.md
```

总结：

1. 舍弃工作区的修改，使用 `git checkout -- file`
2. 从工作区添加到了暂存区，舍弃暂存区的修改使用 : `git reset HEAD file` 再重复第一条撤销工作区的修改
3. 已经提交到版本库中，撤销本次提交，使用版本回退到上一版本。前提：没有推送到远程仓库

## 删除文件

1. 手动在文件管理器中删除

2. `git rm <file>` 删除文件再 `git commit` 提交到分支

> 注意：先手动删除，然后使用 `git rm <file>` 再 `git add <file>` 效果一样

如果删错了，可以通过版本库恢复误删文件：`git checkout -- <file> ` 将版本库中该文件的状态恢复到工作区

```sh
$ git checkout -- test.txt
```

# 远程仓库

1. 创建 SSH Key ，在 " **用户** " 目录下 查看有没有 `.ssh` 目录，如果存在，查看是否存在 `id_rsa` 和 `id_rsa.pub` 两个文件

   如果不存在，打开 Shell 创建 SSH Keys

   ```sh
   $ ssh-keygen -t rsa -C "email@example.com"
   ```

   输入邮件地址，使用默认值

2. 登录 Github 选择 `Settings` —— `SSH and GPG keys` —— `New SSH Key`，输入 任意 `Title` ，`Key` 粘贴 `id_rsa.pub` 的内容

## 添加远程仓库

1. 在 Github 中创建远程仓库

2. 根据提示，在本地仓库中运行命令

   ```sh
   $git remote add origin git@github.com:michaelliao/learngit.git
   ```

   
