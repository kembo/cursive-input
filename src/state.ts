/**
 * 入力状態の状態遷移等のデータ型や必要な関数を定義
 */

type StateChain = { [key in Spot]?: Nullable<State> };
abstract class State {
  lastSpot: Nullable<Spot> = null;
  protected nextStates: StateChain;
  static defaultState: PreTouchState;
  static display: DisplayTable;

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
    if (nextSt === null) {
      this.lastSpot = spot;
      return this;
    }
    return nextSt.comming(this, spot);
  }

  public release(): PreTouchState {
    return State.defaultState.comming();
  }

  public comming(prev: State, spot: Spot): typeof this {
    this.lastSpot = spot;
    return this;
  }
}

class PreTouchState extends State {
  public next(pos: Vector2): State {
    return this.nextBySpot(detectSpot(pos, true));
  }

  public comming(prev?: State): typeof this {
    return this
  }
}

const StartState = new PreTouchState({});
State.defaultState = StartState;
