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
        if (spot === this.lastSpot) {
            return this;
        }
        const nextSt = this.nextStates[spot];
        if (nextSt === undefined) {
            return State.defaultState;
        }
        if (nextSt === null) {
            this.lastSpot = spot;
            return this;
        }
        return nextSt.comming(this, spot);
    }
    release() {
        return State.defaultState.comming();
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
    comming(prev) {
        return this;
    }
}
const StartState = new PreTouchState({});
State.defaultState = StartState;
//# sourceMappingURL=state.js.map