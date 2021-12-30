// 入力状態の状態遷移等のデータ型や必要な関数を定義

/**
 * State の連なりを示す辞書
 * 遷移させない範囲を null とし、その他の未定義の空欄は範囲外として指を離した時と同じ挙動になる。
 */
type StateChain<St extends State> = Readonly<Map<Spot, Nullable<St>>>;


/** 入力状態を表すクラス */
abstract class State {
  /** 開始状態 */
  static defaultState: PreTouchState;
  /** 表示用オブジェクト */
  static display: DisplayTable;
  /** 最終位置 */
  lastSpot?: Nullable<Spot>;
  /** 次の状態遷移を示すための辞書オブジェクト */
  protected readonly nextStates: StateChain<State>;

  constructor(nextStates: StateChain<State>) {
    this.nextStates = nextStates;
  }

  private _going(to: State, spot: Spot): State {
    return to.comming(this, spot);
  }

  /**
   * Spot から状態遷移を判定する
   * @param spot 所在地
   * @returns 次の状態
   */
  protected _nextBySpot(spot: Spot): State {
    if (spot === this.lastSpot) { return this; }
    console.debug(spot);
    const nextSt = this.nextStates.get(spot);
    if (nextSt === undefined) { return this.release(); }
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
  public next(pos: Vector2): State {
    return this._nextBySpot(detectSpot(pos));
  }

  /**
   * 指を離した際の挙動
   * @returns 次の状態
   */
  public release(): PreTouchState {
    return State.defaultState.comming();
  }

  /**
   * この状態に遷移してきた時の挙動
   * @param prev 呼び出し元の State
   * @param spot 現在地
   * @returns 自分自身
   */
  public comming(prev: State, spot: Spot): typeof this {
    this.lastSpot = spot;
    console.debug(this);
    return this;
  }
}


/** 指が画面上にある時の State */
class OnScreenState extends State {
  lastSpot?: Spot;
}


/** タッチ直後 */
class JustTouchedState extends OnScreenState {
}

const RightStartState = new JustTouchedState(new Map())


/** 入力前の待機状態 */
class PreTouchState extends State {
  protected readonly nextStates: StateChain<JustTouchedState>;
  readonly lastSpot: null = null;

  constructor(nextStates: StateChain<JustTouchedState>) {
    super(nextStates);
    this.nextStates = nextStates;
  }

  public next(pos: Vector2): JustTouchedState | PreTouchState {
    const spot = detectSpot(pos, true);
    console.debug(spot);
    const nextSt = this.nextStates.get(spot);
    if (!nextSt) { return this; }
    return nextSt.comming(this, detectSpot(pos, false));
  }

  public comming(prev?: State): typeof this {
    console.debug(this);
    return this
  }

  public release(): PreTouchState {
    return this;
  }
}

const StartState = new PreTouchState(new Map([
  ['RIGHT', RightStartState]
]));
State.defaultState = StartState;
