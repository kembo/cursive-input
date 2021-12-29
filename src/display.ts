/**
 * 文字盤へのヒントや入力した文字列等を適宜画面に表示する
 */
const rowTag: keyof HTMLElementTagNameMap = 'div';
type CellTagName = 'div';
const cellTag: CellTagName = 'div';

type Hoge = keyof typeof nullTuple2;

class DisplayTable {
  parent: HTMLElement;
  cells: readonly [
    readonly [HTMLElement, HTMLElement],
    readonly [HTMLElement, HTMLElement, HTMLElement],
    readonly [HTMLElement, HTMLElement]
  ];

  constructor(inputArea: HTMLElement) {
    this.parent = inputArea;
    // 行要素のタプルを取ってくる
    const rows = collectionToTuple(
      nullTuple3, inputArea.getElementsByClassName('row'), rowTag,
      i => `Row ${rowTag} #${i} is not found`
    );
    // 行ごとにセルの長さが異なるので、`map` が使えない
    function getCells<T extends ReadonlyArray<any>>(
      base: T, i: number
    ): { [K in keyof T]: HTMLElementTagNameMap[CellTagName] } {
      return collectionToTuple(
        base, rows[i].getElementsByClassName('cell'), cellTag,
        j => `Cell ${cellTag} [${i}, ${j}] is not found`
      );
    }
    this.cells = [
      getCells(nullTuple2, 0),
      getCells(nullTuple3, 1),
      getCells(nullTuple2, 2)
    ];
  }
}
