import Toast from './Toast.js'

const positionBtns = document.querySelectorAll('.position')
const typeBtns = document.querySelectorAll('.type')
const themeBtns = document.querySelectorAll('.theme')
const progressBar = document.querySelector('#progressBar')
const enableClick = document.querySelector('#enableClick')
const autoClose = document.querySelector('#autoClose')
const limit = document.querySelector('#limit')
const regExp = /[0-9]/
const showBtn = document.querySelector('.show') 

const toast = {  }

const activeElement = (array, element) => {
    for (const btn of array) {
        btn.classList.remove('active')
    }

    element.classList.add('active')
}

positionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        activeElement(positionBtns, btn)

        toast.position = btn.textContent
    })
})

typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        activeElement(typeBtns, btn)
        
        toast.type = btn.textContent
    })
})

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        activeElement(themeBtns, btn)
        
        toast.theme = btn.textContent
    })
})

autoClose.addEventListener('input', ({ data }) => {
    if (!regExp.test(data)) autoClose.value = 1000
})

limit.addEventListener('input', ({ data }) => {
    if (!regExp.test(data)) limit.value = 4
})

showBtn.addEventListener('click', () => {
    toast.progressBar = progressBar.checked
    toast.enableClick = enableClick.checked
    toast.limit = Number(limit.value)
    toast.autoClose = Number(autoClose.value)

    new Toast(toast)
})
