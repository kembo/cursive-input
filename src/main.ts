/**
 * ブラウザからの入力を受けて関数を実行する
 * 入力値を `input` 側に適当な形に変換して渡す
 */

/**
 *
 * @param touch タッチイベント時のタッチ情報
 * @param elem 座標範囲の基準となる親要素
 * @param size elem の縦横がこの値になるように座標値を補正する
 * @returns 補正された `elem` 左上を原点とする座標値
 */
function posOfElement(touch: Touch, elem?: HTMLElement, size?: Vector2 | number): Vector2 {
  const pos: Vector2 = [touch.clientX, touch.clientY];
  if (!(elem && size)) { return pos; }

  const rect = elem.getBoundingClientRect();
  if (typeof size === 'number') { size = [size, size]; }
  const rate: Vector2 = [size[0] / rect.width, size[1] / rect.height];
  return pos.map((a, i) => a * rate[i]);
}

window.addEventListener('load', () => {
  const inputArea = validElementTagName(
    document.getElementById('input-area'), 'div',
    '"div#input-area" is not found.'
  );
  const stateMachine = new InputStateMachine(inputArea);

  type TouchEventFunction = (e: TouchEvent) => void;
  function onTouchEvent(fn: ((e: TouchEvent) => void)): TouchEventFunction {
      return e => {
          e.preventDefault();
          fn(e);
      }
  }
  function onTouching(fn: ((pos: Vector2) => void)): TouchEventFunction {
      return onTouchEvent(e => fn(posOfElement(e.touches[0], inputArea, AREA_SIZE)));
  }
  inputArea.addEventListener('touchstart', onTouching( (p) => stateMachine.touched(p)));
  inputArea.addEventListener('touchmove' , onTouching( (p) => stateMachine.moved(p)  ));
  inputArea.addEventListener('touchend'  , onTouchEvent(() => stateMachine.released()));
});
