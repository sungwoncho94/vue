const VueLoaderPlugin = require('vue-loader/lib/plugin')  // module.exports랑 한세트!, 여기에서만 사용!
const path = require('path')


// nodejs에서는 module에서 특정 값을 export 하기 위해서는 아래와 같이
// module.exports에 export할 값들을 정의한다.
module.exports = {
  mode: 'development',  // 상업용은 production
  // entry: 모든 파일들의 시작점
  entry: {
    // __dirname: 현재 directory의 이름 -> 최상위 위치(ex. Django의 BASE_DIR느낌)
    app: path.join(__dirname, 'src', 'main.js')  
  },
  // module: webpack은 기본적으로 js만 변환 가능
  //         따라서 css나 html 등은 모듈을 통해서 webpack이 이해할 수 있도록 변환이 필요
  //         변환 내용을 작성하는 곳
  module: {
    rules: [
      {
        test: /\.vue$/,  // 정규표현식 작성할 수 있게 함.
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  // plugins: webpack을 통해서 번들된 결과를 추가 처리하는 부분
  plugins: [  // array형식으로 작성
    new VueLoaderPlugin(), // vue를 인식할 수 있도록 장착시킴
  ],
  // output: webpack을 통해서 번들된 결과물이 정의되는 곳
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
}

// 이곳에 작성한 후, 다른 곳에서 불러온다면 여기에 있는 모듈을 사용할 수 있음.
