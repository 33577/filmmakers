module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/react",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["prettier", "react", "@typescript-eslint"],
    rules: {
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        "no-use-before-define": "off",

        // react
        "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
        "react/jsx-props-no-spreading": "off",

        // typescript-eslint
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],

        // prettier
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
        "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx"] } },
    },
};
