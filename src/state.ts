// 入力状態の状態遷移等のデータ型や必要な関数を定義

/**
 * State の連なりを示す辞書
 * 遷移させない範囲を null とし、その他の未定義の空欄は範囲外として指を離した時と同じ挙動になる。
 */
type StateChain = { [key in Spot]?: Nullable<State> };


/** 入力状態を表すクラス */
abstract class State {
  /** 開始状態 */
  static defaultState: PreTouchState;
  /** 表示用オブジェクト */
  static display: DisplayTable;
  /** 最終位置 */
  lastSpot: Nullable<Spot> = null;
  /** 次の状態遷移を示すための辞書オブジェクト */
  protected nextStates: StateChain;

  constructor(nextStates: StateChain) {
    this.nextStates = nextStates;
  }

  /**
   * Spot から状態遷移を判定する
   * @param spot 所在地
   * @returns 次の状態
   */
  protected _nextBySpot(spot: Spot): State {
    if (spot === this.lastSpot) { return this; }
    const nextSt = this.nextStates[spot];
    if (nextSt === undefined) { return this.release(); }
    if (nextSt === null) {
      this.lastSpot = spot;
      return this;
    }
    return nextSt.comming(this, spot);
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
    return this;
  }
}


/** 入力前の待機状態 */
class PreTouchState extends State {
  public next(pos: Vector2): State {
    return this._nextBySpot(detectSpot(pos, true));
  }

  public comming(prev?: State): typeof this {
    return this
  }
}

const StartState = new PreTouchState({});
State.defaultState = StartState;
