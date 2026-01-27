# GitHub Copilot Instructions

## プロジェクト概要
- 目的: GitHub の Branch Protection rules を Ruleset に移行するための支援スクリプト群
- 主な機能:
  - 全リポジトリの Branch Protection rules の取得
  - ルールが存在するリポジトリのフィルタリング
  - 必要なステータスチェックのコンテキストリスト生成
  - Ruleset の登録（スタブ状態／未完成）
- 対象ユーザー: 管理者

## 共通ルール
- 会話は日本語で行う。
- PR とコミットは Conventional Commits に従う。
- 日本語と英数字の間には半角スペースを入れる。

## 技術スタック
- 言語: JavaScript (ES Modules, .mjs)
- ライブラリ: @octokit/rest, @octokit/graphql
- パッケージマネージャー: pnpm

## 開発コマンド
```bash
# 依存関係のインストール
pnpm install

# スクリプトの実行 (github-transfer-ruleset ディレクトリ内)
node 1.get-all-branch-protection.mjs
node 2.filter-rule-exist-repos.mjs
node 3.generate-list.mjs
node 4.register-ruleset.mjs
```

## コーディング規約
- 非同期処理は `async/await` を使用する。
- 外部 API（GitHub API）との通信には Octokit を使用する。
- ファイル操作には `fs` モジュールを使用する。

## 注意事項
- GitHub API トークンは `../github-token.txt` に保存されている必要がある。
- 実行結果は `data/` ディレクトリに出力される。
- `4.register-ruleset.mjs` は現在未完成の状態であり、実装が必要。
