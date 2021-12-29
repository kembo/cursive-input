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
    var rect = elem === null || elem === void 0 ? void 0 : elem.getBoundingClientRect();
    if (typeof rate === 'number') {
        rate = [rate, rate];
    }
    if (rect && rate) {
        rate = calcVector2(function (r, w) { return r / w; }, rate, [rect.width, rect.height]);
    }
    else {
        rate = [1, 1];
    }
    return calcVector2(function (pos, orig, rate) { return (pos - orig) * rate; }, [touch.clientX, touch.clientY], // 元の座標
    rect ? [rect.x, rect.y] : [0, 0], // 親要素の左上の座標
    rate // 倍率
    );
}
window.addEventListener('load', function () {
    var inputArea = validElementTagName(document.getElementById('input-area'), 'div', '"div#input-area" is not found.');
    var stateMachine = new InputStateMachine(inputArea);
    function onTouchEvent(fn) {
        return function (e) {
            e.preventDefault();
            fn(e);
        };
    }
    function onTouching(fn) {
        return onTouchEvent(function (e) { return fn(posOfElement(e.touches[0], inputArea, AREA_SIZE)); });
    }
    inputArea.addEventListener('touchstart', onTouching(function (p) { return stateMachine.touched(p); }));
    inputArea.addEventListener('touchmove', onTouching(function (p) { return stateMachine.moved(p); }));
    inputArea.addEventListener('touchend', onTouchEvent(function () { return stateMachine.released(); }));
});
//# sourceMappingURL=main.js.map