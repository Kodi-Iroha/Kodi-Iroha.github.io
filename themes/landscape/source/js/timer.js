const workInput = document.getElementById('work-input');
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const progressBar = document.querySelector('.progress-bar');

const CIRCUMFERENCE = 2 * Math.PI * 130; // 圓周長

let timerInterval = null;
let totalSeconds = 25 * 60;
let secondsLeft = 25 * 60;

// 初始化進度條
progressBar.style.strokeDasharray = CIRCUMFERENCE;
progressBar.style.strokeDashoffset = 0;

// 更新時間與進度條畫面
function updateDisplay() {
    const mins = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
    const secs = (secondsLeft % 60).toString().padStart(2, '0');
    const timeString = `${mins}:${secs}`;
    
    timeDisplay.textContent = timeString;
    document.title = `(${timeString}) 專注中...`;
    
    // 計算進度條偏移量
    const progressPercentage = secondsLeft / totalSeconds;
    const offset = CIRCUMFERENCE * (1 - progressPercentage);
    progressBar.style.strokeDashoffset = offset;
}

// 讀取設定值並重設
function initTimer() {
    // 確保輸入數值正常，防呆轉換
    let userMin = parseInt(workInput.value) || 25;
    totalSeconds = userMin * 60;
    secondsLeft = totalSeconds;
    updateDisplay();
}

// 開始 / 暫停切換
function toggleTimer() {
    if (timerInterval) {
        // 暫停
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.textContent = '開始';
    } else {
        // 開始
        startBtn.textContent = '暫停';
        timerInterval = setInterval(() => {
            if (secondsLeft > 0) {
                secondsLeft--;
                updateDisplay();
            } else {
                // 時間到
                clearInterval(timerInterval);
                timerInterval = null;
                startBtn.textContent = '開始';
                document.title = '時間到！';
                alert('專注時間結束！休息一下吧。');
                initTimer();
            }
        }, 1000);
    }
}

// 完全重設
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.textContent = '開始';
    document.title = '專注計時器';
    initTimer();
}

// 監聽器
startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
workInput.addEventListener('change', resetTimer); // 使用者改動時間時，自動重設

// 啟動初始化
initTimer(); 
