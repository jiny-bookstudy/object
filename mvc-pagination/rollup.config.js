import html2 from 'rollup-plugin-html2';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy-assets';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/app.js',
  output: {
    dir: 'rollup',
    entryFileNames: 'bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    html2({
      template: './src/assets/index.html'
    }),
    postcss({
      extensions: ['.css']
    }),
    copy({
      assets: ['src/constants']
    }),
    serve({
      open: true,
      openPage: '/rollup/index.html',
      port: 9000,
      contentBase: ['rollup', '.']
    })
  ]
};
