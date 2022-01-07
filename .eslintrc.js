module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 2018,
        project: './tsconfig.json'
    },
    rules: {
        'prettier/prettier': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off',
        'prefer-const': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'off'
    }
};
