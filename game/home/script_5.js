window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isBack = urlParams.get('from') === 'back';

  const startScreen = document.getElementById('start-screen');
  const genreScreen = document.getElementById('genre-screen');

  if (!isBack) {
    // 外部アクセス時のみアニメーション実行
    setTimeout(() => {
      startScreen.classList.add('hidden');
      genreScreen.classList.remove('hidden');
    }, 3000);
  } else {
    // 戻りアクセスならすぐジャンル画面を表示
    startScreen.classList.add('hidden');
    genreScreen.classList.remove('hidden');
  }

  // ジャンルクリックでリンク先へ飛ぶ
  document.querySelectorAll('.card').forEach(card => {
    const target = card.dataset.target;
    if (target) {
      card.addEventListener('click', () => {
        window.location.href = target;
      });
    }
  });
});
