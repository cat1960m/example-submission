1.  create react project

    > npm create vite@latest <name> -- --template react
    > npm install
    > npm install axios
    > npm run dev

2.  Eslint

    > npm run lint

3.  Testing frontend

    > npm install --save-dev vitest jsdom
    > npm install --save-dev @testing-library/react @testing-library/jest-dom
    > npm install --save-dev @testing-library/user-event

    >npm init playwright@latest

    a) package.json:

    ***

            {
            "scripts": {
                // ...
                "test": "vitest run"
            }
            // ...
            }

        b) testSetup.js:
        ------------------

            import { afterEach } from 'vitest'
            import { cleanup } from '@testing-library/react'
            import '@testing-library/jest-dom/vitest'

            afterEach(() => {
                cleanup()
            })

        c) vite.config.js:
        -------------------

            export default defineConfig({
                // ...
                test: {
                    environment: 'jsdom',
                    globals: true,
                    setupFiles: './testSetup.js',
                }
            })

        d) eslint.config.js
        ---------------------

            export default [
            // ...
            {
                files: ['**/*.test.{js,jsx}'],
                languageOptions: {
                    globals: {
                        ...globals.vitest
                    }
                }
            }
            ]

4) testing playwright  
===================
 > npm init playwright@latest  
 >   npm test -- --project chromium   
 > npm test -- --ui  
      (to click)
