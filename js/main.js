"use strict";
/**
 * ブラウザからの入力を受けて関数を実行する
 * 入力値を `input` 側に適当な形に変換して渡す
 */
/**
 * @param touch タッチイベント時のタッチ情報
 * @param elem 座標範囲の基準となる親要素
 * @param rate elem の縦横がこの値になるように座標値を補正する
 * @returns 補正された `elem` 左上を原点とする座標値
 */
function posOfElement(touch, elem, rate) {
    const rect = elem === null || elem === void 0 ? void 0 : elem.getBoundingClientRect();
    if (typeof rate === 'number') {
        rate = [rate, rate];
    }
    if (rect && rate) {
        rate = calcVector2((r, w) => r / w, rate, [rect.width, rect.height]);
    }
    else {
        rate = [1, 1];
    }
    return calcVector2((pos, orig, rate) => (pos - orig) * rate, [touch.clientX, touch.clientY], // 元の座標
    rect ? [rect.x, rect.y] : [0, 0], // 親要素の左上の座標
    rate // 倍率
    );
}
window.addEventListener('load', () => {
    const inputArea = validElementTagName(document.getElementById('input-area'), 'div', '"div#input-area" is not found.');
    function posOfArea(touch) {
        return posOfElement(touch, inputArea, AREA_SIZE);
    }
    State.display = new DisplayTable(inputArea);
    let state = StartState.comming();
    function onTouchEvent(fn) {
        return e => {
            e.preventDefault();
            state = fn(e, state);
        };
    }
    function onTouching(fn) {
        return onTouchEvent((e, s) => { var _a, _b; return (_b = (_a = fn(s, s instanceof PreTouchState)) === null || _a === void 0 ? void 0 : _a.next(posOfArea(e.touches[0]))) !== null && _b !== void 0 ? _b : s; });
    }
    ;
    inputArea.addEventListener('touchstart', onTouching((s, start) => start ? s : s.release()));
    inputArea.addEventListener('touchmove', onTouching((s, start) => start ? null : s));
    inputArea.addEventListener('touchend', onTouchEvent((_e, s) => s.release()));
});
//# sourceMappingURL=main.js.map