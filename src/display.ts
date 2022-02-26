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
  readonly cells: ReadonlyMap<InsideSpot, CellElement>;

  constructor(inputArea: HTMLElement) {
    this.parent = inputArea;
    this.cells = new Map(INSIDE_SPOT.map(spot => {
      const coll = inputArea.getElementsByClassName('row');
      const row = safelyGetFromCollection(coll, spot[1], rowTag);
      const cells = row.getElementsByClassName('cell');
      return [spot, safelyGetFromCollection(cells, spot[0], cellTag)];
    }));
  }
}
