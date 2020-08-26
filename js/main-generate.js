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
  onceGetConfig()
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




/*
クイズのタイトル名を取得する
*/
function onceGetConfig(){
  ref.child("config").once('value').then(function(snapshot) {

    var val = snapshot.val();

    if(val != null){
      var mainTitle = val.mainTitle;
      if(mainTitle != undefined){
        vue.mainTitle = mainTitle
      }
    }
  })
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

  var config = {
    mainTitle: vue.mainTitle
  }

	 ref.update({
     master: vue.json,
     config: config
	 }).key;
}
