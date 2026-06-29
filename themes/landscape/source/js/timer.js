const workInput = document.getElementById('work-input');

const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const progressBar = document.querySelector('.progress-bar');




const timeDisplay = document.getElementById('time-display');

// 快速選擇按鈕
const quickBtns = document.querySelectorAll('.quick-btn');
startBtn.textContent = '開始';
resetBtn.textContent = '重設';

const CIRCUMFERENCE = 2 * Math.PI * 150; // 圓周長

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
    
    // 計算進度百分比
    const progressPercentage = secondsLeft / totalSeconds;
    
    // 進度條偏移（進度環效果）
    const offset = CIRCUMFERENCE * (1 - progressPercentage);
    progressBar.style.strokeDashoffset = offset;
}

// 讀取設定值並重設
function initTimer() {
    let userMin = parseInt(workInput.value) || 25;
    totalSeconds = userMin * 60;
    secondsLeft = totalSeconds;
    updateDisplay();
}

// 快速選擇功能
quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        quickBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const minutes = parseInt(btn.getAttribute('data-minutes'));
        workInput.value = minutes;
        resetTimer();
    });
});

// 開始 / 暫停切換
function toggleTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.textContent = '開始';
    } else {
        startBtn.textContent = '暫停';
        timerInterval = setInterval(() => {
            if (secondsLeft > 0) {
                secondsLeft--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                startBtn.textContent = '開始';
                document.title = '時間到！';
                
                alert('⏰ 專注時間結束！休息一下吧。');
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
workInput.addEventListener('change', resetTimer);

// 啟動初始化
initTimer(); 
