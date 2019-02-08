import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import amd from 'rollup-plugin-amd';

export default {
  input: './src/index.ts',
  plugins: [
    json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      include: 'node_modules/**',

      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false

      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  ',

      // ignores indent and generates the smallest code
      compact: true, // Default: false

      // generate a named export for every property of the JSON object
      namedExports: true // Default: true
    }),
    typescript(),
    amd(),
    commonjs({
      extensions: ['.js', '.ts'],
      include: [ "./index.js", "node_modules/**" ],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
  ],
  output: {
    file: 'dist/controls.js',
    format: 'cjs'
  }
}
