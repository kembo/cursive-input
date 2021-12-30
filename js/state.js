"use strict";
// 入力状態の状態遷移等のデータ型や必要な関数を定義
/** 入力状態を表すクラス */
class State {
    constructor(nextStates) {
        this.nextStates = nextStates;
    }
    _going(to, spot) {
        return to.comming(this, spot);
    }
    /**
     * Spot から状態遷移を判定する
     * @param spot 所在地
     * @returns 次の状態
     */
    _nextBySpot(spot) {
        if (spot === this.lastSpot) {
            return this;
        }
        console.debug(spot);
        const nextSt = this.nextStates.get(spot);
        if (nextSt === undefined) {
            return this.release();
        }
        if (nextSt === null) {
            this.lastSpot = spot;
            return this;
        }
        return this._going(nextSt, spot);
    }
    /**
     * 座標から状態遷移を判定する
     * @param pos 座標
     * @returns 次の状態
     */
    next(pos) {
        return this._nextBySpot(detectSpot(pos));
    }
    /**
     * 指を離した際の挙動
     * @returns 次の状態
     */
    release() {
        return State.defaultState.comming();
    }
    /**
     * この状態に遷移してきた時の挙動
     * @param prev 呼び出し元の State
     * @param spot 現在地
     * @returns 自分自身
     */
    comming(prev, spot) {
        this.lastSpot = spot;
        console.debug(this);
        return this;
    }
}
/** 指が画面上にある時の State */
class OnScreenState extends State {
}
/** タッチ直後 */
class JustTouchedState extends OnScreenState {
}
const RightStartState = new JustTouchedState(new Map());
/** 入力前の待機状態 */
class PreTouchState extends State {
    constructor(nextStates) {
        super(nextStates);
        this.lastSpot = null;
        this.nextStates = nextStates;
    }
    next(pos) {
        const spot = detectSpot(pos, true);
        console.debug(spot);
        const nextSt = this.nextStates.get(spot);
        if (!nextSt) {
            return this;
        }
        return nextSt.comming(this, detectSpot(pos, false));
    }
    comming(prev) {
        console.debug(this);
        return this;
    }
    release() {
        return this;
    }
}
const StartState = new PreTouchState(new Map([
    ['RIGHT', RightStartState]
]));
State.defaultState = StartState;
//# sourceMappingURL=state.js.map