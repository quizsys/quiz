# quizシステム
簡単にオンラインクイズが開催できるプロジェクトです！

# 目次
1. [概要](#%E6%A6%82%E8%A6%81)
1. [構成](#%E6%A7%8B%E6%88%90)
1. [使い方](#%E4%BD%BF%E3%81%84%E6%96%B9)

# 概要
バックエンドサービスにはFirebaseを利用しています。  
Firebaseとは、Googleが提供しているウェブアプリやモバイルアプリの開発プラットフォームです。  
本プロジェクトでは、Firebaseの提供する機能のうち下記の3つの機能を利用しました。
+ Hosting  
Webサイトの配信サービス。web.appのドメインを最初から使用でき、HTTPSでの通信が可能。

+ Realtime Database  
リアルタイムですべてのクライアントとデータの同期ができるデータベース。JSON形式でデータを保存する。JavaScriptを使って、データの読み込み・書き込みが非常に簡単にできる。

+ Authentication  
 認証機能。ログイン機能を簡単に実装可能。メールアドレスは勿論のこと、twitterやfacebookのアカウントを使ってログインすることができる。

# 構成
+ /index.html ：回答者用サイト
+ /result.html ：出題者用サイト
+ /generate.html ：クイズ編集用サイト


# 使い方
Firebaseのプロジェクト作成からクイズ大会の開始までの流れをまとめました。（約30分ほどで完了します）

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

Firebaseの[コンソール](https://console.firebase.google.com/u/0/)から新しいプロジェクトを作成する（要Googleアカウント）  
作成後、「ウェブアプリにFirebaseを追加」（</>のマーク）をクリックし、[アプリのニックネーム]を入力、「このアプリのFirebase Hostingも設定する」にチェック入れる（ここで表示されるプロジェクトIDを控える。）  
「登録」を押下する。残りの項目は「次へ」や「コンソールに戻る」でOK。  
左のリストからRealtime Databaseを選択、ルールはどちらを選んでもOK。（後で書き換えるため）

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
```

各質問への回答内容

```
? Are you ready to proceed? (Y/n)
→Y

? Which Firebase CLI features do you want to set up for this folder? 
→「Database:」と「Hosting:」を選択（上下キーで移動し、スペースで選択）し決定（Enterキー）

? Please select an option: (Use arrow keys)
→ Use an existing project を選択

? Select a default Firebase project for this directory: (Use arrow keys)
→2. で作成したプロジェクトID を選択

? What file should be used for Database Rules? (database.rules.json)
→何も入力せずEnter（デフォルトでOKのため）

? What do you want to use as your public directory? (public)
→何も入力せずEnter（デフォルトでOKのため）

? Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
→N
```
Firebase initialization complete!

が表示されれば完了。下記のファイルができている

```
my-firebase-project
│  .firebaserc
│  .gitignore
│  database.rules.json
│  firebase.json

└─public
        404.html
        index.html
```

publicフォルダ内のファイルをすべて、1. でダウンロードしたファイルに置き換え  
my-firebase-project配下のdatabase.rules.jsonを、1. でダウンロードしたdatabase.rule.jsonに置き換える  
Node.js command promptでデプロイ

```
# デプロイコマンド
firebase deploy
```

Deploy complete!  
が表示されればOK  
Hosting URL: https://xxx.web.app と表示される（xxxの部分はプロジェクトID）。これがサイトのURL。

## 5. クイズ編集用のユーザを登録

firebaseコンソールから「Authentication」に進む  
「Sign-in method」タブから「メール」を有効化  
「Users」にて「ユーザーを追加」で適当なメールアドレスとパスワードを登録（firebaseに登録したアドレスでなくても可能）


## 6. クイズを編集
https://xxx.web.app/generate.html にアクセスし、5. のユーザーでログイン。（xxxの部分はプロジェクトID）  
クイズの問題文などを編集し、「確定」ボタンをクリック。

## 7. 動作確認

確定ボタン押下後に表示される「出題者ページ」と「回答者ページ」のURLにアクセスし、表示内容を確認する
