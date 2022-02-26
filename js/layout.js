"use strict";
/**
 * レイアウトに関する基本データおよび関数
 */
/** 入力エリアのサイズは 4x3 マスで考える */
const AREA_SIZE = [4, 3];
/** 画面上のセルの位置を示す列挙型の値 */
const INSIDE_SPOT = [
    [0, 0], [1, 0],
    [0, 1], [1, 1], [2, 1],
    [0, 2], [1, 2],
];
const SPOT = [...INSIDE_SPOT, [-1, 1], [3, 1]];
/**
 * detectSpot
 * @param pos ページ上で1マス分を1、領域左上を0とする座標
 * @param noCenter `true` のときは `"CENTER"` の領域であっても `"LEFT"` か `"RIGHT"` になる
 * @returns 入力領域のセル
 */
function detectSpot(pos, noCenter) {
    const [x, y] = pos;
    if (x < 0) {
        return [-1, 1];
    }
    if (x >= 4) {
        return [3, 1];
    }
    let py;
    if (y < 1) {
        py = 0;
    }
    else if (y >= 2) {
        py = 2;
    }
    else {
        if (noCenter) {
            if (x < 2) {
                return [0, 1];
            }
            return [2, 1];
        }
        if (x < 1) {
            return [0, 1];
        }
        if (x >= 3) {
            return [2, 1];
        }
        return [1, 1];
    }
    if (x < 2) {
        return [0, py];
    }
    return [1, py];
}
//# sourceMappingURL=layout.js.map