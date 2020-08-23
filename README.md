# quizシステム
簡単にオンラインクイズが開催できるプロジェクトです！

# 構成
+ /index.html ：回答者用サイト
+ /result.html ：出題者用サイト
+ /generate.html ：クイズ編集用サイト


# 使い方
1. [ソースのダウンロード](#1-%E3%82%BD%E3%83%BC%E3%82%B9%E3%81%AE%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89)
1. [Firebaseのプロジェクト作成](#2-firebase%E3%81%AE%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E4%BD%9C%E6%88%90)
1. [Node.jsのインストール](#3-nodejs%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
1. [プロジェクトのデプロイ](#4-nodejs%E3%81%A7%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4)
1. [クイズ編集用のユーザを登録](#5-%E3%82%AF%E3%82%A4%E3%82%BA%E7%B7%A8%E9%9B%86%E7%94%A8%E3%81%AE%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%92%E7%99%BB%E9%8C%B2)
1. [クイズを編集](#6-%E3%82%AF%E3%82%A4%E3%82%BA%E3%82%92%E7%B7%A8%E9%9B%86)
1. [動作確認](#7-%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D)

## 1. ソースのダウンロード

このGitのプロジェクトからソースを丸ごとダウンロード

## 2. Firebaseのプロジェクト作成

Firebaseの[コンソール](https://console.firebase.google.com/u/0/)から新しいプロジェクトを作成する

作成後、「ウェブアプリにFirebaseを追加」（</>のマーク）をクリックし、[アプリのニックネーム]を入力

var firebaseConfig = {...}をコピーして、1. でダウンロードした中にあるfirebaseConfig.jsに張り付ける

開発 > Realtime Databaseへすすみ、「データベース」を作成（ロックモードで作成でOK）

作成後、「ルール」タブに移動し、1. でダウンロードした中にあるrule.txtの内容を貼りつけて、「公開」

## 3. Node.jsのインストール

Node.jsをインストールする（インストール済みであれば不要）

<a>https://nodejs.org/ja/</a>


## 4. Node.jsでデプロイ

以下、Node.js command promptでの操作

```
# Firebase CLI をインストール
npm install -g firebase-tools

# firebase用のフォルダを作成
mkdir my-firebase-project
cd my-firebase-project

# ログイン（Webページが開いたら、Google アカウントを使用してログイン）
firebase --interactive login:ci

# Firebase プロジェクトを初期化
firebase init

# ※下記の質問は、ローカルでの作業ディレクトリ名を入力。ここでは「test1」とする
? What do you want to use as your public directory? test1

# 移動する
cd test1
```

作業ディレクトリ（test1）内のファイルをすべて、1. でダウンロードしたファイルに置き換え

デプロイ

```
firebase deploy

=== Deploying to 'xxxxx'...
....
+  Deploy complete!
Hosting URL: https://xxx.web.app ←これがサイトのURL
```

## 5. クイズ編集用のユーザを登録

firebaseコンソールから「Authentication」に進む

「Sign-in method」タブから「メール」を有効化

「Users」にて「ユーザーを追加」で適当なメールアドレスとパスワードを登録


## 6. クイズを編集
<a>https://xxx.web.app/generate.html</a>にアクセスし、5. のユーザーでログイン。（xxxの部分はプロジェクト名によって可変）

クイズの問題文などを編集し、「確定」ボタンをクリック。

## 7. 動作確認

確定ボタン押下後に表示される「出題者ページ」と「回答者ページ」のURLにアクセスし、表示内容を確認する
