let timerInterval;
let seconds = 0, minutes = 0, hours = 0;
let alertTime = 25; // Tempo padrão de 25 minutos

function setAlertTime() {
    // Obtém o valor do campo de input ou usa o tempo padrão se estiver vazio
    const inputValue = document.getElementById('inputTime').value;
    alertTime = inputValue ? parseInt(inputValue, 10) : 25;
}

function startTimer() {
    setAlertTime(); // Chama a função para definir o tempo de alerta
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer(); // Para o timer
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay(); // Atualiza a exibição do cronômetro
}

function updateTimer() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;

        if (minutes === alertTime) { // Verifica se o tempo atingiu o tempo de alerta definido pelo usuário
            showNotification();
            playNotificationSound();
            stopTimer(); // Adiciona a chamada para parar o timer
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    updateDisplay(); // Atualiza a exibição do cronômetro
}

function updateDisplay() {
    document.getElementById('hours').textContent = padZero(hours);
    document.getElementById('minutes').textContent = padZero(minutes);
    document.getElementById('seconds').textContent = padZero(seconds);
}

function padZero(value) {
    return value < 10 ? '0' + value : value;
}

function showNotification() {
    if (Notification.permission === "granted") {
        new Notification("Atenção!", {
            body: "Você atingiu o tempo definido!"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                showNotification();
            }
        });
    }
}

function playNotificationSound() {
    let audio = document.getElementById('notificationSound');
    audio.play();
}