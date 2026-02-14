document.addEventListener('DOMContentLoaded', function() {
  const scene = document.getElementById('sceneContainer');
  const card = document.getElementById('cardElement');
  const front = document.getElementById('frontFace');
  const back = document.getElementById('backFace');

  let isFlipped = false; // 카드 현재 상태를 추적하는 변수

  // 1. 레이아웃 및 3D 환경 설정
  const size = '100px';

  // Scene (외부 컨테이너)
  scene.style.width = size;
  scene.style.height = size;
  scene.style.perspective = '300px'; // 3D 원근법 설정

  // Card (뒤집힐 요소)
  card.style.width = '100%';
  card.style.height = '100%';
  card.style.position = 'relative';
  card.style.transition = 'transform 0.75s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // 애니메이션 시간
  card.style.transformStyle = 'preserve-3d'; // 자식 요소 3D 유지

  // Faces (앞/뒷면 공통)
  const fn_faceStyle = (el) => {
    let st = el.style;
    st.position = 'absolute';
    st.width = '100%';
    st.height = '100%';
    st.textAlign = 'center';
    st.lineHeight = size;
    st.fontSize = '20px';
    st.color = 'white';
    st.borderRadius = '5px';
    st.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    st.backfaceVisibility = 'hidden'; // 뒷면 숨김
  };

  fn_faceStyle(front);
  fn_faceStyle(back);

  // Front Face
  front.style.backgroundColor = '#3498db';

  // Back Face
  back.style.backgroundColor = '#e74c3c';
  back.style.transform = 'rotateY(180deg)'; // 초기 상태: 180도 회전시켜 뒤집어 놓음

  // 2. 카드 뒤집기 로직
  scene.addEventListener('click', () => {
    if (isFlipped) {
      // 카드를 다시 앞면으로 돌림
      card.style.transform = 'rotateY(0deg)';
    } else {
      // 카드를 뒷면으로 뒤집음
      card.style.transform = 'rotateY(180deg)';
    }
    isFlipped = !isFlipped; // 상태 토글
  });
});