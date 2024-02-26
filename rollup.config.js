import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import clear from 'rollup-plugin-clear'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const pkg = require('./package.json')
const year = new Date().getFullYear()
const banner = `/* ${pkg.name} v${pkg.version} C@ ${year} ${pkg.author} */`

const globals = {
  react: 'React',
  'react-dom': 'ReactDom',
}
const plugins = () => [
  peerDepsExternal(),
  clear({
    targets: ['dist'],
    watch: true,
  }),
  babel({
    babelHelpers: 'bundled',
    presets: ['@babel/env', '@babel/preset-react'],
  }),
  nodeResolve(),
  commonjs(),
  json(),
  typescript()
]

export default [
  {
    input: 'src/index.ts',
    plugins: plugins(true),
    external: Object.keys(globals),
    output: [
      {
        globals,
        banner,
        dir: 'dist/esm',
        format: 'esm',
      },
      {
        globals,
        banner,
        dir: 'dist/cjs',
        format: 'cjs',
      },
      {
        globals,
        dir: 'dist/umd',
        format: 'umd',
        name: 'DS',
        plugins: [
          terser({
            output: {
              preamble: banner,
            },
          }),
        ],
      },
    ],
  },
  {
    input: `src/index.ts`,
    output: [
      {
        file: 'dist/dynamic-module-federation.d.ts',
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
]
