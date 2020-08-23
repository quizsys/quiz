# quizプロジェクト
簡単にオンラインクイズが開催できるプロジェクトです！

# 構成
+ /index.html ：回答者用サイト
+ /result.html ：出題者用サイト
+ /generate.html ：クイズ編集用サイト


# 使い方
1. Firebaseのプロジェクト作成
1. ソースのダウンロード
1. Node.jsのインストール
1. プロジェクトのデプロイ
1. クイズ編集用のユーザを登録
1. クイズを編集
1. 動作確認

# 詳細手順の説明

## 1. ソースのダウンロード

このサイトのdownloadからソースを丸ごとダウンロード

## 2. Firebaseのプロジェクト作成

Firebaseのコンソールから新しいプロジェクトを作成する

※プロジェクト名を設定して、作成でOK

<a>https://console.firebase.google.com/u/0/</a>

作成完了後に「ウェブアプリにFirebaseを追加」（</>のマーク）をクリックし、[アプリのニックネーム]を入力

var firebaseConfig = {...}をコピーして、1. でダウンロードした中にあるfirebaseConfig.jsに張り付ける

作成が完了したら、開発 > Realtime Databaseへすすみ、「データベース」を作成（ロックモードで作成でOK）

作成後、「ルール」タブに移動し、1. でダウンロードした中にあるrule.txtの内容を貼りつける

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

作業ディレクトリ内のファイルをすべて、1. でダウンロードしたファイルに置き換え

デプロイ

```
firebase deploy

=== Deploying to 'xxxxx'...
....
+  Deploy complete!
Hosting URL: https://xxxxx.web.app ←これがサイトのURL
```

## 5. クイズ編集用のユーザを登録

firebaseコンソールから「Authentication」に進む

「Sign-in method」タブから「メール」を有効化

「USers」にて「ユーザーを追加」で適当なメールアドレスとパスワードを登録


## 6. クイズを編集
<a>https://xxxxx.web.app/generate.html</a>にアクセスし、5. のユーザーでログイン。

クイズの問題文などを編集し、「確定」ボタンをクリック。

## 7. 動作確認

確定ボタン押下後に表示される「出題者ページ」と「回答者ページ」のURLにアクセスし、表示内容を確認する




