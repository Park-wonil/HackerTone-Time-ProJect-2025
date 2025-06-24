
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
  const userData = JSON.stringify({ pw, nickname, birth });
  localStorage.setItem('user_' + id, userData);
  alert('회원가입이 완료되었습니다!');
  showLogin();
}
