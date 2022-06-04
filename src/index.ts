import { HitAndBlow } from './hitAndBlow'
;(async () => {
  const hitAndBlow = new HitAndBlow()
  await hitAndBlow.setting()
  await hitAndBlow.play()
  hitAndBlow.end()
})()
