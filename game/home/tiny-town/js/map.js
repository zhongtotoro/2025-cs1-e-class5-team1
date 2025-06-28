// ■■■ 1. 定数・マップデータ ■■■

// カラム数、行数（CSS の --cols, --rows と合わせてください）
const COLS = 20;
const ROWS = 12;

// groundLayer[y][x] にタイルID (0=grass,1=dirt,2=stone,3=path …) をセット
// ここでは例として
//   ・ほぼ全部 grass(0)
//   ・真ん中 y=7 行 (1始まり) に dirt(1) の道を敷き詰め
//   ・ところどころ stone(2) を散らす
const groundLayer = [];
for (let y = 0; y < ROWS; y++) {
  groundLayer[y] = [];
  for (let x = 0; x < COLS; x++) {
    if (y === 6 && x >= 2 && x <= 17) {
      groundLayer[y][x] = 1; // dirt
    } else if ((x + y) % 7 === 0) {
      groundLayer[y][x] = 2; // stone
    } else {
      groundLayer[y][x] = 0; // grass
    }
  }
}
// タイルID を CSS クラス名にマッピング
const groundNames = ["grass", "dirt", "stone", "path"];

// objects 配列に、オブジェクト要素の {className, col, row} を push
// col, row は Grid 上の開始セル番号 (1始まり)
const objects = [];
objects.push({ className: "house-red",  col: 4,  row: 3 });  // 赤屋根家(2×2)
objects.push({ className: "house-blue", col: 11, row: 2 });  // 青屋根家(2×2)
objects.push({ className: "castle",     col: 14, row: 6 });  // 城(4×4)
objects.push({ className: "tree",       col: 3,  row: 5 });  // 木(1×2)
objects.push({ className: "tree",       col: 16, row: 4 });  // 木(1×2)
objects.push({ className: "fence",      col: 18, row: 8 });  // フェンス(2×1)
objects.push({ className: "character",  col: 6,  row: 7 });  // キャラ(1×1)


// ■■■ 2. 描画スタート ■■■
window.addEventListener("DOMContentLoaded", () => {
  const mapEl = document.querySelector(".map");
  mapEl.innerHTML = "";  // 念のためクリア

  // (1) 地面タイルを先に敷き詰める
  for (let y = 1; y <= ROWS; y++) {
    for (let x = 1; x <= COLS; x++) {
      const tileId = groundLayer[y - 1][x - 1];
      const div = document.createElement("div");
      div.classList.add("tile", groundNames[tileId]);
      // Grid 上の配置 (grid-column, grid-row) は 1 始まり
      div.style.gridColumn = `${x}`;
      div.style.gridRow    = `${y}`;
      mapEl.appendChild(div);
    }
  }

  // (2) オブジェクトを上に重ねる
  objects.forEach(o => {
    const div = document.createElement("div");
    // tile: 共通スタイル, object: 多マス対応, className: 個別スタイル
    div.classList.add("tile", "object", o.className);
    // 開始セルと span を指定 (CSS の .house-red 等で span を定義済み)
    div.style.gridColumn = `${o.col} / span ${getSpan(o.className)[0]}`;
    div.style.gridRow    = `${o.row} / span ${getSpan(o.className)[1]}`;
    mapEl.appendChild(div);
  });
});


// ■■■ 3. getSpan ヘルパー ■■■
// className ごとの幅・高さをマス数で返す
function getSpan(name) {
  switch (name) {
    case "house-red":  
    case "house-blue": return [2, 2];
    case "castle":     return [4, 4];
    case "tree":       return [1, 2];
    case "fence":      return [2, 1];
    case "character":  return [1, 1];
    default:           return [1, 1];
  }
}