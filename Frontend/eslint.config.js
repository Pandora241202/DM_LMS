export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                MY_CUSTOM_GLOBAL: "readonly"
            }
        }
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                it: "readonly",
                describe: "readonly"
            }
        }
    },
    {
      rules: {
        "no-unused-vars": "warn",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/anchor-is-valid": [
          "error",
          {
            "components": ["Link"],
            "specialLink": ["hrefLeft", "hrefRight"],
            "aspects": ["invalidHref", "preferButton"]
          }
        ]
      }
    }
];