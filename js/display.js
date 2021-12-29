"use strict";
const rowTag = 'div';
const cellTag = 'div';
function createPairList(base, elem, clsName, tagName, message) {
    const coll = elem.getElementsByClassName(clsName);
    return base.map((k, i) => [k, safelyGetFromCollection(coll, i, tagName, message(i))]);
}
class DisplayTable {
    constructor(inputArea) {
        this.parent = inputArea;
        // 行要素の取得
        const rowList = createPairList(SPOT.slice(0, 3), inputArea, 'row', rowTag, i => `Row ${rowTag} #${i} is not found`);
        // セルの取得
        const cellList = rowList.reduce((ret, e, y) => {
            return ret.concat(createPairList(e[0], e[1], 'cell', cellTag, x => `Cell ${cellTag} [${x}, ${y}] is not found`));
        }, []);
        // オブジェクトへの変換
        this.cells = cellList.reduce((o, e) => { o[e[0]] = e[1]; return o; }, {});
    }
}
//# sourceMappingURL=display.js.map