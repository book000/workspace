# CLAUDE.md

## 目的
Claude Code の作業方針とプロジェクト固有ルールを示す。

## 判断記録のルール
- 判断内容の要約
- 検討した代替案
- 採用しなかった案とその理由
- 前提条件・仮定・不確実性
- 他エージェントによるレビュー可否

## プロジェクト概要
- 目的: GitHub の Branch Protection rules を Ruleset に移行するための支援スクリプト群
- 主な機能: Branch Protection の取得、フィルタリング、リスト生成、Ruleset 登録

## 重要ルール
- 会話言語: 日本語
- コミット規約: Conventional Commits
- コメント言語: 日本語
- エラーメッセージ言語: 英語
- 日本語と英数字の間には半角スペースを挿入

## 環境のルール
- ブランチ命名: Conventional Branch (feat/, fix/)
- GitHub リポジトリ調査方法: `gh` CLI または Octokit を使用したスクリプト
- Renovate PR の扱い: 手動での更新は行わない

## コード改修時のルール
- エラーメッセージの絵文字統一: 既存の形式がある場合はそれに従う
- JavaScript: ES Modules (`.mjs`) を使用する
- docstring: 関数・クラスに日本語で JSDoc を記載する

## 相談ルール
-実装レビュー、局所設計、整合性確認
- Gemini CLI: 外部仕様、最新情報確認

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

## アーキテクチャと主要ファイル
- `github-transfer-ruleset/`: スクリプト本体
  - `1.get-all-branch-protection.mjs`: GraphQL を使用して全ルールの取得
  - `2.filter-rule-exist-repos.mjs`: 有効なルールのフィルタリング
  - `3.generate-list.mjs`: TSV 形式のリスト生成
  - `4.register-ruleset.mjs`: Ruleset の登録（未実装）
- `data/`: 実行結果の保存先（`.gitignore` で除外）

## テスト
- 現時点では自動テストは導入されていない。
- 各スクリプトの実行結果を確認することで動作検証を行う。

## 作業チェックリスト

### 新規改修時
1. プロジェクトを理解する
2. 作業ブランチが適切であることを確認する
3. 最新のリモートブランチに基づいた新規ブランチであることを確認する
4. PR がクローズされた不要ブランチが削除済みであることを確認する
5. pnpm で依存関係をインストールする

### コミット・プッシュ前
1. Conventional Commits に従っていることを確認する
2. センシティブな情報（特に `../github-token.txt`）が含まれていないことを確認する
3. 動作確認を行う

### PR 作成前
1. PR 作成の依頼があることを確認する
2. センシティブな情報が含まれていないことを確認する
3. コンフリクトの恐れがないことを確認する

### PR 作成後
1. コンフリクトがないことを確認する
2. PR 本文が最新状態のみを網羅していることを確認する
3. `gh pr checks <PR ID> --watch` で CI を確認する（CI がある場合）
4. Copilot レビューに対応し、コメントに返信する

## リポジトリ固有
- GitHub API トークンは `../github-token.txt` から読み込む。このファイルはリポジトリ外に配置される。
- GraphQL API を多用している。
