import { GameProcedure } from './gameProcedure'
import { HitAndBlow } from './hitAndBlow'
import { Janken } from './janken'
;(async () => {
  new GameProcedure({
    'hit and blow': new HitAndBlow(),
    janken: new Janken(),
  }).start()
})()
