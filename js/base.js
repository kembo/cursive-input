"use strict";
/** パターン判定漏れチェック */
const assertUnreachable = (x) => {
    throw new Error(`Unexpected value!! ${x}`);
};
/** null チェック */
function assertNull(obj, message) {
    if (obj === null) {
        throw new Error(message);
    }
    return obj;
}
// DOM 関連
/**
 * @param element 検査対象
 * @param tagName タグ名
 * @returns 検査対象の型がタグ名に合致するか
 */
function correctTagName(element, tagName) {
    return (element === null || element === void 0 ? void 0 : element.tagName.toLowerCase()) === tagName;
}
/**
 * @param element 検査対象
 * @param tagName タグ名
 * @returns 検査対象がタグ名に一致する場合のみ返す
 */
function validElementTagName(element, tagName, message) {
    if (!(correctTagName(element, tagName))) {
        console.log(element);
        console.log(element === null || element === void 0 ? void 0 : element.tagName);
        throw new Error(message);
    }
    return element;
}
function safelyGetFromCollection(collection, index, tagName, message) {
    return validElementTagName(collection.item(index), tagName, message);
}
/**
 *
 * @param fn 各項目の演算
 * @param vecs 任意の数の Vector2
 * @returns 各項目を fn で計算した Vector2
 */
function calcVector2(fn, ...vecs) {
    const base = [0, 0];
    return base.map((_, i) => fn(...vecs.map(v => v[i])));
}
//# sourceMappingURL=base.js.map