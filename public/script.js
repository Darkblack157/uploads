function createPetals() {
    for (let i = 0; i < 20; i++) {
    const petal = document.createElement("div")
    petal.classList.add("petal")
    petal.style.left = `${Math.random() * 100}vw`
    petal.style.animationDuration = `${Math.random() * 5 + 5}s`
    petal.style.animationDelay = `${Math.random() * 5}s`
    document.body.appendChild(petal)
    }
    }
    createPetals()
    
    function exibirDataHora() {
    const now = new Date()
    const horaFormatada = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
    }).toUpperCase()
    const dataFormatada = now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
    })
    const diaDaSemana = now.toLocaleDateString('pt-BR', { weekday: 'long' })
    const dataHoraContainer = document.getElementById('dataHoraContainer')
    if (dataHoraContainer) {
    dataHoraContainer.innerHTML = `
    <p>Data: ${dataFormatada}</p>
    <p>Hora: ${horaFormatada}</p>
    <p>Dia da semana: ${diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1)}</p>
    `
    }
    }
    setInterval(exibirDataHora, 1000)
    
    document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundAudio')
    audio.volume = 0.4
    audio.loop = true
    const playOnInteraction = () => {
    try {
    audio.play()
    .then(() => {
    removeEventListeners()
    })
    .catch(error => console.error('Erro ao reproduzir:', error))
    } catch (error) {
    console.error('Erro:', error)
    }
    }
    const events = ['click', 'touchstart', 'mousemove', 'keydown', 'scroll', 'drag', 'pointerdown']
    const removeEventListeners = () => {
    events.forEach(event => {
    document.removeEventListener(event, playOnInteraction)
    })
    }
    events.forEach(event => {
    document.addEventListener(event, playOnInteraction, { once: true })
    })
    })