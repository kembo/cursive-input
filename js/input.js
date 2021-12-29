"use strict";
/**
 * 入力情報と今の状態から文字の判別を行う
 * 状態判定に必要なクラスやデータ構造は `state` で定義する
 * 結果を `display` に渡して画面に表示する
 */
/**
 * 入力状態を保持し管理するクラス
 */
class InputStateMachine {
    constructor(inputArea) {
        this.curText = null;
        this.curLetter = null;
        this.lastLetter = null;
        this.table = new DisplayTable(inputArea);
        this.state = StartState;
    }
    /**
     * タッチした瞬間の挙動
     * @param pos タッチ座標
     */
    touched(pos) {
        if (!(this.state instanceof PreTouchState)) {
            this.state = StartState;
        }
        this.state = this.state.next(pos);
    }
    /**
     * 指が動いた時の挙動
     * @param pos 指の座標
     */
    moved(pos) {
        if (this.state.lastSpot === null) {
            return;
        }
        this.state = this.state.next(pos);
        console.log(detectSpot(pos));
    }
    /**
     * 指を離した時の挙動
     */
    released() {
        this.state = this.state.release();
        console.log("released!");
    }
}
//# sourceMappingURL=input.js.map