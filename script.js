let loginMethod = '';
let userName = '';

function showSignup() { /* … */ }
function showLogin()  { /* … */ }
function register()   { /* … */ }
function login()      { /* … */ }
function decodeJwtResponse(token) { /* … */ }
function handleGoogleLogin(response) { /* … */ }
function proceedToVideo() { /* … */ }

// 목표시간 선택박스 초기화
function initTimeSelectors() {
  const hourSel = document.getElementById('goal-hour');
  const minSel  = document.getElementById('goal-minute');
  if (!hourSel || !minSel) return;
  for (let h = 0; h < 24; h++) {
    const o = document.createElement('option');
    o.value = o.textContent = String(h).padStart(2, '0');
    hourSel.append(o);
  }
  for (let m = 0; m < 60; m++) {
    const o = document.createElement('option');
    o.value = o.textContent = String(m).padStart(2, '0');
    minSel.append(o);
  }
}
window.addEventListener('DOMContentLoaded', initTimeSelectors);

// 목표시간 설정 및 설명 토글
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-desc');
  const descPanel = document.getElementById('description-panel');
  toggleBtn.addEventListener('click', () => {
    if (descPanel.style.display === 'block') {
      descPanel.style.display = 'none';
      toggleBtn.textContent = '설명 보기';
    } else {
      descPanel.style.display = 'block';
      toggleBtn.textContent = '설명 닫기';
    }
  });
});

function setGoalTime() {
  const h = document.getElementById('goal-hour').value;
  const m = document.getElementById('goal-minute').value;
  if (h === '' || m === '') {
    alert('목표 시간을 선택해주세요.');
    return;
  }
  const timeInput = `${h}:${m}`;
  const status = document.getElementById('status');
  const msg = loginMethod === 'google'
    ? `${userName} 님의 목표 시간은 ${timeInput}으로 설정되었습니다.`
    : `${userName}님의 목표 시간은 ${timeInput}으로 설정되었습니다.`;
  status.textContent = msg;
}
