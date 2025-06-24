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
    const loginBox = document.getElementById('login-container');
    loginBox.classList.add('fade');
    loginBox.style.opacity = '0';

    setTimeout(() => {
      loginBox.style.display = 'none';

      const videoContainer = document.getElementById('video-container');
      const video = document.getElementById('intro-video');
      videoContainer.style.display = 'flex';

      video.play().catch(error => {
        console.error("영상 재생 실패:", error);
      });

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


// Google 로그인 콜백 함수
function handleCredentialResponse(response) {
  const loginBox = document.getElementById('login-container');
  loginBox.classList.add('fade');
  loginBox.style.opacity = '0';

  setTimeout(() => {
    loginBox.style.display = 'none';

    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('intro-video');
    videoContainer.style.display = 'flex';

    video.play().catch(error => {
      console.error("영상 재생 실패:", error);
    });

    video.addEventListener('ended', () => {
      videoContainer.classList.add('fade-out');
      setTimeout(() => {
        videoContainer.style.display = 'none';
        document.getElementById('alice-container').style.display = 'block';
      }, 2000);
    });
  }, 2000);
}
