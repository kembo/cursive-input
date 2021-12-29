"use strict";
var nullTuple2 = [null, null];
var nullTuple3 = [null, null, null];
/** パターン判定漏れチェック */
var assertUnreachable = function (x) {
    throw new Error("Unexpected value!! ".concat(x));
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
function collectionToTuple(base, collection, tagName, message) {
    return base.map(function (_, i) { return safelyGetFromCollection(collection, i, tagName, typeof message === 'string'
        ? message
        : message && message(i)); });
}
/** 入力エリアのサイズは 4x3 マスで考える */
var AREA_SIZE = [4, 3];
//# sourceMappingURL=base.js.map