
const fade = () => {
    const fader = document.getElementById("fade");
    fader.classList.remove("hidden");
    return new Promise(resolve => {
        setTimeout(() => {
            fader.classList.add("hidden");
            resolve();
        }, 1000);
    });
};

const login = async () => {
    await fade();
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");

    const video = document.getElementById("introVideo");
    video.play();
    video.onended = async () => {
        await fade();
        document.getElementById("video-container").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
    };
};

const register = () => {
    alert("회원가입이 완료되었습니다. 이제 로그인해주세요.");
};
