import path from 'path'
import * as fs from 'fs'

const writeValueToFile = (value: number) => {
  const formatedFileName = Date.now()
  const text = `O valor está em ${value}, em: ${new Date().toLocaleString()}`
  fs.writeFileSync(path.join(__dirname, `../../values-gtg/${formatedFileName}.txt`), text)
  console.log('Arquivo criado em: ' + new Date().toLocaleString())
}

export const verifyReal = () => {
  const realValue: number | undefined = getRealValue()
  if (realValue && realValue > 500) {
    writeValueToFile(realValue)
  }
}

const getRealValue = (): number | undefined => {
  const fileResponse = fs.readFileSync(path.join(__dirname, '../../valor-em-real.txt'), 'utf8')
  const value = fileResponse.split(":")[1].trim().split(" ")[0]
  return parseFloat(value)
    ? parseFloat(value)
    : undefined
}

const CronJob = require('cron').CronJob

const job = new CronJob('0/1 * * * * *', () => {
  verifyReal()
})

job.start()