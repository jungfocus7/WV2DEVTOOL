import { defineConfig } from "vite";


export default defineConfig({
    build: {
        // 빌드 출력 위치
        outDir: 'dist',

        // 라이브러리 모드 활성화 (번들링 전용)
        lib: {
            // 💡 번들링을 시작할 진입점 파일 지정
            entry: './tapps/tapp_a.html',

            // 최종 번들 파일의 이름 지정
            name: 'tapps',

            // 출력 파일 형식 지정 (UMD와 ESM 모두 권장)
            formats: ['es', 'umd'],

            // 출력 파일 이름 패턴 정의
            fileName: (format) => `tapps.${format}.js`,
        },

        // Minify 설정
        // 기본적으로 'esbuild'를 사용하여 매우 빠르게 Minify됩니다.
        minify: 'esbuild',
    }

});