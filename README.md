# 概要

# このアプリの動作方法
## 依存ライブラリのインストール
このアプリケーションでは`pnpm`を利用している

```
pnpm i
```

## 設定ファイルの構築
### 1.設定ファイルのコピー

```
cp sample.wrangler.toml wrangler.toml
```

## Supabaseのローカル環境の作成
Supabaseのローカル環境はDockerにより構成されているため事前に[Docker Desktop](https://www.docker.com/products/docker-desktop/)をインストール巣必要がある

### 1.supabase CLIの導入
https://supabase.com/docs/reference/cli/global-flags
公式ページを参考にCLIをPCに導入する

### 2.supabaseをプロジェクト内で初期化
Intel Macの場合Supabaseのコンテナが正しく動作しない[バグ](https://github.com/supabase/cli/issues/1083#issuecomment-1691431279)があるため注意
```
supabase init
```

# 環境の起動
supabaseのローカル環境で起動
```
supabase studio
```

APIサーバーの起動
```
pnpm dev
```

# DB更新
supabaseのデータベースはPostgreSQLで構築されており、Migration及びSeedingはPostgreSQLのクエリの操作により行われる

## migration
### 1.migrationファイルの作成
```
supabase migration new <MIGRATION_NAME>
```

### 2.migrationファイルの編集
作成された`supabase/migtasions/<TIMESTAMP_MIGRATION_NAME>.sql`の編集を行う

### 3.migrationファイルの適用
`local`オプションを追加する事で`local`で構築されているSupabaseの環境へデプロイを行う事ができる。本番環境
```
supabase migration up --local
```

## seeding
### 1.seed.sqlファイルの更新
`supabase/seed.sql`の内容の更新を行う

### 2.seed
```
supabase seed --local
```

## デプロイ

