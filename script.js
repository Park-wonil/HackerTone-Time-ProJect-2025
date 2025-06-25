// script.js

let loginMethod = '';
let userName = '';

// 로그인/회원가입, 구글 로그인, proceedToVideo 등 기존 로직은 이전과 동일…

// JWT 페이로드 안전 디코딩
function decodeJwtResponse(token) {
  const base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  const json = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(json);
}

function handleGoogleLogin(response) {
  const payload = decodeJwtResponse(response.credential);
  loginMethod = 'google';
  userName = payload.name || payload.given_name || payload.email.split('@')[0];
  proceedToVideo();
}

// 목표시간 선택박스 초기화 (DOMContentLoaded 여부 관계없이 즉시 실행)
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
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimeSelectors);
} else {
  initTimeSelectors();
}

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

  const ac = document.getElementById('alice-container');
  ac.classList.add('fade-out-short');
  setTimeout(() => {
    ac.style.display = 'none';
    // TODO: 다음 화면 전환 로직
  }, 1000);
}
