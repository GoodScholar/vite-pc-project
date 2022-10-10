module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    // 新增这里vue3支持
    'plugin:vue/vue3-recommended',
  ],
  // 这是初始生成的 将其中的内容更改为下面的
  // parserOptions: {
  //   ecmaVersion: 'latest',
  //   sourceType: 'module'
  // },

  // 新的内容
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser',
  },
  plugins: ['vue'],
  rules: {
    semi: 'off', // 禁止尾部使用分号
    quotes: 'off', // 使用单引号
    indent: 0, // 缩进2格,
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'space-before-function-paren': 0,
    'comma-dangle': 'off',
    'vue/html-closing-bracket-newline': 'off', // 不强制换行
    'vue/singleline-html-element-content-newline': 'off', // 不强制换行
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 5 },
        multiline: { max: 5 },
      },
    ],
  },
}
