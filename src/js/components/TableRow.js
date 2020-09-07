import { getTranslate } from '@/js/utils/getTranslate'
import { getPrice } from '@/js/utils/getPrice'

export class TableRow {
  constructor(options) {
    this.ceils = [
      'title',
      'year',
      'color',
      'status',
      'price',
      'delete',
      'description',
    ]
    this.data = { ...options.data }
    this.parrent = options.parrent
    this.onDelete = options.onDelete
  }

  create() {
    const row = document.createElement('div')
    row.classList.add('table-row')

    const arrCeils = this.ceils.map((value) => {
      const ceil = document.createElement('div')

      ceil.classList.add('table-ceil', `table-${value}`)

      switch (value) {
        case 'color':
          const color = document.createElement('div')
          color.classList.add('color', `${this.data[value]}`)

          ceil.appendChild(color)
          break
        case 'delete':
          const del = document.createElement('button')
          del.innerText = getTranslate('delete')
          del.addEventListener('click', () => this.onDelete(this.data))

          ceil.appendChild(del)
          break
        case 'status':
          ceil.innerText = getTranslate(this.data[value])
          break
        case 'price':
          ceil.innerHTML = getPrice(this.data[value])
          break
        default:
          ceil.innerText = this.data[value] || ''
          break
      }

      return ceil
    })

    arrCeils.forEach((ceil) => {
      row.appendChild(ceil)
    })

    return row
  }

  render() {
    const row = this.create()

    this.parrent.appendChild(row)
  }
}
