export default class Timer {
  private lastTime: number;
  private runOnTick: () => void;
  private millisecondsPerTick: number;
  private timerId: NodeJS.Timeout | null;

  constructor() {
    this.lastTime = Date.now();
    this.runOnTick = () => {};
    this.millisecondsPerTick = 1000;
    this.timerId = null;
  }

  public getElapsedTimeInSeconds(): number {
    const time = Date.now();
    const elapsedTimeMillis = time - this.lastTime;
    this.lastTime = time;
    return elapsedTimeMillis / 1000;
  }

  public reset(): void {
    this.lastTime = Date.now();
  }

  public start(): void {
    this.timerId = setInterval(() => {
      this.runOnTick();
    }, this.millisecondsPerTick);
  }

  public stop(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  //   public onTick(
  //     callback: () => void,
  //     millisecondsPerTick: number = 1000
  //   ): void {
  //     const time = Date.now();
  //     const elapsedTimeMillis = time - this.lastTime;
  //     if (elapsedTimeMillis >= millisecondsPerTick) {
  //       callback();
  //       this.lastTime = time;
  //     }
  //   }

  public onTick(
    callback: () => void,
    millisecondsPerTick: number = 1000
  ): void {
    this.runOnTick = callback;
    this.millisecondsPerTick = millisecondsPerTick;
  }
}
