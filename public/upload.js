document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault()
    const fileInput = document.getElementById('fileInput')
    const formData = new FormData()
    formData.append('file', fileInput.files[0])
    const loadingSpinner = document.getElementById('loadingSpinner')
    loadingSpinner.style.display = 'flex'
    fetch('/upload', {
    method: 'POST',
    body: formData
    })
    .then(response => response.json())
    .then(data => {
    loadingSpinner.style.display = 'none'
    const resultDiv = document.getElementById('result')
    if (data.fileUrl) {
    resultDiv.innerHTML = `
    <style>
    .popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    }
    
    .card {
    position: relative;
    overflow: hidden;
    text-align: left;
    border-radius: 0.5rem;
    max-width: 290px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background-color: #fff;
    padding: 1rem;
    }
    
    .dismiss {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background-color: #fff;
    color: black;
    border: 2px solid #D1D5DB;
    font-size: 1rem;
    font-weight: 300;
    width: 30px;
    height: 30px;
    border-radius: 7px;
    cursor: pointer;
    transition: .3s ease;
    }
    
    .dismiss:hover {
    background-color: #ee0d0d;
    border: 2px solid #ee0d0d;
    color: #fff;
    }
    
    .header {
    padding: 1.25rem 1rem 1rem 1rem;
    }
    
    .image {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background-color: #e2feee;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    animation: animate .6s linear alternate-reverse infinite;
    transition: .6s ease;
    }
    
    .image svg {
    color: #0afa2a;
    width: 2rem;
    height: 2rem;
    }
    
    .content {
    margin-top: 0.75rem;
    text-align: center;
    }
    
    .title {
    color: #066e29;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    }
    
    .message {
    margin-top: 0.5rem;
    color: #595b5f;
    font-size: 0.875rem;
    line-height: 1.25rem;
    }
    
    .actions {
    display: flex;
    justify-content: space-between;
    gap: 10px; /* Espaço entre os botões */
    margin: 0.75rem 1rem;
    }
    
    .track {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: #f0f0f0;
    border: 2px solid #d1d5db;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    cursor: pointer;
    font-size: 1rem;
    color: #000;
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s, color 0.3s, transform 0.3s;
    }
    
    .track:hover {
    background-color: #1aa06d;
    color: #fff;
    transform: scale(1.05);
    }
    
    .track svg {
    transition: transform 0.3s;
    }
    
    .track:hover svg {
    transform: rotate(90deg);
    }
    
    .copy {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background-color: #353434;
    color: #CCCCCC;
    border: none;
    cursor: pointer;
    outline: none;
    }
    
    .tooltip {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font: 12px Menlo, Roboto Mono, monospace;
    color: rgb(50, 50, 50);
    background: #f4f3f3;
    padding: 7px;
    border-radius: 4px;
    pointer-events: none;
    }
    
    .copy:hover .tooltip,
    .copy:focus:not(:focus-visible) .tooltip {
    opacity: 1;
    visibility: visible;
    top: -35px;
    }
    
    @keyframes animate {
    from {
    transform: scale(1);
    }
    to {
    transform: scale(1.09);
    }
    }
    
    /* Novo estilo do botão Explore */
    .button {
    width: 110px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    background-color: rgb(161, 255, 20);
    border-radius: 30px;
    color: rgb(19, 19, 19);
    font-weight: 600;
    border: none;
    position: relative;
    cursor: pointer;
    transition-duration: .2s;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.116);
    padding-left: 8px;
    transition-duration: .5s;
    }
    
    .svgIcon {
    height: 25px;
    transition-duration: 1.5s;
    }
    
    .button:hover {
    background-color: rgb(192, 255, 20);
    transition-duration: .5s;
    }
    
    .button:active {
    transform: scale(0.97);
    transition-duration: .2s;
    }
    
    .button:hover .svgIcon {
    transform: rotate(250deg);
    transition-duration: 1.5s;
    }
    </style>
    
    <div class="popup-container">
    <div class="card"> 
    <button class="dismiss" id="dismissButton" type="button">×</button> 
    <div class="header"> 
    <div class="image">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    </div> 
    <div class="content">
     <span class="title">Upload bem-sucedido</span> 
     <p class="message">Seu arquivo foi carregado. </p> 
    </div> 
    <div class="actions">
    <button class="copy" id="copyButton">
    <span class="tooltip" data-text-initial="Copy to clipboard" data-text-end="Copied!">Copy to clipboard</span>
    <svg xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 6.35 6.35" height="20" width="20" xmlns="http://www.w3.org/2000/svg" class="clipboard">
    <g><path fill="currentColor" d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.206V1.529a.2.2 0 0 1 .206-.206z"></path></g>
    </svg>
    </button>
     <button class="button" id="openButton">
    <svg class="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
    </svg>
    Abrir
    </button>
    </div>
    </div>
    </div>
    </div> 
    `
    document.getElementById('dismissButton').addEventListener('click', function() {
    document.querySelector('.popup-container').remove();
    })
    document.getElementById('copyButton').addEventListener('click', function() {
    const link = data.fileUrl
    navigator.clipboard.writeText(link).then(() => {
    alert('Link copiado para a área de transferência!')
    }).catch(err => {
    console.error('Erro ao copiar o link: ', err)
    })
    })
    document.getElementById('openButton').addEventListener('click', function() {
    window.open(data.fileUrl, '_blank')
    })
    } else {
    resultDiv.innerHTML = `
    <style>
    .error-popup {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    background-color: #232531;
    border-radius: 10px;
    padding: 10px;
    color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    font-family: Arial, sans-serif;
    }
    .error-popup-icon {
    color: #d65563;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    padding: 5px;
    }
    .error-popup-message {
    margin-left: 10px;
    flex: 1;
    }
    .error-popup-title {
    font-size: 16px;
    margin: 0;
    font-weight: bold;
    }
    .error-popup-description {
    font-size: 12px;
    color: #aaa;
    margin: 0;
    }
    .error-popup-close {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 16px;
    }
    .error-popup-close:hover {
    color: #fff;
    }
    </style>
    
    <div class="error-popup" id="errorPopup">
    <div class="error-popup-icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path>
    </svg>
    </div>
    <div class="error-popup-message">
    <p class="error-popup-title">Upload já feito antes</p>
    <p class="error-popup-description">já foi realizado um upload desse arquivo.</p>
    </div>
    <button class="error-popup-close" id="closeErrorPopup">×</button>
    </div>
    `
    document.getElementById('closeErrorPopup').addEventListener('click', function() {
    document.getElementById('errorPopup').remove()
    })
    }
    })
    .catch(error => {
    loadingSpinner.style.display = 'none'
    console.error('Erro:', error)
    })
    })