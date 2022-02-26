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
        this.cells = new Map(INSIDE_SPOT.map(spot => {
            const coll = inputArea.getElementsByClassName('row');
            const row = safelyGetFromCollection(coll, spot[1], rowTag);
            const cells = row.getElementsByClassName('cell');
            return [spot, safelyGetFromCollection(cells, spot[0], cellTag)];
        }));
    }
}
//# sourceMappingURL=display.js.map