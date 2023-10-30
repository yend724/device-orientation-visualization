
# 概要

[DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)を用いた、デバイスの回転情報のデータを可視化するWebアプリケーション。
機能は以下の二つ。

- リアルタイムでのデバイスの回転情報の可視化
  - リアルタイムで現在から30秒間のデバイスの回転情報のデータを折れ線グラフで表示する
- 録画したデータの再生
  - 任意の時間で録画したデータを再生する（データはブラウザのIndexedDBに保存）

## 使い方

## 設計情報

Next.js の App Router を用いてアプリの実装を行いました。

## 制約

- Google Chorme と Safari for iOS の最新バージョン（2023/10/31日現在）を対象としています。
- DeviceOrientationEvent: iPhoneで `DeviceOrientationEvent` のデータを取得する場合、[`requestPermission()`](https://www.w3.org/TR/orientation-event/#dom-deviceorientationevent-requestpermission)を用いて明示的に許可する必要があります。
- データ容量: IndexedDBに保存できるデータ容量には制約があります。大量の録画データを保存しようとする場合、容量制限に気を付ける必要があります。

## ライブラリ選定基準

- Next.js
- D3.js
- Tailwind CSS
- Jest

## その他発生した課題などのトピック情報