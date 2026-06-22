export const date2Moment = (date: Date): string => {
  let d = new Date(date)
  let Y = d.getFullYear()
  let M = (d.getMonth() + 1).toString().padStart(2, '0')
  let D = d.getDate().toString().padStart(2, '0')

  return `${Y}.${M}.${D}`
}
