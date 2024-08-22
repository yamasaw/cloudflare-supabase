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


### 2.supabaseをプロジェクト内で初期化
Intel Macの場合Supabaseのコンテナが正しく動作しない[バグ](https://github.com/supabase/cli/issues/1083#issuecomment-1691431279)があるため注意
