1. PART9 chapter1
   > npm init
   > npm install --save-dev ts-node typescript
   > npm run ts-node -- <filename>

express
---

> npm install express
> npm install --save-dev @types/express

eslint
---

npm install --save-dev eslint @eslint/js @types/eslint\_\_js typescript typescript-eslint

express + typescript
---

> npm init
> npm install typescript --save-dev
> npm run tsc -- --init
> npm install express
> npm install --save-dev eslint @eslint/js typescript-eslint @stylistic/eslint-plugin @types/express @types/eslint\_\_js

>npm install --save-dev ts-node-dev


to check is all compiled (additionally)
---------------------------------------

>npm run tsc
>npm run lint

zod
----
>npm install zod


vite with typescript
----------------------
>npm create vite@latest my-app-name -- --template react-ts

Material UI
----------------
>npm install @mui/material @emotion/react @emotion/styled
>npm install @mui/icons-material.   (icons)
>npm install @mui/x-date-pickers date-fns (date-picker)


typescript utilities
---------------------
type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;

type UnionOmit<T, K extends keyof any> = T extends unknown ? Omit<T, K> : never;
type UnionAdd<T, K extends keyof any, V> = T extends unknown ? T & { [P in K]: V } : never;

type EntryWithoutId = UnionOmit<Entry, "id">;
type EntryWithId = UnionAdd<EntryWithoutId, "id", string>;