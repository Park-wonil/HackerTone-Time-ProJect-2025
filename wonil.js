// 낭비 시간에 따라 앨리스 크기 결정
fetch('http://localhost:3000/log') // 나중에 이걸 GET으로 만들면 더 좋음
  .then((response) => response.json())
  .then((data) => {
    const wastedTime = data.total ?? 0;
    const aliceSize = 1 - wastedTime * 0.01; // 낭비 100분이면 0 크기
    const size = Math.max(aliceSize, 0.3); // 최소 크기 제한
    document.getElementById('alice').style.transform = `scale(${size})`;

    const status = document.getElementById('status');
    if (size <= 0.4) {
      status.textContent = '🥲 앨리스가 너무 작아졌어요...';
    } else {
      status.textContent = `현재 낭비한 시간: ${wastedTime}분`;
    }
  })
  .catch((err) => {
    console.error('서버 연결 실패:', err);
  });
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      document.querySelector('.door-container').classList.add('door-open');
    }, 500);
  });
