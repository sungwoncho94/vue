// 비동기적 : 어떤 작업을 요청했을 때 그 작업이 종료될때 까지 기다리지 않고 다른 작업을 하고 있다가,
//           요청했던 작업이 종료되면 그에 대한 추가 작업을 수행하는 방식
// 동기적 : 어떤 작업을 요청했을 때 그 작업이 종료될때 까지 기다린 후 다음 작업을 수행하는 방식
// 1. 데이터를 가지고온다
// 2. 가지고온 데이터를 출력한다.
// 방법111111111111111111111111
function getData() {
  let data  // data라는 값에 뭐가들어갈지 모르지만, 아무것도 없는 값을 data에 넣어둠
  // let data = null과 동일
 // js는 비동기적으로 움직이므로
 // 외부에서 가지고오면, js에서는 시간이 걸린다.
  // 데이터를 가지고오는데, 0.1초가 걸린다. -> 0.1초동안 기다리겠다.
  // js는 0.1초동안 기다렸다가 데이터 받는 것이아니라서 내가 원하는대로 받을 수 없음
  setTimeout(() => {
    console.log('INFO: getData_요청 보냄')
    data = {'data': 'getData_somedata'}
  }, 100);
      // setTimeout 하고 printData하면
      // undefined
      // INFO: 요청 보냄
  return data  // js는 기다리지 않고 데이터 받음 -> data = undefined
 }
 // [동기적인 흐름]
 function printData() {
  const data = getData()  // getData를 통해 data를 받아온다.
  console.log(data)  // undefined
  // 데이터 가지고오는데 오래걸리니까 하고싶은 일을 미리 전달할께, 데이터 꺼내고나면 이 일을 진행해!
 }
 printData()  // { data: 'somedata' }
 // 방법2222222222222222222222
 function getDataCallback(callback) {
  setTimeout(() => {
    console.log('INFO: callBack_요청 보냄')
    const data = {'data': 'callBack_somedata'}
    callback(data)
  }, 100);
 }
 // 데이터를 꺼내온 다음에 작업하는 함수를 전달
 // getDataCallback(callback) 과 동일
 getDataCallback(function(data) {  // data 정상적으로 응답을 받았으면,
  console.log(data)  // console 찍어봐
 })
 // [결과]
 // INFO: 요청 보냄
 // { data: 'somedata' }
 // [function getDataCallback(callback) 에서 callback(data) 없으면]
 // INFO: 요청 보냄
 // [callback의 문제점-> 효율적이지 않음]
 // 처리하는 일을 넘겨주면, 데이터를 꺼낸 다음 callback함수 작동시켜야함
 // -> 앞으로 진행되는 모든 코드는 함수 내에 작성됨
 // -> 효율적이지 않음
 getDataCallback(function(data) {
  console.log(data)
  getDataCallback(function(login) {
    console.log(login)
    if (login) {
      getDataCallback(function(userinfo) {
        console.log(userinfo)
      })
    }
  })
 })
 // 방법333333333333333333333
 // [Promise : callback의 비효율성 해결을 위해]
 // Promise 사용하는 방법, 문법
 function getDataPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('INFO: Promise_요청 보냄')
      const data = {'data': 'Promise_somedata'}
      resolve(data)  // data를 넘겨줘라
    }, 100);
  })
 }
 // js는 비동기적으로 동작한다. -> Promise로 작동시킬 것이야.
 // 동기적으로 사용하는 것과 뭐가 다른가?
 // 비동기적인 것으로 가지고와서 동기적인 것과 같게 동작하게함.
 getDataPromise()  // 우리는 데이터를 꺼내올 것
  // 꺼내고 난 뒤, 안에 들어가지 않고, 특정 작업을 하고, 하고, 하고,, (안으로 들어가지 않음)
  .then(data => {
    console.log(data)  // 데이터 찍어오기
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
 // 데이터 도착할 때까지 기다렸다가 너 데이터 쓸께 ->
 async function printData() {
  const data = await getDataPromise()
 }
 printData()
 // 방법1과 동일