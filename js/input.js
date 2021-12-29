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
        this.table = new DisplayTable(inputArea);
    }
    return InputStateMachine;
}());
//# sourceMappingURL=input.js.map