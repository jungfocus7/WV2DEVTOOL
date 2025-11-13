// 게임 설정
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;
const PREVIEW_BLOCK_SIZE = 20;
const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];
let score = 0;
let level = 1;
let lines = 0;
let gameLoop;
let currentSpeed = 1000; // 초기 속도 (밀리초)

// 게임 상태
let board = Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));
let currentPiece = null;
let currentX = 0;
let currentY = 0;
let nextPieces = [];

// SVG 요소 설정
const svg = document.getElementById('tetris-board');
svg.setAttribute('width', BLOCK_SIZE * BOARD_WIDTH);
svg.setAttribute('height', BLOCK_SIZE * BOARD_HEIGHT);

// 테트로미노 모양 정의
const TETROMINOES = [
    { shape: [[1, 1, 1, 1]], color: 0 },         // I
    { shape: [[1, 1], [1, 1]], color: 1 },       // O
    { shape: [[0, 1, 0], [1, 1, 1]], color: 2 }, // T
    { shape: [[1, 1, 0], [0, 1, 1]], color: 3 }, // S
    { shape: [[0, 1, 1], [1, 1, 0]], color: 4 }, // Z
    { shape: [[1, 0, 0], [1, 1, 1]], color: 5 }, // L
    { shape: [[0, 0, 1], [1, 1, 1]], color: 6 }  // J
];

// 다음 블록 생성
function generateNextPiece() {
    const randomIndex = Math.floor(Math.random() * TETROMINOES.length);
    return { ...TETROMINOES[randomIndex] };
}

// 다음 블록 미리보기 그리기
function drawPreview(pieceIndex, previewId) {
    const svg = document.getElementById(previewId);
    svg.innerHTML = '';

    if (!nextPieces[pieceIndex]) return;

    const piece = nextPieces[pieceIndex];
    const shape = piece.shape;

    // 블록 크기 계산
    const maxWidth = shape[0].length * PREVIEW_BLOCK_SIZE;
    const maxHeight = shape.length * PREVIEW_BLOCK_SIZE;

    // 중앙 정렬을 위한 오프셋 계산
    const offsetX = (120 - maxWidth) / 2;
    const offsetY = (120 - maxHeight) / 2;

    // 블록 그리기
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', offsetX + x * PREVIEW_BLOCK_SIZE);
                rect.setAttribute('y', offsetY + y * PREVIEW_BLOCK_SIZE);
                rect.setAttribute('width', PREVIEW_BLOCK_SIZE);
                rect.setAttribute('height', PREVIEW_BLOCK_SIZE);
                rect.setAttribute('fill', COLORS[piece.color]);
                rect.setAttribute('stroke', '#000');
                rect.setAttribute('stroke-width', '1');
                svg.appendChild(rect);
            }
        }
    }
}

// 모든 미리보기 업데이트
function updatePreviews() {
    drawPreview(0, 'preview-1');
    drawPreview(1, 'preview-2');
    drawPreview(2, 'preview-3');
}

// 게임 초기화
function init() {
    // 게임 상태 초기화
    board = Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));
    score = 0;
    level = 1;
    lines = 0;
    currentSpeed = 1000;
    nextPieces = [
        generateNextPiece(),
        generateNextPiece(),
        generateNextPiece()
    ];
    updateScore();
    createNewPiece();
    updatePreviews();

    // 이전 게임 루프 중지
    if (gameLoop) clearInterval(gameLoop);

    // 새 게임 루프 시작
    gameLoop = setInterval(moveDown, currentSpeed);

    // 키보드 이벤트 리스너 추가
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
}

// 새로운 조각 생성
function createNewPiece() {
    // 다음 블록 큐에서 첫 번째 블록을 가져옴
    currentPiece = nextPieces.shift();
    // 새로운 블록을 큐에 추가
    nextPieces.push(generateNextPiece());

    currentX = Math.floor(BOARD_WIDTH / 2) - Math.floor(currentPiece.shape[0].length / 2);
    currentY = 0;

    // 미리보기 업데이트
    updatePreviews();

    if (!isValidMove(currentX, currentY)) {
        // 게임 오버
        clearInterval(gameLoop);
        alert(`게임 오버!\n최종 점수: ${score}\n도달 레벨: ${level}`);
        init();
        return false;
    }
    return true;
}

// 조각 회전
function rotatePiece() {
    const newShape = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
    );

    const previousShape = currentPiece.shape;
    currentPiece.shape = newShape;

    if (!isValidMove(currentX, currentY)) {
        currentPiece.shape = previousShape;
    } else {
        drawGame();
    }
}

// 이동 유효성 검사
function isValidMove(newX, newY) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                const boardX = newX + x;
                const boardY = newY + y;

                if (boardX < 0 || boardX >= BOARD_WIDTH ||
                    boardY >= BOARD_HEIGHT ||
                    (boardY >= 0 && board[boardY][boardX])) {
                    return false;
                }
            }
        }
    }
    return true;
}

// 조각 고정
function freezePiece() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                const boardY = currentY + y;
                if (boardY >= 0) {
                    board[boardY][currentX + x] = currentPiece.color + 1;
                }
            }
        }
    }
    checkLines();
    if (!createNewPiece()) return false;
    return true;
}

// 라인 체크 및 제거
function checkLines() {
    let linesCleared = 0;
    let newBoard = [];

    // 아래에서부터 각 줄 확인
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        const row = board[y];
        const isLineFull = row.every(cell => cell !== 0);

        if (!isLineFull) {
            // 완성되지 않은 줄은 새 보드에 추가
            newBoard.unshift([...row]);
        } else {
            linesCleared++;
            lines++;
        }
    }

    // 빈 줄로 나머지 공간 채우기
    while (newBoard.length < BOARD_HEIGHT) {
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    // 새 보드로 교체
    board = newBoard;

    if (linesCleared > 0) {
        // 점수 계산 (콤보 보너스 추가)
        const comboBonus = linesCleared > 1 ? linesCleared * 50 : 0;
        score += (linesCleared * 100 + comboBonus) * level;

        // 레벨 업데이트
        const newLevel = Math.min(10, Math.floor(lines / 10) + 1);
        if (newLevel !== level) {
            level = newLevel;
            currentSpeed = Math.max(100, 1000 - ((level - 1) * 100));
            clearInterval(gameLoop);
            gameLoop = setInterval(moveDown, currentSpeed);
        }

        updateScore();
        drawGame(); // 변경된 보드 즉시 그리기
    }
}

// 점수 업데이트
function updateScore() {
    document.getElementById('score').textContent = `점수: ${score}`;
    document.getElementById('level').textContent = `레벨: ${level}`;
    document.getElementById('lines').textContent = `제거한 줄: ${lines}`;
}

// 게임 그리기
function drawGame() {
    svg.innerHTML = '';

    // 보드에 있는 블록 그리기
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (board[y][x]) {
                drawBlock(x, y, COLORS[board[y][x] - 1]);
            }
        }
    }

    // 현재 떨어지는 조각 그리기
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                const boardY = currentY + y;
                if (boardY >= 0) {
                    drawBlock(currentX + x, currentY + y, COLORS[currentPiece.color]);
                }
            }
        }
    }
}

// 블록 그리기
function drawBlock(x, y, color) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x * BLOCK_SIZE);
    rect.setAttribute('y', y * BLOCK_SIZE);
    rect.setAttribute('width', BLOCK_SIZE);
    rect.setAttribute('height', BLOCK_SIZE);
    rect.setAttribute('fill', color);
    rect.setAttribute('stroke', '#000');
    rect.setAttribute('stroke-width', '1');
    svg.appendChild(rect);
}

// 키보드 입력 처리
function handleKeyPress(event) {
    switch(event.keyCode) {
        case 37: // 왼쪽 화살표
            if (isValidMove(currentX - 1, currentY)) {
                currentX--;
                drawGame();
            }
            break;
        case 39: // 오른쪽 화살표
            if (isValidMove(currentX + 1, currentY)) {
                currentX++;
                drawGame();
            }
            break;
        case 40: // 아래쪽 화살표
            moveDown();
            break;
        case 38: // 위쪽 화살표
            rotatePiece();
            break;
        case 32: // 스페이스바 (하드 드롭)
            hardDrop();
            break;
    }
}

// 블록 아래로 이동
function moveDown() {
    if (isValidMove(currentX, currentY + 1)) {
        currentY++;
        drawGame();
    } else {
        freezePiece();
    }
}

// 하드 드롭
function hardDrop() {
    while (isValidMove(currentX, currentY + 1)) {
        currentY++;
    }
    freezePiece();
    drawGame();
}

// 게임 시작
window.onload = () => {
    init();
};