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
  if (!id || !pw) {
    alert('아이디와 비밀번호를 입력하세요!');
    return;
  }
  if (localStorage.getItem('user_' + id)) {
    alert('이미 존재하는 아이디입니다!');
    return;
  }
  localStorage.setItem('user_' + id, pw);
  alert('회원가입이 완료되었습니다!');
  showLogin();
}
function login() {
  const id = document.getElementById('login-id').value;
  const pw = document.getElementById('login-pw').value;
  const savedPw = localStorage.getItem('user_' + id);
  if (savedPw && savedPw === pw) {
    // 1. 오버레이 보여줌
    const overlay = document.getElementById('fade-overlay');
    overlay.classList.add('show');

    // 2. 로그인 박스는 나중에 제거
    setTimeout(() => {
      document.getElementById('login-container').style.display = 'none';
    }, 2000);

    // 3. 영상은 오버레이 끝나고 바로 시작
    setTimeout(() => {
      const video = document.getElementById('intro-video');
      const videoContainer = document.getElementById('video-container');
      videoContainer.style.display = 'flex';
      video.play();
      video.addEventListener('ended', () => {
        videoContainer.classList.add('fade-out');
        setTimeout(() => {
          videoContainer.style.display = 'none';
          document.getElementById('alice-container').style.display = 'block';
        }, 2000);
      });
    }, 2000);
  } else {
    document.getElementById('login-result').textContent = '❌ 아이디 또는 비밀번호가 일치하지 않습니다.';
  }
}

function useTime(planned) {
  const status = document.getElementById('status');
  status.textContent = planned
    ? "👏 시간을 계획대로 보냈어요!"
    : "😅 시간을 낭비했어요...";
}
