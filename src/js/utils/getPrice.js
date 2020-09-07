export const getPrice = (value) => {
  const num = parseFloat(value)

  if (num && !isNaN(num)) {
    return `${new Intl.NumberFormat('ru-RU').format(num)} руб.`
  }
}
