let cardContainer, timeout, interval, numberOfCards = 0
cardContainer = timeout = interval = null
const cardArray = []

export default class Toast {
    defaultOpt = {
        message: 'This is the default message', 
        position: 'top-left', 
        type: 'default',
        theme: 'light',
        progressBar: true, 
        enableClick: true,
        autoClose: 2000,
        limit: 4,
    }

    #card = null

    constructor (userOpt) {
        Object.entries(userOpt).forEach(([key, value]) => {
            this.defaultOpt[key] = value ?? this.defaultOpt[key]
        })

        if (this.defaultOpt.limit > numberOfCards) {
            this.theme()
            this.createToast()
            this.position()
            this.timestamp()
        }
    }

    theme() {
        document.body.setAttribute('data-theme', this.defaultOpt.theme)
    }

    createToast() {
        numberOfCards++

        const cardDiv = document.createElement('div') 
        cardDiv.classList.add('card')

        const p = document.createElement('p')
        p.classList.add('text')
        p.textContent = this.defaultOpt.message
        const closeBtn = document.createElement('div')
        closeBtn.classList.add('close-btn')

        closeBtn.addEventListener('click', () => {
            this.onClose(true, closeBtn)
        })

        cardDiv.append(p, closeBtn)

        if (this.defaultOpt.enableClick) {
            cardDiv.addEventListener('click', () => {
                this.onClose(true, closeBtn)
            })
        }

        this.#card = cardDiv
        cardArray.push(cardDiv)

        return 
    }

    position() {
        const selector = document.querySelector(`.container[data-position="${this.defaultOpt.position}"]`)

        const container = selector || this.createContainer()
        cardContainer = container 

        container.appendChild(this.#card)
        document.body.appendChild(container)

        return 
    }
    
    timestamp() {
        const progressBar = document.createElement('div')
        progressBar.classList.add('progress-bar')

        if (this.defaultOpt.type !== 'default') progressBar.style.setProperty('--color', `var(--${this.defaultOpt.type}-color)`)
        
        if (!this.defaultOpt.progressBar) progressBar.style.setProperty('--color', `transparent`)

        this.#card.appendChild(progressBar)
        let width = Number(getComputedStyle(progressBar).getPropertyValue('--width').slice(0, 3))

        interval = setInterval(() => {
            if (Math.ceil(width) === 0) return 
            
            width -= 600 / this.defaultOpt.autoClose
            progressBar.style.setProperty('--width', `${width}%`)
        }, 5)

        timeout = setTimeout(this.onClose, this.defaultOpt.autoClose, false, progressBar)
    }

    createContainer() {
        const container = document.createElement('div')
        container.classList.add('container')
        container.setAttribute('data-position', this.defaultOpt.position)

        return container
    }

    onClose(clicked, { parentElement }) {
        numberOfCards--

        if (clicked) clearTimeout(timeout)

        cardContainer.removeChild(cardArray[cardArray.indexOf(parentElement)])
        cardArray.splice(cardArray.indexOf(parentElement), cardArray.indexOf(parentElement))

        if (cardArray.length === 1) document.body.removeChild(cardContainer)

        return 
    }
}
