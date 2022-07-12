import Toast from './Toast.js'

const showToastBtn = document.querySelector('.btn')

showToastBtn.addEventListener('click', () => {
    const toast = new Toast({ 
        message: 'Adesso è dura!',
        position: 'top-left',
        type: 'warning', 
        theme: 'light',
        progressBar: true,
        autoClose: 2000,
    })
})
    


/*
    Mancano: 
    - Close Btn
    - EnableClick

    BONUS: - Limit 
           - Pause on Hover (difficult)
*/