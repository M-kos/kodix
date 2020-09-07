/* eslint-disable indent */
const initialState = {
  title: '',
  year: '',
  price: '',
  description: '',
  color: '',
  status: '',
}

export const formHandler = (form, createHandler) => {
  let state = { ...initialState }

  let currentColor = null

  const inputArray = form.querySelectorAll('input')
  const colorBlock = form.querySelector('.add-block__colors')
  const colorElemArray = form.querySelectorAll('.color-item')
  const selectBlock = form.querySelector('.add-block__select-status')
  const selectItemArray = form.querySelectorAll('.select-body-item')
  const selectTitle = selectBlock.querySelector('.select-title')

  const focusHandler = (event) => {
    form
      .querySelector(`input[name=${event.target.name}]`)
      .classList.remove('error')

    if (!state[event.target.name]) {
      const label = form.querySelector(`label[for=${event.target.name}]`)
      label.classList.toggle('active')
    }
  }

  const inputHandler = (event) => {
    const { name, value } = event.target

    state[name] = value.trim()
  }

  const clearCurrentColor = () => {
    if (currentColor) {
      currentColor.classList.remove('active')
      currentColor = null
    }
  }

  const colorHandler = (event) => {
    colorBlock.classList.remove('error')

    clearCurrentColor()

    currentColor = event.currentTarget
    currentColor.classList.add('active')
    state.color = currentColor.dataset.color
  }

  const selectHandler = () => {
    selectBlock.classList.toggle('open')
  }

  const onClickSelectItem = (event) => {
    event.stopPropagation()

    state.status = event.target.dataset.status
    selectTitle.innerText = event.target.innerText
    selectBlock.classList.toggle('open')
  }

  const clearValues = () => {
    state = { ...initialState }

    inputArray.forEach((input) => {
      input.value = ''
    })

    clearCurrentColor()

    selectTitle.innerText = 'Статус'
  }

  const submitHandler = (event) => {
    event.preventDefault()
    let isValid = true

    Object.keys(state).forEach((key) => {
      if (!state[key]) {
        switch (key) {
          case 'color':
            colorBlock.classList.add('error')
            break
          case 'status':
            selectBlock.classList.add('error')
            break

          default:
            form.querySelector(`input[name=${key}]`).classList.add('error')
            break
        }

        isValid = false
      }
    })

    if (isValid) {
      const randomNum = `${Date.now()}${Math.ceil(Math.random() * 1000)}`
      createHandler({ ...state, id: randomNum })
      clearValues()
    }
  }

  form.addEventListener('submit', submitHandler)

  inputArray.forEach((input) => {
    input.addEventListener('focus', focusHandler)
    input.addEventListener('blur', focusHandler)
    input.addEventListener('input', inputHandler)
  })

  colorElemArray.forEach((elem) => {
    elem.addEventListener('click', colorHandler)
  })

  selectBlock.addEventListener('click', selectHandler)

  selectItemArray.forEach((item) => {
    item.addEventListener('click', onClickSelectItem)
  })
}
