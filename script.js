let timeInMinutes = 2; // 2 minutes
let timeInSeconds = timeInMinutes * 60;
let timerInterval;
let isRunning = false;
let alarmPlayed = false; // Track if the alarm has been played

const countdownElement = document.getElementById('countdown');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const messageElement = document.getElementById('message');
const fillingSoundElement = document.getElementById('filling-sound'); // Water filling sound
const alarmElement = document.getElementById('alarm'); // Alarm sound
const widgetContainer = document.querySelector('.widget-container'); // Widget container

function updateCountdown() {
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    countdownElement.textContent = `${minutes}:${seconds}`;

    // Play alarm sound during the last 12 seconds (only once)
    if (timeInSeconds <= 12 && timeInSeconds > 0 && !alarmPlayed) {
        alarmElement.play(); // Play the alarm sound
        alarmPlayed = true; // Mark the alarm as played
    }

    // Stop the timer and show the "Hydrated and Unstoppable!" message
    if (timeInSeconds <= 0) {
        clearInterval(timerInterval);
        countdownElement.textContent = "00:00";
        messageElement.textContent = "Hydrated and Unstoppable! 🎉";
        messageElement.classList.add('show');
        startPauseButton.disabled = true; // Disable the button
        resetButton.classList.remove('hidden'); // Show the reset button
        fillingSoundElement.pause(); // Stop the filling sound
        fillingSoundElement.currentTime = 0; // Reset the filling sound
        confetti(); // Trigger confetti animation
        widgetContainer.style.animationPlayState = 'running'; // Start shaking animation
    } else {
        timeInSeconds--;
    }
}

startPauseButton.addEventListener('click', () => {
    if (!isRunning) {
        timerInterval = setInterval(updateCountdown, 1000);
        startPauseButton.textContent = 'All Done';
        isRunning = true;
        fillingSoundElement.play(); // Play the water filling sound
    } else {
        clearInterval(timerInterval);
        countdownElement.textContent = "00:00";
        messageElement.textContent = "Hydrated and Unstoppable! 🎉";
        messageElement.classList.add('show');
        startPauseButton.disabled = true; // Disable the button
        resetButton.classList.remove('hidden'); // Show the reset button
        fillingSoundElement.pause(); // Stop the filling sound
        fillingSoundElement.currentTime = 0; // Reset the filling sound
        confetti(); // Trigger confetti animation
        widgetContainer.style.animationPlayState = 'running'; // Start shaking animation
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeInSeconds = timeInMinutes * 60;
    countdownElement.textContent = "02:00";
    startPauseButton.textContent = 'Drink Up!';
    startPauseButton.disabled = false;
    resetButton.classList.add('hidden'); // Hide the reset button
    messageElement.classList.remove('show'); // Hide the message
    fillingSoundElement.pause(); // Stop the filling sound
    fillingSoundElement.currentTime = 0; // Reset the filling sound
    widgetContainer.style.animationPlayState = 'paused'; // Stop shaking animation
    isRunning = false;
    alarmPlayed = false; // Reset the alarm flag
});

// Initial call to display the timer immediately
updateCountdown();
