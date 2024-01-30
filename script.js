let timerInterval;
let seconds = 0, minutes = 0, hours = 0;
let alertTime = 1; // Tempo padrão de 1 minuto
let alarmCount = 0; // Contador para controlar o número de vezes que o som deve ser reproduzido

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
    alarmCount = 0; // Zera o contador de reprodução do som
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

        if (minutes >= alertTime) { // Modificação na condição para parar o cronômetro
            stopTimer(); // Para o timer
            alarmCount = 0; // Zera o contador de reprodução do som
        }

        if (minutes % alertTime === 0 && minutes !== 0) { // Modificação na condição para mostrar a notificação
            showNotification();
            playNotificationSound();
        }
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
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

    // Agora, após 2 segundos, reproduza novamente o som
    setTimeout(function () {
        audio.play();
    }, 2000);
}