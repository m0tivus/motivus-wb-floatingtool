module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es6': true
    },
    'extends': [
        'eslint:recommended',
        'react-app',
     ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'prettier',
        'react',
    ],
    'rules': {
        'prettier/prettier': 'error',
        'indent': [
            'error',
            2,
            { "SwitchCase": 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'max-len': [
            'error', {
                'code': 80,
            }
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-unused-vars': [
            'warn'
        ],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-multi-spaces': 'error',
        'comma-dangle': [
            'error',
            'always-multiline'
         ],
    }
}
