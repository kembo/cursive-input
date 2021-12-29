"use strict";
/**
 * 文字盤へのヒントや入力した文字列等を適宜画面に表示する
 */
var rowTag = 'div';
var cellTag = 'div';
var DisplayTable = /** @class */ (function () {
    function DisplayTable(inputArea) {
        this.parent = inputArea;
        // 行要素のタプルを取ってくる
        var rows = collectionToTuple(nullTuple3, inputArea.getElementsByClassName('row'), rowTag, function (i) { return "Row ".concat(rowTag, " #").concat(i, " is not found"); });
        // 行ごとにセルの長さが異なるので、`map` が使えない
        function getCells(base, i) {
            return collectionToTuple(base, rows[i].getElementsByClassName('cell'), cellTag, function (j) { return "Cell ".concat(cellTag, " [").concat(i, ", ").concat(j, "] is not found"); });
        }
        this.cells = [
            getCells(nullTuple2, 0),
            getCells(nullTuple3, 1),
            getCells(nullTuple2, 2)
        ];
    }
    return DisplayTable;
}());
//# sourceMappingURL=display.js.map