const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isPlay = false;
let secCounter = 0;
let minCounter = 0;
let centiCounter = 0;
let lapItem = 0;
let minInterval, secInterval, centiSecInterval;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const play = () => {
    if (!isPlay) {
        playButton.innerHTML = 'Pause';
        bg.classList.add("animation-bg");
        
        minInterval = setInterval(() => {
            minute.innerHTML = `${++minCounter} :`;
        }, 60 * 1000);

        secInterval = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML = `&nbsp;${++secCounter} :`;
        }, 1000);

        centiSecInterval = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);

        isPlay = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(minInterval);
        clearInterval(secInterval);
        clearInterval(centiSecInterval);
        isPlay = false;
        bg.classList.remove("animation-bg");
    }

    toggleButton();
};

const reset = () => {
    clearInterval(minInterval);
    clearInterval(secInterval);
    clearInterval(centiSecInterval);

    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;
    isPlay = false;

    minute.innerHTML = '0 :';
    second.innerHTML = '&nbsp;0 :';
    centiSecond.innerHTML = '&nbsp;0';

    playButton.innerHTML = 'Play';
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    bg.classList.remove("animation-bg");
};

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerText = `  #${++lapItem}  `;
    timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
};

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);
    clearButton.classList.add("hidden");
    lapItem = 0;
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
