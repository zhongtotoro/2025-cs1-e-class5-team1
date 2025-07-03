window.addEventListener('load', () => {
  const startScreen = document.getElementById('start-screen');
  const genreScreen = document.getElementById('genre-screen');

  // 3秒後にスタート画面からジャンル選択画面へ切り替え
  setTimeout(() => {
    startScreen.classList.add('hidden');
    genreScreen.classList.remove('hidden');
  }, 3000);

  // カードクリックで指定ページへ遷移
  document.querySelectorAll('.card').forEach(card => {
    const target = card.dataset.target;
    if (target) {
      card.addEventListener('click', () => {
        window.location.href = target;
      });
    }
  });
});
