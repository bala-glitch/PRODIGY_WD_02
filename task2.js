let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerId = null;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const clearLapsBtn = document.getElementById('clearLaps');
const lapsList = document.getElementById('laps');

function start() {
    if (!isRunning) {
        startTime = Date.now() - difference;
        timerId = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerId);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    isRunning = false;
    display.textContent = '00:00:00.0';
    laps = [];
    renderLaps();
}

function lap() {
    if (isRunning) {
        laps.push(formatTime(difference));
        renderLaps();
    }
}

function clearLaps() {
    laps = [];
    renderLaps();
}

function updateTime() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(ms) {
    const milliseconds = parseInt((ms % 1000) / 100);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        milliseconds
    );
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
clearLapsBtn.addEventListener('click', clearLaps);
