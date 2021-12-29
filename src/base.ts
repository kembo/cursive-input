/**
 * 共有すべきデータ型や定数
 */
// 汎用関数類
type Nullable<T> = T | null;
type DoubleLayerEnum<T extends { [key: string]: {[subKey: string]: string | number} }> =
  keyof T extends infer K ? K extends keyof T ? T[K][keyof T[K]] : never : never;
interface ReadonlyArray<T> {
    /** tuple のための拡張 */
    map<U>(callbackfn: (value: T, index: number, tuple: T[] | [T]) => U, thisArg?: any): { [K in keyof this]: U }
}
const nullTuple2: readonly [null, null] = [null, null];
const nullTuple3: readonly [null, null, null] = [null, null, null];
/** パターン判定漏れチェック */
const assertUnreachable = (x: never): never => {
    throw new Error(`Unexpected value!! ${x}`);
}
/** null チェック */
function assertNull<T>(obj: T | null, message?: string): T {
  if (obj === null) { throw new Error(message); }
  return obj;
}



// DOM 関連
/**
 * @param element 検査対象
 * @param tagName タグ名
 * @returns 検査対象の型がタグ名に合致するか
 */
function correctTagName<K extends keyof HTMLElementTagNameMap>(
  element: Element | null, tagName: K
): element is HTMLElementTagNameMap[K] {
  return element?.tagName.toLowerCase() === tagName;
}
/**
 * @param element 検査対象
 * @param tagName タグ名
 * @returns 検査対象がタグ名に一致する場合のみ返す
 */
function validElementTagName<K extends keyof HTMLElementTagNameMap>(
  element: Element | null, tagName: K, message?: string
): HTMLElementTagNameMap[K] {
  if (!(correctTagName(element, tagName))) {
    console.log(element);
    console.log(element?.tagName);
    throw new Error(message);
  }
  return element;
}
function safelyGetFromCollection<K extends keyof HTMLElementTagNameMap>(
  collection: HTMLCollection, index: number, tagName: K, message?: string
): HTMLElementTagNameMap[K] {
  return validElementTagName(collection.item(index), tagName, message);
}
function collectionToTuple<T extends ReadonlyArray<any> ,K extends keyof HTMLElementTagNameMap>(
  base: T, collection: HTMLCollection, tagName: K, message?: string | ((i: number) => string)
): { [I in keyof T]: HTMLElementTagNameMap[K] } {
  return base.map(
    (_, i) => safelyGetFromCollection(
      collection, i, tagName,
      typeof message === 'string'
        ? message
        : message && message(i)
    )
  );
}


// その他
/** 2次元ベクトル */
type Vector2 = readonly [number, number];
/**
 *
 * @param fn 各項目の演算
 * @param vecs 任意の数の Vector2
 * @returns 各項目を fn で計算した Vector2
 */
function calcVector2(fn: (...args: number[]) => number, ...vecs: Vector2[]): Vector2 {
  const base: Vector2 = [0, 0];
  return base.map((_, i) => fn(...vecs.map(v => v[i])))
}
