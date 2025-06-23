
function fadeOut(element, callback) {
  element.style.opacity = 1;
  let last = +new Date();
  const tick = function () {
    element.style.opacity = +element.style.opacity - (new Date() - last) / 500;
    last = +new Date();
    if (+element.style.opacity > 0) {
      requestAnimationFrame(tick);
    } else {
      element.style.display = "none";
      callback();
    }
  };
  tick();
}

function fadeIn(element) {
  element.style.opacity = 0;
  element.classList.remove("hidden");
  let last = +new Date();
  const tick = function () {
    element.style.opacity = +element.style.opacity + (new Date() - last) / 500;
    last = +new Date();
    if (+element.style.opacity < 1) {
      requestAnimationFrame(tick);
    }
  };
  tick();
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
    return;
  }

  const stored = localStorage.getItem(username);
  if (!stored || JSON.parse(stored) !== password) {
    alert("계정이 존재하지 않거나 비밀번호가 일치하지 않습니다.");
    return;
  }

  const loginBox = document.getElementById("login-container");
  fadeOut(loginBox, () => {
    const videoContainer = document.getElementById("video-container");
    fadeIn(videoContainer);
    const video = document.getElementById("intro-video");
    video.play();
    video.onended = () => {
      fadeOut(videoContainer, () => {
        const main = document.getElementById("main-content");
        fadeIn(main);
      });
    };
  });
}

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) {
    alert("아이디와 비밀번호를 입력해주세요.");
    return;
  }

  if (localStorage.getItem(username)) {
    alert("이미 존재하는 아이디입니다.");
    return;
  }

  localStorage.setItem(username, JSON.stringify(password));
  alert("회원가입이 완료되었습니다! 이제 로그인해주세요.");
}
