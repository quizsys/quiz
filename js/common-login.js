/*
----------------------------------------
ユーザー認証
* ログイン成功時にtrueを返す
----------------------------------------
*/

function login(email, password){
  var errorCode = "";
  var user = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode,errorMessage)
    console.log(user.uid)

  });

  //ログイン完了待機
  swal({
     title: 'ログイン処理中です',
     allowOutsideClick : false, //枠外をクリックしても画面を閉じない
     onBeforeOpen: function(){
         swal.showLoading();
       }
   })

   var sleep = function(sec) {
     return new Promise(function(resolve){
       setTimeout(resolve, sec * 1000);
     });
   };

   sleep(1).then(function() {

     if(errorCode == ""){
      swal({
         title: 'ログインしました',
         type : 'success'
       })
       vue.toTopPage();
       vue.loginCount = 0;
       waitLoginInit();

     } else {
      swal({
         title: 'ログイン失敗',
         type : 'error'
       })
       vue.error.missLoginInfo = true;
     }
   })
}

/*
ログイン済み: true
未ログイン: false
*/
function checkLoginStatus(){
  return firebase.auth().currentUser != null;
}

/*
  サインアウト処理
*/
function signOut(){
  firebase.auth().signOut().then(function(){
    console.log("ログアウトしました");
  })
}

/*
  ログイン完了待ち
*/
function waitLoginInit(){

  setTimeout(function(){
    if(!loginInit()){
      console.log("ログイン後初期化処理:", vue.loginCount)
      vue.loginCount++;
      if(vue.loginCount < 5){
        waitLoginInit();
      }
    }
  }, 1000)
}
