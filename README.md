
# 概要

[DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent) を用いた、デバイスの回転情報のデータを可視化するWebアプリケーションです。
主な機能は次の2つです。

- リアルタイムでのデバイスの回転情報の可視化
  - リアルタイムで現在から30秒間のデバイスの回転情報のデータを折れ線グラフで表示する
- 録画したデータの再生
  - 任意の時間で録画したデータを再生する（データはブラウザに保存）

## URL

https://yend724.github.io/device-orientation-visualization/

## 使い方

[ホーム画面](https://yend724.github.io/device-orientation-visualization/)と[録画画面](https://yend724.github.io/device-orientation-visualization/archive/)の2つの画面が存在します。

### リアルタイムデータの可視化

ホーム画面では過去30秒間におけるデバイスの回転情報を、リアルタイムで可視化することができます。

Safari on iOSの場合、ユーザーが明示的にデバイス情報の取得を許可する必要があります。ホーム画面にある「許可する」ボタンをクリックして「動作と方向」へのアクセスを許可することで、リアルタイムデータの可視化が可能となります（この時、ボタンのラベルが「許可済み」となっていれば許可されている状態です）

Google Chrome の場合は、Developer Tools の Sensor Orientation のエミュレート機能を使うことで、エミュレートすることができます。

### データの録画

任意の時間におけるデータの録画が可能です。

ホーム画面より「録画する」ボタンをクリックすることで録画を開始します。「停止する」ボタンをクリックすることで録画を停止します。データはブラウザに保存されます。

録画したデータは録画画面より再生が可能です。

### 録画の再生

録画画面に録画データの一覧が表示されます。録画データが存在する場合、再生したい録画データをクリックすることで保存してあるデータの詳細を確認できます。

「開始」ボタンで録画を再生し、「停止」ボタンで再生を停止します。

またシークバーをドラッグすることで任意の範囲の拡大表示や、任意の時間へ移動することができます。

## 設計情報

Next.js の [App Router](https://nextjs.org/docs/app) を用いてアプリの実装を行いました。

### フォルダ構造

```shell
src
└── app
    ├── (dashboard)
    │   └── archive
    │       └── _components
    ├── _components
    ├── _constants
    ├── _hooks
    ├── _styles
    └── _utils
```

Next.js のドキュメントにある [Project Organization and File Colocation](https://nextjs.org/docs/app/building-your-application/routing/colocation) を参考にしつつ、上記のフォルダ構造になりました。

#### app/(dashboard)

ページのルーティングが反映されるグループです。
また `app`直下のフォルダは汎用的なものを表すのに対し、ページ固有のコンポーネントなどは、該当ページのフォルダに配置しています。

#### app/_components

汎用的なコンポーネントを配置するフォルダです。コンポーネントフォルダの内部で `hooks.tsx` や `utils.ts` などのファイルがあるときは、そのコンポーネント固有のカスタムフックや関数になります。

#### app/_constants

汎用的な定数を配置するフォルダです。

#### app/_hooks

汎用的なカスタムフックを配置するフォルダです。

#### app/_styles

グローバルなスタイルのファイルを配置するフォルダです。

#### app/_utils

汎用的な関数やクラスを配置するフォルダです。

### テスト (*.test.ts / *.test.tsx)

コンポーネントやカスタムフック、関数のファイルと同じフォルダ内で `*.test.ts` / `*.test.tsx` のファイルが存在している場合、テストを記述しているファイルになります。テストには Jest / React Testing Library を用いています。

## 制約

- Google Chrome と Safari on iOS の最新バージョン（2023/10/31日現在）を対象としています。
- DeviceOrientationEvent
  - iPhoneで `DeviceOrientationEvent` を使用する場合、[`requestPermission()`](https://www.w3.org/TR/orientation-event/#dom-deviceorientationevent-requestpermission) を用いて明示的に許可する必要があります。
- データ容量
  - IndexedDBに保存できるデータ容量には制約があります。大量の録画データを保存しようとする場合、容量制限に気を付ける必要があります。

## ライブラリ選定基準

- [Next.js](https://nextjs.org/)
  - ホーム画面と録画画面が必要だったので、手軽にSSGが行える Next.js を使用しました。
  - バージョンは課題に着手した時点での最新バージョン(App Router)を利用しています。
- [D3.js](https://d3js.org/)
  - デバイスの回転情報をグラフで可視化するために、D3.jsを使用しています。
  - Recharts.jsと比較し、柔軟性が高かったので D3.js をそのまま使用しています。
- [Tailwind CSS](https://tailwindcss.com/)
  - 影響範囲がコンポーネント内部に閉じ込められること、Client Components と React Server Components においてどちらでも問題なく使えるので、スタイリングには Tailwind CSS を使用しました。
- [Jest](https://jestjs.io/ja/) / [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - テストは経験が浅いので、利用者が多く情報量が取得しやすい Jest / React Testing Library を使用しました。

## その他発生した課題などのトピック情報
- IndexedDBに保存できる容量
  - [ブラウザーのストレージ制限と削除基準 - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) によると各ブラウザやOSによってストレージの制限は異なるようでした。
  - [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/#ref-for-quotaexceedederror%E2%91%A5:~:text=If%20an%20error%20occurs%20while%20writing%20the%20changes%20to%20the%20database%2C%20then%20run%20abort%20a%20transaction%20with%20transaction%20and%20an%20appropriate%20type%20for%20the%20error%2C%20for%20example%20%22QuotaExceededError%22%20or%20%22UnknownError%22%20DOMException%2C%20and%20terminate%20these%20steps) の該当箇所を読むと容量制限を超えた場合、`transaction`エラーが発生し、書き込み自体が失敗するように思えましたが、検証まではできていないので今後の課題。
- テストの経験が浅いので参考にした教材
  - [フロントエンド開発のためのテスト入門 今からでも知っておきたい自動テスト戦略の必須知識](https://amzn.asia/d/ejDzZkz)
  - [Jestではじめるテスト入門](https://peaks.cc/books/testing_with_jest)
  - Storybook を使った「ビジュアルリグレッションテスト」は導入しなかったので今後の課題。
- パフォーマンス
  - 録画に関して、5分ほど録画して検証してみましたが、録画中も再生中も30FPS以上は確保しているように見えました（[react-fps](https://github.com/JohannesKlauss/react-fps)を用いて確認）。
  - [Rust and WebAssembly](https://rustwasm.github.io/docs/book/) を以前試したことがあったので WebAssembly を取り入れてみたかったが、導入できなかったので今後の課題。