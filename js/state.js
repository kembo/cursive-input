"use strict";
/**
 * 入力状態の状態遷移等のデータ型や必要な関数を定義
 */
class State {
    constructor(nextStates) {
        this.lastSpot = null;
        this.nextStates = nextStates;
    }
    next(pos) {
        return this.nextBySpot(detectSpot(pos));
    }
    nextBySpot(spot) {
        var _a;
        if (spot === this.lastSpot) {
            return this;
        }
        const nextSt = this.nextStates[spot];
        if (nextSt === undefined) {
            return State.defaultState;
        }
        return (_a = nextSt === null || nextSt === void 0 ? void 0 : nextSt.comming(this, spot)) !== null && _a !== void 0 ? _a : this;
    }
    release() {
        return State.defaultState;
    }
    comming(prev, spot) {
        this.lastSpot = spot;
        return this;
    }
}
class PreTouchState extends State {
    next(pos) {
        return this.nextBySpot(detectSpot(pos, true));
    }
}
const StartState = new PreTouchState({});
State.defaultState = StartState;
//# sourceMappingURL=state.js.map