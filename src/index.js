import { HttpRequest } from './js/services/http'
import { TableRow } from './js/components/TableRow'
import { formHandler } from './js/services/form'
import { url } from './js/constants/url'

import './styles/styles.css'

const ready = async () => {
  let state = []
  const table = document.getElementById('table-body')
  const form = document.getElementById('add-block-form')
  const fillDiv = document.createElement('div')

  const render = () => {
    table.innerHTML = ''

    state.forEach((elem) => {
      new TableRow({
        data: elem,
        parrent: table,
        onDelete,
      }).render()
    })
  }

  const onDelete = ({ id }) => {
    state = state.filter((el) => el.id !== id)
    render()
  }

  const createHandler = (data) => {
    state.push(data)
    render()
  }

  fillDiv.classList.add('fill-row')
  fillDiv.innerText = 'Loading...'
  table.appendChild(fillDiv)

  try {
    state = await HttpRequest.getData(url)

    if (state) {
      fillDiv.remove()
      render()
    }
  } catch (error) {
    console.error(error)
    fillDiv.innerText = 'Error'
  }

  formHandler(form, createHandler)
}

document.addEventListener('DOMContentLoaded', ready)
