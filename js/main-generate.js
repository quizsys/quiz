const database = firebase.database();

const ref = database.ref('quiz');
var userList = {};

function init(){
  var status = checkLoginStatus()

  if(!status){
    console.log("未ログインです")
    vue.isHideNum = 1;
    return;
  }
  //ログイン済みの時
  vue.isHideNum = 2;
  onceGetMaster()
}


//ログイン後に実施される初期化処理
function loginInit(){
  //ログイン確認
  var status = checkLoginStatus()
  if(!status){
    console.log("未ログインです")
    return false;
  }
  //ログイン済みの時
  onceGetMaster();
  return true;
}


function waitLoginInit(){

  setTimeout(function(){
    if(!loginInit()){
      console.log("ログイン後初期化処理:", vue.loginCount)
      vue.loginCount++;
      if(vue.loginCount < 3){
        waitLoginInit();
      }
    }
  }, 1000)
}






function onceGetMaster(){
  ref.child("master").once('value').then(function(snapshot) {

    var key = snapshot.key;
    var val = snapshot.val();
    if(val != null){
      vue.json = val;
    }
  })
}



/*
----------------------------------------
この下は送信関連
----------------------------------------
*/



/*
問題送信
*/
function sendMaser(){
	 ref.update({
     master: vue.json
	 }).key;
}


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
  });
  return (errorCode == "");
}

/*
ログイン済み: true
未ログイン: false
*/
function checkLoginStatus(){
  return firebase.auth().currentUser != null;
}

function signOut(){
  firebase.auth().signOut().then(()=>{
    console.log("ログアウトしました");
  })
}
