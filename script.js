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
  localStorage.setItem('user_' + id,
    JSON.stringify({ pw, nickname, birth }));
  alert('회원가입이 완료되었습니다!');
  showLogin();
}

function login() {
  const id = document.getElementById('login-id').value;
  const pw = document.getElementById('login-pw').value;
  const saved = localStorage.getItem('user_' + id);
  const savedData = saved ? JSON.parse(saved) : null;
  if (savedData && savedData.pw === pw) {
    // 로컬 로그인 성공 시
    loginMethod = 'local';
    userName = savedData.nickname;
    proceedToVideo();
  } else {
    document.getElementById('login-result').textContent =
      '❌ 아이디 또는 비밀번호가 일치하지 않습니다.';
  }
}

// 구글 로그인 콜백
function handleGoogleLogin(response) {
  // JWT 디코딩으로 사용자 이름 추출
  const payload = JSON.parse(atob(response.credential.split('.')[1]));
  loginMethod = 'google';
  userName = payload.name;
  proceedToVideo();
}

function proceedToVideo() {
  const loginBox = document.getElementById('login-container');
  loginBox.classList.add('fade');
  loginBox.style.opacity = '0';
  setTimeout(() => {
    loginBox.style.display = 'none';
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('intro-video');
    videoContainer.style.display = 'flex';
    video.play().catch(console.error);
    video.addEventListener('ended', () => {
      videoContainer.classList.add('fade-out');
      setTimeout(() => {
        videoContainer.style.display = 'none';
        document.getElementById('alice-container').style.display = 'block';
      }, 2000);
    });
  }, 2000);
}

// 목표 시간 설정 및 짧은 페이드아웃 (1초)
function setGoalTime() {
  const timeInput = document.getElementById('goal-time').value;
  const status = document.getElementById('status');
  if (!timeInput) {
    alert('목표 시간을 선택해주세요.');
    return;
  }
  // 로그인 방식에 따라 다른 메시지
  let message = '';
  if (loginMethod === 'google') {
    message = `${userName} 님의 목표 시간은 ${timeInput}으로 설정되었습니다.`;
  } else {
    message = `${userName}님의 목표 시간은 ${timeInput}으로 설정되었습니다.`;
  }
  status.textContent = message;

  // 1초간의 CSS transition으로 페이드아웃
  const aliceContainer = document.getElementById('alice-container');
  aliceContainer.classList.add('fade-out-short');
  setTimeout(() => {
    aliceContainer.style.display = 'none';
    // TODO: 다음 화면 전환 로직 추가
  }, 1000);
}
