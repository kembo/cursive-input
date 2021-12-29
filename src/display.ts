/**
 * 文字盤へのヒントや入力した文字列等を適宜画面に表示する
 */
type RowTagName = 'div';
const rowTag: RowTagName = 'div';
type RowElement = HTMLElementTagNameMap[RowTagName];
type CellTagName = 'div';
const cellTag: CellTagName = 'div';
type CellElement = HTMLElementTagNameMap[CellTagName];

function createPairList<T, K extends keyof HTMLElementTagNameMap>(
  base: ReadonlyArray<T>, elem: HTMLElement, clsName: string, tagName: K, message: ((i: number) => string)
): ReadonlyArray<[T, HTMLElementTagNameMap[K]]> {
  const coll = elem.getElementsByClassName(clsName);
  return base.map((k, i) => [k, safelyGetFromCollection(coll, i, tagName, message(i))]);
}

class DisplayTable {
  parent: HTMLElement;
  readonly cells: Readonly<{ [key in InsideSpot]: CellElement }>;

  constructor(inputArea: HTMLElement) {
    this.parent = inputArea;
    // 行要素の取得
    const rowList = createPairList(
      SPOT.slice(0, 3) as ReadonlyArray<ReadonlyArray<InsideSpot>>,
      inputArea, 'row', rowTag, i => `Row ${rowTag} #${i} is not found`
    );
    // セルの取得
    const cellList = rowList.reduce((ret, e: [ReadonlyArray<InsideSpot>, RowElement], y: number) => {
      return ret.concat(createPairList(e[0], e[1], 'cell', cellTag, x => `Cell ${cellTag} [${x}, ${y}] is not found`));
    }, [] as ReadonlyArray<[InsideSpot, CellElement]>)
    // オブジェクトへの変換
    this.cells = cellList.reduce((o, e) => { o[e[0]] = e[1]; return o;}, {} as { [key in InsideSpot]: CellElement })
  }
}
