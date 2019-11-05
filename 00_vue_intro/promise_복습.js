// 일반적(동기적)인 흐름
// 1. 데이터를 가져온다
// 2. 가져온 데이터를 출력한다

// // 데이터를 가져오는 함수
// function getData() {
//     data를 선언해줘야 data에 뭔가를 담을 수 있다
//   let data

//   // 요청을 보낸다
//   data = {'data': 'somedata'}

//   return data
// }

// // 출력하는 함수
// function printData() {
//   const data = getData()
//   console.log(data)
// }
// printData()

// 결과
// $ node promise_복습.js
// { data: 'somedata' }


// ==================비동기함수======================= //
// 비동기함수 흐름
// function getData() {
//   // data를 선언해줘야 data에 뭔가를 담을 수 있다, data에 아무것도 없는 값을 넣어놓은 것
//   let data

//   setTimeout(() => {
//     console.log('INFO: 요청보냄')
//     data = {'data': 'somedata'}
//   }, 100);
  
//   return data  // undefined
// }

// // 출력하는 함수
// function printData() {
//   const data = getData()
//   console.log(data)
// }
// printData()

// 결과
// $ node promise_복습.js
// undefined
// INFO: 요청보냄


// ======================callBack=========================== //
// callBack 함수 - 데이터를 가지고 오고 나서 해야할 일(함수)를 정해줌 -> 데이터를 받아온 후 return된 함수를 처리
// setTimeout이 끝난 후 데이터를 받으면 getdatacallback이 실행되고 callback자리에 데이터가 들어감
// function getDataCallBack(callback) {
//   setTimeout(() => {
//     console.log('INFO: 요청보냄')
//     const data = {'data': 'callback_somedata'}
//     // const를 함수 안에서 작성했기 때문에 밖에서 사용할 수 없다. callback에 data를 담아서 밑에 getDataCallBack에서 데이터를 받아서 실행할수있음
//     callback(data)
//   }, 200);
// }

// // 데이터를 꺼내온 뒤, 작업하는 함수(return받을)를 전달
// // 데이터가 도착한 뒤 작업할 함수를 여기에서 넘겨받음
// getDataCallBack(function(data) {
//   console.log('데이터 넘어옴')
//   console.log(data)
// })    


// but 단점 -> callBack지옥에 빠질 수 있다 (예시)
// getDataCallBack(function(data) {
//   console.log(data)
//   getDataCallBack(function(login) {
//     console.log(login)
//     if (login) {
//      getDataCallBack(function(userinfo) {
//       console.log(userinfo)
//      }) 
//     }
//   })
// })

// ===================Promise====================== //

function getDataPromise() {
  return new Promise(resolve => {

    setTimeout(() => {
      console.log('INFO: Promise 요청보냄')
      const data = {data: 'Promise_somedata' }
      resolve(data)
    }, 100);
  })
}

getDataPromise()
  .then(data => {
    console.log(data)
    return getDataPromise()
  })
  .then(login => {
    if (login) {
      return getDataPromise()
    }
  })
  .then(userinfo => {
    console.log(userinfo)
  })

// //============================================ //
// 근데 꼭 이렇게 써야할까? 비동기적 코드를 동기적으로 실행하는 것 처럼 바꿔보자
// 데이터를 받을 때 까지 기다렸다가 함수 수행하면 될 것

async function printData() {
  const data = await getDataPromise()
  console.log(data)
}

printData()