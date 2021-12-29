"use strict";
/**
 * レイアウトに関する基本データおよび関数
 */
/** 入力エリアのサイズは 4x3 マスで考える */
const AREA_SIZE = [4, 3];
/** 画面上のセルの位置を示す列挙型の値 */
const SPOT = [
    ['UPPER_LEFT', 'UPPER_RIGHT'],
    ['LEFT', 'CENTER', 'RIGHT'],
    ['LOWER_LEFT', 'LOWER_RIGHT'],
    ['OVER_LEFT', 'OVER_RIGHT']
];
/**
 * detectSpot
 * @param pos ページ上で1マス分を1、領域左上を0とする座標
 * @param noCenter `true` のときは `"CENTER"` の領域であっても `"LEFT"` か `"RIGHT"` になる
 * @returns 入力領域のセル
 */
function detectSpot(pos, noCenter) {
    let [x, y] = pos;
    if (x < 0) {
        return SPOT[3][0];
    }
    if (x >= 4) {
        return SPOT[3][1];
    }
    if (y < 1) {
        y = 0;
    }
    else if (y >= 2) {
        y = 2;
    }
    else {
        if (noCenter) {
            if (x < 2) {
                return SPOT[1][0];
            }
            return SPOT[1][2];
        }
        if (x < 1) {
            return SPOT[1][0];
        }
        if (x >= 3) {
            return SPOT[1][2];
        }
        return SPOT[1][1];
    }
    if (x < 2) {
        return SPOT[y][0];
    }
    return SPOT[y][1];
}
//# sourceMappingURL=layout.js.map