// 외부에 요청을 보내서 그 결과를 출력하는 코드를 작성하고자 한다.
// 1. 몇 초 뒤에 데이터가 응답되면
// 2. 데이터를 변수에 저장하여 출력

// // 어떤 데이터를 반환받고자 하는 함수
// function getData() {
//   // const data = {'data': 'somedata'}
//   let data
  
//   setTimeout(() => {
//     console.log('INFO: 요청을 보냈습니다.')
//     data = {'data': 'somedata'}
//   }, 100);

//   return data
// }
// // 결과
// // $ node promise.js
// // undefined
// // INFO: 요청을 보냈습니다.
// // 0.1초 후 data를 받는다. but Java는 우리를 기다려주지 않고 함수를 실행하기때문에
// // undefined가 뜬 후, 요청을 보냈다는 표시가 뜬다


// function printData() {
//   let responsel = getData()
//   console.log(responsel)
// }

// printData()
// // $ node promise.js
// // { data: 'somedata' }


// // 핵심!! 데이터가 도착하고 난 후에 해야하는 일을 함수로 넘겨준다!!
// // call back함수를 이용하기  ->  함수를 반환할 것
// // return data가 아니라 함수를 반환하는 것!
// function getDataCallback(callback) {
//   setTimeout(() => {  // setTimeout이라는 함수는 데이터가 언제 들어올지 모르기때문에
//     console.log('INFO: 요청을 보냈습니다')
//     const data = {'data': 'somedata'}

//     callback(data)  // 데이터를 받은 시점에 그 데이터를 이 함수에 넣어서 함수를 실행시키라는 명령
//   }, 100);

//   // 데이터가 들어왔을 때 getDataCallback 실행
//   getDataCallback(function(data) {
//     console.log(data)
//   })
// }

// // 정리

// function getDataCallback(callback) {  // 2. callback으로 함수가 넘어옴. callback = 밑에서 선언한 익명함수
//   setTimeout(() => {
//     console.log('INFO: 요청을 보냈습니다')
//     const data = {'data': 'somedata'}

//     callback(data)  // 3. 다 끝나고 callback으로 넘어온 함수를 실행함
//   }, 100);
// }

// // 1. 출력하는 작업을 하는 함수를 인수로 넘김
// getDataCallback(function(data) {
//   console.log(data)
// })

//-----------------------------------------

// // 1. 다짐을 반환한다.
// // 2. 어떤다짐? -> 데이터를 요청한 뒤 어떻게 할꺼야!  // Promise 안쪽의 함수에 표현한다.
// function getDataPromise() {  // axios.get(DATA_URL) === getDataPromise
//  // 새로운 인스턴스를 만든다.
//  return new Promise(resolve => {  // 반환부터 하고 시작!  // 함수 작성 시작
//    setTimeout(() => {
//      console.log('INFO: 요청을 보냈습니다.')
//      const data = {'data': 'somedata'}
//      resolve(data)  // .then으로 꺼낼 수 있는 객체가 된다.
//    }, 100)
//  })
// }
// console.log(getDataPromise())
//  // Promise { <pending> }
//  // INFO: 요청을 보냈습니다.
// getDataPromise()
//  .then(response => {
//    console.log(data)
//    console.log(1)
//  })
//  .then(() => {
//    console.log(2)
//  })
//  .then(() => {
//    console.log(3)
//  })
//  // catch 는 가장 마지막에 하나만 있으면 된다.
//  // 위에 함수 중 하나만 틀리더라도 바로 catch로 넘어옴
//  .catch(errror => {
//    console.error(error)
//  })


// -------- 가영이 코드 돌아가는 버전

// callback함수는 계속 callback을 하면서 다음 흐름에 시행될 함수를 정의해줘야한다
// Promise는 특정한 처리 후, return에서 끝난 작업을 then을 통해서 다음으로 넘겨줄 수 있다.
// 깊이가 깊어지지 않는다
// 1. 다짐을 반환한다.
function getDataPromise() {  // axios.get(DATA_URL) === getDataPromise
  // 새로운 인스턴스를 만든다.
  return new Promise(resolve => {  // 반환부터 하고 시작!  // 함수 작성 시작
    setTimeout(() => {
      if (true) {
        console.log('INFO: 요청을 보냈습니다?!')
        const data = {'data': 'somedata'}
        resolve(data)  // .then으로 꺼낼 수 있는 객체가 된다.
      } else {
        reject('조건에 통과하지 못했어요!')
      }
    }, 100)
  })
}
// // 2. 어떤다짐? -> 데이터를 요청한 뒤 어떻게 할꺼야!  // Promise 안쪽의 함수에 표현한다.
getDataPromise()
  .then(response => {  // data = resolve(data)
    console.log(1)
    return response.data
  })
  .then((data) => {
    console.log(data)
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .catch(error => {  // catch는 하나만 있어도 괜찮
    console.error(error)
  })

// // 실제 코드에서는 어떻게 작성될까?  ->  async / await

// // function안에서 작성이 되어야함
// // async -> 비동기적인 작업을 동기적으로 사용할 logic이 있다는 선언
const handleData = async function() {
  // 원래는...
  // getDataPromise().then(response => {
  //   console.log(response)
    // .비동기적요청 then때문에 이후 작업은 여기 들어가야함

  // 비동기인거 알고 기다려야하는거 알아서 .then, callback이런거 해줬지만 
  // 난 그냥 기다려서 데이터 받고싶다!  --> await 사용

  const response = await getDataPromise()
  console.log(response)
}
  // 하지만 난 여기서 작업하고싶어!!

handleData()