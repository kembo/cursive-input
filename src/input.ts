/**
 * 入力情報と今の状態から文字の判別を行う
 * 状態判定に必要なクラスやデータ構造は `state` で定義する
 * 結果を `display` に渡して画面に表示する
 */

/**
 * 入力状態を保持し管理するクラス
 */
class InputStateMachine {
  table: DisplayTable;
  state: undefined;
  curText: undefined | string;
  curLetter: undefined | string;
  lastLetter: undefined | string;

  constructor(inputArea: HTMLElement) {
    this.table = new DisplayTable(inputArea);
  }
}
