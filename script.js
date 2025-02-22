let timeInMinutes = 2; // 2 minutes
let timeInSeconds = timeInMinutes * 60;
let timerInterval;
let isRunning = false;

const countdownElement = document.getElementById('countdown');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const messageElement = document.getElementById('message');
const widgetContainer = document.querySelector('.widget-container'); // Widget container

function updateCountdown() {
    const minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    countdownElement.textContent = `${minutes}:${seconds}`;

    // Stop the timer and show the "Hydrated and Unstoppable!" message
    if (timeInSeconds <= 0) {
        clearInterval(timerInterval);
        countdownElement.textContent = "00:00";
        messageElement.textContent = "Hydrated and Unstoppable! 🎉";
        messageElement.classList.add('show');
        startPauseButton.disabled = true; // Disable the button
        resetButton.classList.remove('hidden'); // Show the reset button
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
    } else {
        clearInterval(timerInterval);
        countdownElement.textContent = "00:00";
        messageElement.textContent = "Hydrated and Unstoppable! 🎉";
        messageElement.classList.add('show');
        startPauseButton.disabled = true; // Disable the button
        resetButton.classList.remove('hidden'); // Show the reset button
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
    widgetContainer.style.animationPlayState = 'paused'; // Stop shaking animation
    isRunning = false;
});

// Initial call to display the timer immediately
updateCountdown();