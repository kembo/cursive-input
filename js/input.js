"use strict";
/**
 * 入力情報と今の状態から文字の判別を行う
 * 状態判定に必要なクラスやデータ構造は `state` で定義する
 * 結果を `display` に渡して画面に表示する
 */
/**
 * 入力状態を保持し管理するクラス
 */
var InputStateMachine = /** @class */ (function () {
    function InputStateMachine(inputArea) {
        this.lastPos = null;
        this.curText = null;
        this.curLetter = null;
        this.lastLetter = null;
        this.table = new DisplayTable(inputArea);
    }
    /**
     * タッチした瞬間の挙動
     * @param pos タッチ座標
     */
    InputStateMachine.prototype.touched = function (pos) {
        console.log("touched!");
        console.log(pos);
    };
    /**
     * 指が動いた時の挙動
     * @param pos 指の座標
     */
    InputStateMachine.prototype.moved = function (pos) {
        console.log(pos);
    };
    /**
     * 指を離した時の挙動
     */
    InputStateMachine.prototype.released = function () {
        console.log("released!");
    };
    return InputStateMachine;
}());
//# sourceMappingURL=input.js.map