const workInput = document.getElementById('work-input');

const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const progressBar = document.querySelector('.progress-bar');











// 取得彈出按鈕與計時器容器
const toggleMiniBtn = document.getElementById('toggle-mini-btn');
const timerContainer = document.querySelector('.timer-container');

if ('documentPictureInPicture' in window) {
  toggleMiniBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // 如果子母畫面已經開啟，點擊就關閉它
    if (window.documentPictureInPicture.window) {
      window.documentPictureInPicture.window.close();
      return;
    }

    try {
      // 1. 第一時間請求開啟視窗（因為保留了設定時間，這裡把高度稍微加高到 360，比較好塞）
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 280,
        height: 360,
      });

      if (!pipWindow) {
        throw new Error("瀏覽器拒絕建立子母畫面視窗。");
      }

      // 2. 安全地複製 CSS 樣式
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          if (styleSheet.cssRules) {
            const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
            const style = document.createElement('style');
            style.textContent = cssRules;
            pipWindow.document.head.appendChild(style);
          }
        } catch (cssError) {
          if (styleSheet.href) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = styleSheet.href;
            pipWindow.document.head.appendChild(link);
          }
        }
      });

      // 3. 將整個計時器容器（包含左面板）一起移動到桌面懸浮視窗中
      pipWindow.document.body.appendChild(timerContainer);
      
      // 4. 清除基本邊距
      pipWindow.document.body.style.margin = '0';

      // 5. 監聽關閉事件，安全復原元件位置
      pipWindow.addEventListener("pagehide", (event) => {
        const container = event.target.querySelector('.timer-container');
        const toolsPage = document.querySelector('.tools-page');
        
        if (container && toolsPage) {
          // 放回原本網頁的最前面
          toolsPage.insertBefore(container, toolsPage.firstChild);
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
