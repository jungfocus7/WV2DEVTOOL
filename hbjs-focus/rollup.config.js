import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
// import esbuild from 'rollup-plugin-esbuild';


export default {
	input: './hbjs/bundling.mjs',

	// 1)
	output: [
		// a)
		{
			file: 'dist/hfall.js',
			format: 'esm',
			sourcemap: true,
		},
		// b)
		{
			file: 'dist/hfall.min.js',
			format: 'esm',
			sourcemap: true,
			plugins: [
				terser({
					compress: {
						drop_console: true,
					},
					mangle: false,
				}),
				/*esbuild({
					// 👈 isProduction이 true일 때만 esbuild가 코드를 압축(Minify)합니다.
					minify: true,
					target: 'esnext',
				}),*/
			],
		},
	],


	// 2)
	plugins: [
		resolve(),
		//commonjs(),
		/*
		terser({
			compress: {
				drop_console: true,
			}
		}),*/
	],

};