import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
// import esbuild from 'rollup-plugin-esbuild';


export default {
	input: './hbjs/bundling.mjs',

	// 1)
	output: [
		// a)
		{
			file: 'dist/hfall.js',
			format: 'es',
			sourcemap: true,
		},
		// b)
		{
			file: 'dist/hfall.min.js',
			format: 'es',
			sourcemap: true,
			plugins: [
				terser({
					compress: {
						drop_console: true,
					},
					mangle: false,
				}),
				// esbuild({
				// 	minify: true,
				// 	target: 'esnext',
				// }),
			],
		},
	],


	// 2)
	plugins: [
		resolve(),
		commonjs(),
		// terser({
		// 	compress: {
		// 		drop_console: true,
		// 	}
		// }),
	],

};