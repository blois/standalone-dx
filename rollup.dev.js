import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import builtins from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';


export default {
  input: './src/index.ts',
  plugins: [
    json({
      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true,
      // ignores indent and generates the smallest code
      compact: true,
    }),
    postcss({
      plugins: []
    }),
    replace({
      // React: default to node.js production environment.
      'process.env.NODE_ENV': JSON.stringify('production'),
      // @blueprintjs
      'process.env.BLUEPRINT_NAMESPACE': JSON.stringify('bp3'),
      // uniqid tries to use process if it's available.
      'process && process.pid': 'false',
    }),
    builtins(),
    resolve({
      main: true,
      browser: true,
      // styled-components' ES6 module doesn't work here-
      // specifically appears to be an issue with using both
      // default and named exports?
      jsnext: false,
      module: false,
    }),
    commonjs({
      extensions: ['.js', '.ts'],
      include: [ "./index.js", "node_modules/**" ],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'cloneElement',
          'Component',
          'createContext',
          'createElement',
          'createFactory',
          'createRef',
          'Fragment',
          'isValidElement',
          'isValidElementType',
          'PropTypes',
          'PureComponent',
          'StrictMode',
        ],
        'node_modules/react-dom/index.js': [
          'createPortal',
          'findDOMNode',
          'hydrate',
          'render',
          'unmountComponentAtNode',
          'unstable_renderSubtreeIntoContainer',
        ],
        'node_modules/react-is/index.js': [
          'ForwardRef',
          'isElement',
          'isValidElementType',
        ],
      },
    }),
    typescript({
      tsconfig: "src/tsconfig.json",
    }),
  ],
  output: {
    file: 'dist/dx.dev.js',
    format: 'esm'
  }
}
