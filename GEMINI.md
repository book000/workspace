# GEMINI.md

## 目的
Gemini CLI 向けのコンテキストと作業方針を定義する。

## 出力スタイル
- 言語: 日本語
- トーン: 専門的かつ簡潔
- 形式: Markdown

## 共通ルール
- 会話言語: 日本語
- コミット規約: Conventional Commits
- 日本語と英数字の間には半角スペースを挿入

## プロジェクト概要
- 目的: GitHub Branch Protection rules の Ruleset 移行支援
- 主な機能: ルールの取得、フィルタリング、リスト生成、登録

## コーディング規約
- フォーマット: 既存のコードスタイルを維持
- 命名規則: キャメルケースを使用
- コメント言語: 日本語
- エラーメッセージ言語: 英語

## 開発コマンド
```bash
# 依存関係のインストール
pnpm install

# スクリプトの実行
node github-transfer-ruleset/1.get-all-branch-protection.mjs
node github-transfer-ruleset/2.filter-rule-exist-repos.mjs
node github-transfer-ruleset/3.generate-list.mjs
node github-transfer-ruleset/4.register-ruleset.mjs
```

## 注意事項
- 認証情報のコミット禁止（特に `../github-token.txt`）
- ログへの機密情報出力禁止
- 既存ルールの優先
- `4.register-ruleset.mjs` は未完成の状態であるため、改修の際は注意すること。

## リポジトリ固有
- GitHub GraphQL API および REST API を使用している。
- 実行結果は `github-transfer-ruleset/data/` ディレクトリに保存される（スクリプトによってパスの指定が異なる場合があるため、各ファイルの `fs.writeFileSync` を確認すること）。
