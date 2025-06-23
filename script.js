function register() {
  const id = document.getElementById('signup-id').value;
  const pw = document.getElementById('signup-pw').value;

  if (!id || !pw) {
    alert('아이디와 비밀번호를 입력하세요!');
    return;
  }

  localStorage.setItem('user_id', id);
  localStorage.setItem('user_pw', pw);

  document.getElementById('signup-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'block';
}

function login() {
  const id = document.getElementById('login-id').value;
  const pw = document.getElementById('login-pw').value;

  const savedId = localStorage.getItem('user_id');
  const savedPw = localStorage.getItem('user_pw');

  if (id === savedId && pw === savedPw) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('welcome-container').style.display = 'block';
  } else {
    document.getElementById('login-result').textContent = '❌ 아이디 또는 비밀번호가 일치하지 않습니다.';
  }
}
