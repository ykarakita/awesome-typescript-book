import { HitAndBlow } from './hitAndBlow'
import { printLine } from './common'

export class GameProcedure {
  private currentGameTitle = 'hit and blow'
  private currentGame = new HitAndBlow()

  public async start() {
    await this.play()
  }

  private async play() {
    printLine(`===\n${this.currentGameTitle}を開始します。\n===`)
    await this.currentGame.setting()
    await this.currentGame.play()
    this.currentGame.end()
    this.end()
  }

  private end() {
    printLine('ゲームを終了しました。')
    process.exit()
  }
}
