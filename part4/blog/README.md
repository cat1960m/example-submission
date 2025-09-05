0. 201 -created
   204- no content
   200 -OK
   500 - internal server error
   404 - not found
   400 - incorrect request
   401 - unauthorized

1. test
   > npm install cross-env
   > npm install --save-dev supertest

> npm test -- --test-only
> npm test -- tests/blog_api.test.js
> npm test -- --test-name-pattern="specific blog is returned"

> npm test --test-concurrency=1

2. authentication

> npm install bcrypt
> npm install jsonwebtoken
