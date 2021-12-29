/**
 * レイアウトに関する基本データおよび関数
 */

/** 入力エリアのサイズは 4x3 マスで考える */
const AREA_SIZE: Vector2 = [4, 3];

/** 画面上のセルの位置を示す列挙型の値 */
const SPOT = {
  UPPER: {
    LEFT: 'UPPER_LEFT',
    RIGHT: 'UPPER_RIGHT'
  },
  LOWER: {
    LEFT: 'LOWER_LEFT',
    RIGHT: 'LOWER_RIGHT'
  },
  MIDDLE: {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    CENTER: 'CENTER'
  },
  OVER_SIDE: {
    LEFT: 'OVER_LEFT',
    RIGHT: 'OVER_RIGHT'
  }
} as const;
/** 画面上のセルの位置を示す列挙型 */
type Spot = DoubleLayerEnum<typeof SPOT>;

/**
 * detectSpot
 * @param pos ページ上で1マス分を1、領域左上を0とする座標
 * @param noCenter `true` のときは `"CENTER"` の領域であっても `"LEFT"` か `"RIGHT"` になる
 * @returns 入力領域のセル
 */
function detectSpot(pos: Vector2, noCenter?: boolean): Spot {
  const [x, y] = pos;
  if (x < 0) { return SPOT.OVER_SIDE.LEFT; }
  if (x >= 4) { return SPOT.OVER_SIDE.RIGHT; }

  const area =
    y < 1 ? SPOT.UPPER
    : y >= 2 ? SPOT.LOWER
    : SPOT.MIDDLE;

  if (area === SPOT.MIDDLE && !noCenter) {
    if (x < 1) { return area.LEFT; }
    if (x >= 3) { return area.RIGHT; }
    return area.CENTER;
  }
  if (x < 2) { return area.LEFT; }
  return area.RIGHT;
}


