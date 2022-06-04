import { HitAndBlow } from './hitAndBlow'
import { printLine, promptSelect } from './common'

const nextActions = ['play again', 'exit'] as const
type NextAction = typeof nextActions[number]

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

    const action = await promptSelect<NextAction>('ゲームを続けますか？', nextActions)
    if (action === 'play again') {
      await this.play()
    } else if (action === 'exit') {
      this.end()
    } else {
      throw new Error(`${action} is an invalid action.`)
    }
  }

  private end() {
    printLine('ゲームを終了しました。')
    process.exit()
  }
}
