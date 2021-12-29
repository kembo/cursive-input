/**
 * 入力情報と今の状態から文字の判別を行う
 * 状態判定に必要なクラスやデータ構造は `state` で定義する
 * 結果を `display` に渡して画面に表示する
 */

/**
 * 入力状態を保持し管理するクラス
 */
class InputStateMachine {
  state: undefined;
  lastPos: Nullable<Vector2> = null;

  readonly table: DisplayTable;
  curText: Nullable<string> = null;
  curLetter: Nullable<string> = null;
  lastLetter: Nullable<string> = null;

  constructor(inputArea: HTMLElement) {
    this.table = new DisplayTable(inputArea);
  }

  /**
   * タッチした瞬間の挙動
   * @param pos タッチ座標
   */
  public touched(pos: Vector2): void {
    console.log("touched!");
    console.log(pos);
  }
  /**
   * 指が動いた時の挙動
   * @param pos 指の座標
   */
  public moved(pos: Vector2): void {
    console.log(pos);
  }
  /**
   * 指を離した時の挙動
   */
  public released(): void {
    console.log("released!");
  }
}
