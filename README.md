# backlog-linkCopier (backlogの課題キーコピー機能を拡張するChrome拡張機能くん)
## 機能
- Altキー+backlogの課題コピーボタン
    - → Markdown形式のリンク `[課題キー 課題タイトル](課題URL)` をクリップボードにコピー
    - → Slack, Google Docsなどに貼り付けたときは`課題キー タイトル`がリンク付きテキスト形式になる
- Altキー+Shiftキー+課題キーコピーボタン
    - → 課題キーのみに対して上と同様の挙動

## 導入方法
### インストール
1. Zipでダウンロードする
2. 展開する
3. Chromeの拡張機能ページを開く
    - `chrome://extensions/`
4. デベロッパーモードをONにする
5. 「パッケージ化されていない拡張機能を読み込む」をクリック
6. 展開したフォルダを選択する

### 初期設定
初めて使うときには「クリップボードへのアクセスを許可する」と聞かれるので、「許可する」をクリックしてください。

## 制作者
Nanamachi <7machi@nanamachi.net>

## ライセンス
CC0-1.0