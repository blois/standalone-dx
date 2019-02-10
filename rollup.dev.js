import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import amd from 'rollup-plugin-amd';
import postcss from 'rollup-plugin-postcss';
import embedCSS from 'rollup-plugin-embed-css';
import builtins from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';


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
    // {
    //   transform ( code, id ) {
    //     console.log( id );
    //     if (id.includes('react-table.css')) {
    //       console.log(code);
    //     }
    //   }
    // },
    // 
    postcss({
      plugins: []
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BLUEPRINT_NAMESPACE': JSON.stringify('bp3'),
    }),
    builtins(),
    resolve({
      jsnext: false,
      main: true,
      browser: true,
      module: false,
    }),
    // embedCSS(),
    // amd(),
    commonjs({
      extensions: ['.js', '.ts'],
      include: [ "./index.js", "node_modules/**" ],
      namedExports: {
        'node_modules/styled-components/index.js': [
          'css',
        ],
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PureComponent',
          'PropTypes',
          'createElement',
          'Fragment',
          'cloneElement',
          'StrictMode',
          'createFactory',
          'createRef',
          'createContext',
          'isValidElement',
          'isValidElementType',
        ],
        'node_modules/react-dom/index.js': [
          'render',
          'hydrate',
          'findDOMNode',
          'unmountComponentAtNode',
          'unstable_renderSubtreeIntoContainer',
          'createPortal',
        ],
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef',
        ],
      },
    }),
    typescript({
      tsconfig: "src/tsconfig.json",
      objectHashIgnoreUnknownHack: true,
    }),
  ],
  output: {
    file: 'dist/dx.dev.js',
    format: 'esm'
  }
}
