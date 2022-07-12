let cardContainer = null
const cardArray = []

export default class Toast {
    defaultOpt = {
        message: 'This is the default message', 
        position: 'top-right', 
        type: 'default',
        theme: 'light',
        progressBar: true, 
        enableClick: true,
        autoClose: 1000
    }

    #card = null

    constructor (userOpt) {
        Object.entries(userOpt).forEach(([key, value]) => {
            this.defaultOpt[key] = value ?? this.defaultOpt[key]
        })

        console.log(this.defaultOpt)
        
        this.theme()
        this.createToast()
        this.position()
        this.timestamp()
    }

    theme() {
        document.body.setAttribute('data-theme', this.defaultOpt.theme)
    }

    createToast() {
        const cardDiv = document.createElement('div') 
        cardDiv.classList.add('card')

        const p = document.createElement('p')
        p.classList.add('text')
        p.textContent = this.defaultOpt.message
        const closeBtn = document.createElement('div')
        closeBtn.classList.add('close-btn')

        cardDiv.append(p, closeBtn)
        this.#card = cardDiv
        cardArray.push(cardDiv)
    }

    position() {
        const selector = document.querySelector(`.container[data-position="${this.defaultOpt.position}"]`)

        const container = selector || this.createContainer()
        cardContainer = container 

        container.appendChild(this.#card)
        document.body.appendChild(container)
    }
    
    timestamp() {
        if (this.defaultOpt.progressBar) {
            const progressBar = document.createElement('div')
            progressBar.classList.add('progress-bar')

            if (this.defaultOpt.type !== 'default') progressBar.style.setProperty('--color', `var(--${this.defaultOpt.type}-color)`)
            
            this.#card.appendChild(progressBar)
            let width = Number(getComputedStyle(progressBar).getPropertyValue('--width').slice(0, 3))
    
            setInterval(() => {
                if (Math.ceil(width) === 0) return 
                
                width -= 600 / this.defaultOpt.autoClose
                progressBar.style.setProperty('--width', `${width}%`)
            }, 5)

            setTimeout(() => {
                if (cardContainer.children.length - 1 === 0) {
                    document.body.removeChild(cardContainer)
                    return 
                }

                cardContainer.removeChild(cardArray[0])
                cardArray.shift()
            }, this.defaultOpt.autoClose)
        }
    }

    createContainer() {
        const container = document.createElement('div')
        container.classList.add('container')
        container.setAttribute('data-position', this.defaultOpt.position)

        return container
    }
}