// script.js

let loginMethod = '';
let userName = '';

function showSignup() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('signup-container').style.display = 'block';
}

function showLogin() {
  document.getElementById('signup-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'block';
}

function register() {
  const id = document.getElementById('signup-id').value;
  const pw = document.getElementById('signup-pw').value;
  const nickname = document.getElementById('signup-nickname').value;
  const birth = document.getElementById('signup-birth').value;
  if (!id || !pw || !nickname || !birth) {
    alert('모든 정보를 입력하세요!');
    return;
  }
  if (localStorage.getItem('user_' + id)) {
    alert('이미 존재하는 아이디입니다!');
    return;
  }
  localStorage.setItem(
    'user_' + id,
    JSON.stringify({ pw, nickname, birth })
  );
  alert('회원가입이 완료되었습니다!');
  showLogin();
}

function login() {
  const id = document.getElementById('login-id').value;
  const pw = document.getElementById('login-pw').value;
  const saved = localStorage.getItem('user_' + id);
  const savedPw = saved ? JSON.parse(saved).pw : null;

  if (savedPw && savedPw === pw) {
    // 원래 로그인 로직 복원
    loginMethod = 'local';
    userName = JSON.parse(saved).nickname;
    proceedToVideo();
  } else {
    document.getElementById('login-result').textContent =
      '❌ 아이디 또는 비밀번호가 일치하지 않습니다.';
  }
}

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

function proceedToVideo() {
  const loginBox = document.getElementById('login-container');
  loginBox.classList.add('fade');
  loginBox.style.opacity = '0';
  setTimeout(() => {
    loginBox.style.display = 'none';
    const vc = document.getElementById('video-container');
    const video = document.getElementById('intro-video');
    vc.style.display = 'flex';
    video.play().catch(console.error);
    video.addEventListener('ended', () => {
      vc.classList.add('fade-out');
      setTimeout(() => {
        vc.style.display = 'none';
        document.getElementById('alice-container').style.display = 'block';
      }, 2000);
    });
  }, 2000);
}

// 목표시간 선택박스 초기화
function initTimeSelectors() {
  const hourSel = document.getElementById('goal-hour');
  const minSel = document.getElementById('goal-minute');
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

function setGoalTime() {
  const h = document.getElementById('goal-hour').value;
  const m = document.getElementById('goal-minute').value;
  if (h === '' || m === '') {
    alert('목표 시간을 선택해주세요.');
    return;
  }
  const timeInput = `${h}:${m}`;
  const status = document.getElementById('status');
  const msg =
    loginMethod === 'google'
      ? `${userName} 님의 목표 시간은 ${timeInput}으로 설정되었습니다.`
      : `${userName}님의 목표 시간은 ${timeInput}으로 설정되었습니다.`;
  status.textContent = msg;

  const ac = document.getElementById('alice-container');
}
