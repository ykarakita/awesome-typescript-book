import { printLine, promptSelect } from './common'
import { HitAndBlow } from './hitAndBlow'
import { Janken } from './janken'

const nextActions = ['play again', 'exit', 'change game'] as const
type NextAction = typeof nextActions[number]

const gameTitles = ['hit and blow', 'janken'] as const
type GameTitle = typeof gameTitles[number]

type GameStore = {
  [key: string]: HitAndBlow | Janken
}

export class GameProcedure {
  private currentGameTitle: GameTitle | '' = ''
  private currentGame: HitAndBlow | Janken | null = null

  constructor(private readonly gameStore: GameStore) {}

  public async start() {
    await this.select()
    await this.play()
  }

  private async select() {
    this.currentGameTitle = await promptSelect<GameTitle>('ゲームを選択してください', gameTitles)
    this.currentGame = this.gameStore[this.currentGameTitle]
  }

  private async play() {
    printLine(`===\n${this.currentGameTitle}を開始します。\n===`)

    if (!this.currentGame) throw new Error('ゲームが選択されていません')

    await this.currentGame.setting()
    await this.currentGame.play()
    this.currentGame.end()

    const action = await promptSelect<NextAction>('ゲームを続けますか？', nextActions)
    if (action === 'play again') {
      await this.play()
    } else if (action === 'exit') {
      this.end()
    } else if (action === 'change game') {
      await this.select()
      await this.play()
    } else {
      throw new Error(`${action} is an invalid action.`)
    }
  }

  private end() {
    printLine('ゲームを終了しました。')
    process.exit()
  }
}
