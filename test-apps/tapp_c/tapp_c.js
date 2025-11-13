class VirtualDataGrid {
    constructor() {
        this.data = [];
        this.rowHeight = 40;
        this.visibleRows = 0;
        this.startIndex = 0;
        this.bufferSize = 5; // 위아래 추가로 렌더링할 행 수
        this.isScrolling = false;
        this.scrollTimeout = null;

        this.gridContent = document.getElementById('gridContent');
        this.viewport = document.getElementById('gridViewport');
        this.stats = document.getElementById('stats');
        this.scrollThumb = document.querySelector('.scroll-thumb');

        // 이벤트 리스너 설정
        this.setupEventListeners();
        this.calculateVisibleRows();

        // 스크롤바 드래그 관련 상태
        this.isDragging = false;
        this.startY = 0;
        this.scrollTop = 0;

        this.cntNum = 0;
    }

    setupEventListeners() {
        // 스크롤 이벤트
        this.gridContent.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());

        // 데이터 조작 버튼
        document.getElementById('addRows').addEventListener('click', () => this.addRandomRows(10000));
        document.getElementById('clearGrid').addEventListener('click', () => this.clearGrid());

        // 스크롤바 드래그 이벤트
        this.scrollThumb.addEventListener('mousedown', (e) => this.startDragging(e));
        document.addEventListener('mousemove', (e) => this.handleDrag(e));
        document.addEventListener('mouseup', () => this.stopDragging());
    }

    startDragging(e) {
        this.isDragging = true;
        this.startY = e.clientY - this.scrollThumb.offsetTop;
        this.scrollThumb.style.transition = 'none';
    }

    handleDrag(e) {
        if (!this.isDragging) return;

        const containerHeight = this.gridContent.clientHeight;
        console.log('>>> ' + this.gridContent.clientHeight);
        // this.gridContent.clientHeight = 100000000
        console.log('>>> ' + this.gridContent.clientHeight);

        const scrollbarHeight = containerHeight - 40; // 헤더 높이 제외
        const thumbHeight = this.scrollThumb.offsetHeight;

        let newTop = e.clientY - this.startY;
        newTop = Math.max(0, Math.min(newTop, scrollbarHeight - thumbHeight));

        const scrollRatio = newTop / (scrollbarHeight - thumbHeight);
        const maxScroll = this.data.length * this.rowHeight - containerHeight;

        this.gridContent.scrollTop = maxScroll * scrollRatio;
    }

    stopDragging() {
        this.isDragging = false;
        this.scrollThumb.style.transition = 'background-color 0.2s';
    }

    calculateVisibleRows() {
        const containerHeight = this.gridContent.clientHeight;
        this.visibleRows = Math.ceil(containerHeight / this.rowHeight);
        this.updateScrollThumb();
    }

    updateScrollThumb() {
        const containerHeight = this.gridContent.clientHeight;
        const totalHeight = this.data.length * this.rowHeight;
        const thumbHeight = Math.max(30, (containerHeight / totalHeight) * containerHeight);
        const scrollRatio = this.gridContent.scrollTop / (totalHeight - containerHeight);
        const maxTop = containerHeight - thumbHeight - 40; // 헤더 높이 제외

        this.scrollThumb.style.height = thumbHeight + 'px';
        this.scrollThumb.style.top = (scrollRatio * maxTop) + 'px';
    }

    handleScroll() {
        if (this.isScrolling) {
            clearTimeout(this.scrollTimeout);
        }

        // console.log('>>> ' + this.gridContent.clientHeight);
        // this.gridContent.clientHeight = 100000000
        // console.log('>>> ' + this.gridContent.clientHeight);

        this.isScrolling = true;
        this.updateScrollThumb();

        const newStart = Math.floor(this.gridContent.scrollTop / this.rowHeight);
        if (newStart !== this.startIndex) {
            this.startIndex = newStart;
            this.renderRows();
        }

        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 150);
    }

    handleResize() {
        this.calculateVisibleRows();
        this.renderRows();
    }

    renderRows() {
        const start = Math.max(0, this.startIndex - this.bufferSize);
        const end = Math.min(
            this.data.length,
            this.startIndex + this.visibleRows + this.bufferSize
        );
        // console.log(start, end, this.bufferSize);
        // console.log(this.startIndex);


        this.viewport.style.height = (this.data.length * this.rowHeight) + 'px';
        console.log('>>> ' + this.viewport.style.height);

        this.viewport.innerHTML = '';

        for (let i = start; i < end; i++) {
            const row = this.data[i];
            const rowElement = document.createElement('div');
            rowElement.className = 'grid-row';
            rowElement.style.transform = `translateY(${i * this.rowHeight}px)`;
            rowElement.style.position = 'absolute';
            rowElement.style.width = '100%';

            rowElement.innerHTML = `
                <div class="grid-cell">${row.id}</div>
                <div class="grid-cell">${row.name}</div>
                <div class="grid-cell">${row.email}</div>
                <div class="grid-cell">${row.city}</div>
                <div class="grid-cell">${row.score}</div>
            `;

            this.viewport.appendChild(rowElement);
        }

        this.updateStats();
    }

    updateStats() {
        this.stats.textContent = `총 ${this.data.length}행 | 표시 중: ${this.startIndex + 1} - ${Math.min(this.startIndex + this.visibleRows, this.data.length)}`;
    }

    generateRandomData() {
        const names = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
        const cities = ['서울', '부산', '인천', '대구', '대전', '광주', '울산', '수원', '청주', '천안'];

        const name = names[Math.floor(Math.random() * names.length)] +
                    names[Math.floor(Math.random() * names.length)] +
                    names[Math.floor(Math.random() * names.length)];

        const city = cities[Math.floor(Math.random() * cities.length)];
        const id = this.data.length + 1;
        // console.log('>>> ' + id);


        return {
            id: ++this.cntNum,
            name: name,
            email: `user${id}@example.com`,
            city: city,
            score: Math.floor(Math.random() * 100)
        };
    }

    addRandomRows(count) {
        // console.log('>>> ' + count);
        const newData = Array(count).fill(null).map(() => this.generateRandomData());
        this.data = [...this.data, ...newData];
        this.renderRows();
    }

    clearGrid() {
        this.data = [];
        this.startIndex = 0;
        this.renderRows();
    }
}

// 그리드 초기화
window.addEventListener('load', () => {
    window.dataGrid = new VirtualDataGrid();

    // 초기 샘플 데이터 생성 (1000행)
    window.dataGrid.addRandomRows(5000000);

    // 몇 가지 특별한 샘플 데이터 추가
    const specialData = [
        // { id: 'SPECIAL-1', name: '홍길동', email: 'hong@example.com', city: '서울', score: 100 },
        // { id: 'SPECIAL-2', name: '김철수', email: 'kim@example.com', city: '부산', score: 95 },
        // { id: 'SPECIAL-3', name: '이영희', email: 'lee@example.com', city: '인천', score: 98 }
    ];

    // 특별 데이터를 맨 앞에 추가
    window.dataGrid.data.unshift(...specialData);
    window.dataGrid.renderRows();
});
