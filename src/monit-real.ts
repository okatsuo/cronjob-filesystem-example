import path from 'path'
import * as fs from 'fs'
import { CronJob } from 'cron'

const writeValueToFile = (value: number) => {
  const formatedFileName = Date.now()
  const text = `
  O valor está em ${value}, em: ${new Date().toLocaleString()}
  Na data: ${new Date().toLocaleString()}
  `
  fs.writeFileSync(path.join(__dirname, `./results/${formatedFileName}.txt`), text)
  console.log('Arquivo criado em: ' + new Date().toLocaleString())
}

export const verifyReal = () => {
  const realValue: number | undefined = getRealValue()
  if (realValue && realValue > 500) {
    writeValueToFile(realValue)
  }

}

const getRealValue = (): number | undefined => {
  const fileResponse = fs.readFileSync(path.join(__dirname, './results'), 'utf8')
  const value = fileResponse.split(":")[1].trim().split(" ")[0]
  return parseFloat(value)
    ? parseFloat(value)
    : undefined
}

new CronJob('0/1 * * * * *', () => {
  verifyReal()
}).start()
