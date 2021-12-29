/**
 * 入力状態の状態遷移等のデータ型や必要な関数を定義
 */

type StateChain = { [key in Spot]?: Nullable<State> };
abstract class State {
  lastSpot: Nullable<Spot> = null;
  protected nextStates: StateChain;
  static defaultState: State;

  constructor(nextStates: StateChain) {
    this.nextStates = nextStates;
  }

  public next(pos: Vector2): State {
    return this.nextBySpot(detectSpot(pos));
  }

  protected nextBySpot(spot: Spot): State {
    if (spot === this.lastSpot) { return this; }
    const nextSt = this.nextStates[spot];
    if (nextSt === undefined) { return State.defaultState; }
    return nextSt?.comming(this, spot) ?? this;
  }

  public release(): State {
    return State.defaultState;
  }

  public comming(prev: State, spot: Spot): State {
    this.lastSpot = spot;
    return this;
  }
}

class PreTouchState extends State {
  public next(pos: Vector2): State {
    return this.nextBySpot(detectSpot(pos, true));
  }
}

const StartState = new PreTouchState({});
State.defaultState = StartState;
