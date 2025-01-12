# VOC Sample Application

顧客の声（Voice of Customer）を収集・分析するためのWebアプリケーションのサンプルです。

## 技術スタック

- **フロントエンド**: Next.js 15.1.4, React 19, TailwindCSS
- **バックエンド**: Next.js API Routes
- **データベース**: PostgreSQL (Prisma ORM)

## 主な機能

- 顧客フィードバックの収集と管理
- フィードバックの分析とビジュアライゼーション
  - 感情分析
  - カテゴリー別分析
  - 年齢・性別による傾向分析
- レスポンシブなダッシュボード
- リアルタイムデータ更新

## セットアップ手順

### 必要条件

- Docker
- Node.js 20以上
- npm または yarn

### 開発環境のセットアップ

1. リポジトリのクローン:
```bash
git clone [repository-url]
cd feedback-charts
```

2. 環境変数の設定:
```bash
cd src
cp .env.example .env
```
`.env`ファイルを編集し、必要な環境変数を設定してください。

3. Dockerコンテナの起動:
```bash
cd ../docker
docker-compose up -d
```

4. 依存関係のインストール:
```bash
cd ../src
npm install
```

5. データベースのセットアップ:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

6. 開発サーバーの起動:
```bash
npm run dev
```

アプリケーションは http://localhost:3000 で利用可能になります。

## 開発コマンド

- `npm run dev`: 開発サーバーの起動
- `npm run build`: プロダクションビルド
- `npm run start`: プロダクションサーバーの起動
- `npm run lint`: コードの静的解析
- `npm run format`: コードのフォーマット

## データベース構造

主要なデータモデル（Feedback）:
- id: ユニークID
- userName: ユーザー名
- category: フィードバックカテゴリー
- sentiment: 感情分析結果
- comment: コメント内容
- gender: 性別
- age: 年齢
- rating: 評価点数
- createdAt: 作成日時

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。 