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
function posOfElement(touch: Touch, elem?: HTMLElement, rate?: Vector2 | number): Vector2 {
  const rect = elem?.getBoundingClientRect();
  if (typeof rate === 'number') { rate = [rate, rate]; }
  if (rect && rate) {
    rate = calcVector2((r, w) => r / w, rate, [rect.width, rect.height]);
  } else {
    rate = [1, 1];
  }
  return calcVector2(
    (pos, orig, rate) => (pos - orig) * rate,
    [touch.clientX, touch.clientY],  // 元の座標
    rect ? [rect.x, rect.y] : [0, 0],  // 親要素の左上の座標
    rate  // 倍率
  )
}

window.addEventListener('load', () => {
  const inputArea = validElementTagName(
    document.getElementById('input-area'), 'div',
    '"div#input-area" is not found.'
  );
  function posOfArea(touch: Touch) {
    return posOfElement(touch, inputArea, AREA_SIZE);
  }
  State.display = new DisplayTable(inputArea);
  let state: State = StartState.comming();

  type TouchEventFunction = (e: TouchEvent) => void;
  function onTouchEvent(fn: ((e: TouchEvent, s: State) => State)): TouchEventFunction {
    return e => {
      e.preventDefault();
      state = fn(e, state);
    }
  }
  function onTouching(fn: ((s: State, touchStart: boolean) => Nullable<State>)) {
    return onTouchEvent((e, s) => fn(s, s instanceof PreTouchState)?.next(posOfArea(e.touches[0])) ?? s);
  };
  inputArea.addEventListener('touchstart', onTouching((s, start) => start ? s : s.release()));
  inputArea.addEventListener('touchmove', onTouching((s, start) => start ? null : s));
  inputArea.addEventListener('touchend', onTouchEvent((_e, s) => s.release()));
});
