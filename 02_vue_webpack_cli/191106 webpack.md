# 191106 webpack

- 모든 프로젝트는 webpack을 통해 node js로 진행함

```bash
# 1. nodeJS project 시작
$ npm init

# 설정  -  대부분 enter쳐도 된다
Press ^C at any time to quit.
package name: (02_vue_webpack_cli)
version: (1.0.0)
description: webpack으로 vue설정해보기
entry point: (index.js)
test command:
git repository:
keywords:
author: sungwon
license: (ISC)
About to write to C:\Users\student\0_developement\vueJS\02_vue_webpack_cli\package.json:

{
  "name": "02_vue_webpack_cli",
  "version": "1.0.0",
  "description": "webpack으로 vue설정해보기",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "sungwon",
  "license": "ISC"
}


Is this OK? (yes)

# 2. vue 설치
$ npm install vue
# node_modules라는 vue파일이 생김 -> gitignore에 등록

# 3. webpack 설치
# -D : 개발환경에서만 사용하겠다는 옵션
# webpack은 개발자의 편의성을 위한 tool이기 때문에
$ npm i -D webpack webpack-cli  (install 축약 === i)
 
# 4. webpack 설정 파일 생성
$ touch webpack.config.js 

# 5. webpack은 js파일만 변환가능하기때문에, vue 파일 및 complate를 webpack이 변환할 수 있도록 도와주는 툴
$ npm install -D vue-loader vue-template-compiler
```

```javascript
// webpack.config.js 파일에서 세팅
const VueloaderPlugin = require('vue-loader/lib/plugin')

// webpack이 vue를 해석할 수 있도록 plugin 장착
plugins: [
    new VueloaderPlugin(),
  ],
```

