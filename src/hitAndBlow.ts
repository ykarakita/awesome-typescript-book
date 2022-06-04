import { printLine, promptInput, promptSelect } from './common'

const selectableModes = ['normal', 'hard'] as const
type Mode = typeof selectableModes[number]

export class HitAndBlow {
  private readonly answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  private answer: string[] = []
  private tryCount = 0
  private mode: Mode = 'normal'

  private getAnswerLength() {
    switch (this.mode) {
      case 'normal':
        return 3
      case 'hard':
        return 4
      default:
        throw new Error(`${this.mode} は不正なモードです`)
    }
  }

  async setting() {
    this.mode = await promptSelect<Mode>('モードを入力してください。', selectableModes)

    const answerLength = this.getAnswerLength()

    while (this.answer.length < answerLength) {
      const randNum = Math.floor(Math.random() * this.answerSource.length)
      const selectedItem = this.answerSource[randNum]
      if (!this.answer.includes(selectedItem)) {
        this.answer.push(selectedItem)
      }
    }
  }

  private validate(inputArr: string[]) {
    const isLengthValid = inputArr.length === this.answer.length
    const isAllAnswerSourceOption = inputArr.every((val) => this.answerSource.includes(val))
    const isAllDifferentValues = inputArr.every((val, i) => inputArr.indexOf(val) === i)

    return isLengthValid && isAllAnswerSourceOption && isAllDifferentValues
  }

  private check(input: string[]) {
    let hitCount = 0
    let blowCount = 0

    input.forEach((val, index) => {
      if (val === this.answer[index]) {
        hitCount += 1
      } else if (this.answer.includes(val)) {
        blowCount += 1
      }
    })

    return {
      hit: hitCount,
      blow: blowCount,
    }
  }

  end() {
    printLine(`正解です！ \n試行回数: ${this.tryCount}回`)
  }

  async play() {
    const inputArr = (await promptInput(`「,」区切りで${this.getAnswerLength()}つの数字を入力してください`)).split(',')
    if (!this.validate(inputArr)) {
      printLine('不正な入力です')
      await this.play()
      return
    }

    const result = this.check(inputArr)

    if (result.hit !== this.answer.length) {
      printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`)
      this.tryCount += 1
      await this.play()
    } else {
      this.tryCount += 1
    }
  }
}
