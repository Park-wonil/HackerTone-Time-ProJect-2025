// …이전 로그인/영상 전환 로직 생략…

// 목표시간 선택박스 초기화
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
window.addEventListener('DOMContentLoaded', initTimeSelectors);

function setGoalTime() {
  const h = document.getElementById('goal-hour').value;
  const m = document.getElementById('goal-minute').value;
  if (h === '' || m === '') {
    alert('목표 시간을 선택해주세요.');
    return;
  }
  const timeInput = `${h}:${m}`;
  document.getElementById('status').textContent =
    loginMethod === 'google'
      ? `${userName} 님의 목표 시간은 ${timeInput}으로 설정되었습니다.`
      : `${userName}님의 목표 시간은 ${timeInput}으로 설정되었습니다.`;
}

// 설명 토글 처리
document.getElementById('toggle-desc').addEventListener('click', () => {
  const panel = document.getElementById('description-panel');
  panel.classList.toggle('open');
  document.getElementById('toggle-desc').textContent =
    panel.classList.contains('open') ? '설명 닫기' : '설명 보기';
});
