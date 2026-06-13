const workInput = document.getElementById('work-input');
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const progressBar = document.querySelector('.progress-bar');
const progressBg = document.querySelector('.progress-bg');
const todayMinutes = document.getElementById('today-minutes');

// 快速選擇按鈕
const quickBtns = document.querySelectorAll('.quick-btn');

// 文字標籤
startBtn.textContent = '開始';
resetBtn.textContent = '重設';

const CIRCUMFERENCE = 2 * Math.PI * 130; // 圓周長
const MIN_RADIUS = 50; // 進度圈最小半徑
const MAX_RADIUS = 130; // 進度圈最大半徑
const RADIUS_RANGE = MAX_RADIUS - MIN_RADIUS;

let timerInterval = null;
let totalSeconds = 25 * 60;
let secondsLeft = 25 * 60;
let isWorkTime = true; // 用於 Pomodoro
let todayTotalMinutes = parseInt(localStorage.getItem('todayTotalMinutes') || '0');

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
    
    // 計算半徑：隨著時間流逝，圓環從大變小
    const currentRadius = MAX_RADIUS - (RADIUS_RANGE * (1 - progressPercentage));
    
    // 更新兩個圓的半徑
    progressBar.setAttribute('r', currentRadius);
    progressBg.setAttribute('r', currentRadius);
}

// 更新今日統計
function updateTodayStats() {
    todayMinutes.textContent = todayTotalMinutes;
    localStorage.setItem('todayTotalMinutes', todayTotalMinutes);
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
        // 移除其他按鈕的 active 狀態
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
                
                // 自訂模式
                const minutesCompleted = Math.floor((totalSeconds - secondsLeft) / 60);
                todayTotalMinutes += minutesCompleted;
                updateTodayStats();
                
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

// 檢查是否是新的一天，重設統計
function checkNewDay() {
    const lastDate = localStorage.getItem('lastDate');
    const today = new Date().toDateString();
    
    if (lastDate !== today) {
        localStorage.setItem('lastDate', today);
        todayTotalMinutes = 0;
        localStorage.setItem('todayTotalMinutes', '0');
    }
}

// 啟動初始化
checkNewDay();
updateTodayStats();
initTimer(); 
