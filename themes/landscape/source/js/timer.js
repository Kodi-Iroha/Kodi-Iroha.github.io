const workInput = document.getElementById('work-input');

const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const progressBar = document.querySelector('.progress-bar');











// 取得彈出按鈕與計時器容器
const toggleMiniBtn = document.getElementById('toggle-mini-btn');
const timerContainer = document.querySelector('.timer-container');
const timerCircle = document.querySelector('.timer-circle');

if ('documentPictureInPicture' in window) {
  toggleMiniBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (window.documentPictureInPicture.window) {
      window.documentPictureInPicture.window.close();
      return;
    }

    try {
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 340,
        height: 380,
      });

      if (!pipWindow) {
        throw new Error("瀏覽器拒絕建立子母畫面視窗。");
      }

      pipWindow.document.title = '';
      const currentTimerCss = document.querySelector('link[href$="timer.css"]');
      const pipLink = pipWindow.document.createElement('link');
      pipLink.rel = 'stylesheet';
      pipLink.href = currentTimerCss ? currentTimerCss.href : new URL('/css/timer.css', window.location.href).href;
      pipWindow.document.head.appendChild(pipLink);

      const pipStyle = pipWindow.document.createElement('style');
      pipStyle.textContent = `
        body {
          margin: 0;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .timer-circle {
          margin: 0;
          position: relative;
          width: 320px;
          height: 320px;
        }
      `;
      pipWindow.document.head.appendChild(pipStyle);

      toggleMiniBtn.style.display = 'none';
      pipWindow.document.body.appendChild(timerCircle);

      pipWindow.addEventListener('pagehide', (event) => {
        const timerCircleElement = event.target.querySelector('.timer-circle');
        const toolsPage = document.querySelector('.tools-page');

        if (timerCircleElement && toolsPage && timerContainer) {
          timerContainer.appendChild(timerCircleElement);
          toggleMiniBtn.style.display = '';
        }
      });
    } catch (error) {
      console.error("無法開啟子母畫面:", error);
      alert("開啟小視窗失敗，請確保使用 Chrome/Edge 瀏覽器，且透過本地伺服器（如 Live Server）開啟。");
    }
  });
} else {
  toggleMiniBtn.style.display = 'none';
  console.log('您的瀏覽器不支援 Document Picture-in-Picture 功能。');
}















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
