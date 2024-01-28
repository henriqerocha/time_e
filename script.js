let timerInterval;
let seconds = 0, minutes = 0, hours = 0;

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;

        if (minutes === 25) {
            showNotification();
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

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
            body: "Você atingiu 25 minutos!"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                showNotification();
            }
        });
    }
}