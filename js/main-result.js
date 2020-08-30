const database = firebase.database();

const ref = database.ref('quiz').child("admin");
const ref2 = database.ref('quiz').child("user");
const ref3 = database.ref('quiz').child("vote");
const ref4 = database.ref('quiz').child("master");
const ref5 = database.ref('quiz').child("config");
var userList = {};
var questions = [];

//トースターの配置
toastr.options = {
  "positionClass": "toast-bottom-left"
}

/*
  画面起動時の初期化処理
*/
function init(){

  //ログイン確認
  var status = checkLoginStatus()
  if(!status){
    console.log("未ログインです")
    vue.isHideNum = 8;
    return false;
  }
  //ログイン済みの時
  vue.isHideNum = 1;
  vue.isIconHide4 = false;

  onceGetConfig()
  onceGetMaster();
  initQuizData();
  waitAddUser();
  waitUserAnswer();
  return true;
}

/*
  ログイン後に実施される初期化処理
  initで実施する画面遷移がない
*/
function loginInit(){
  //ログイン確認
  var status = checkLoginStatus()
  if(!status){
    console.log("未ログインです")
    return false;
  }
  //ログイン済みの時
  vue.isHideNum = 1;
  vue.isIconHide4 = false;

  onceGetConfig()
  onceGetMaster();
  initQuizData();
  waitAddUser();
  waitUserAnswer();
  return true;
}


function onceGetMaster(){
  ref4.once('value').then(function(snapshot) {

    var val = snapshot.val();
    if(val != null){
      questions = val
      for(var i = 0; i<questions.length; i++){
        vue.kindList.push({
          name: questions[i].genre,
          disable: false
        })
      }
    }
  })
}


/*
クイズのコンフィグを取得する
*/
function onceGetConfig(){
  ref5.once('value').then(function(snapshot) {

    var val = snapshot.val();

    if(val != null){
      var mainTitle = val.mainTitle;
      if(mainTitle != undefined){
        vue.mainTitle = mainTitle;
      }
      var maxLimitTime = val.maxLimitTime;
      if(maxLimitTime != undefined){
        vue.maxLimitTime = maxLimitTime;
      }
    }
  })
}

/*
  ユーザーの参加を確認
*/
function waitAddUser(){

  	ref2.on("child_added", function(snapshot){
      var userName = snapshot.val().name;

      if(userName != undefined){
        userList[snapshot.key] = {}
        userList[snapshot.key].name = userName;
        userList[snapshot.key].count = 0;
        vue.allUserCount++;
        vue.loginMessage = userName + "さんが参加しました<br />" + vue.loginMessage;
        toastr.success(userName + 'さんが参加しました');
      }
  	});
}

/*
  ユーザーの回答を取得
*/
function waitUserAnswer(){

	ref3.on("child_added", function(snapshot){

    var key = snapshot.key;
    var val = snapshot.val().selectAnsNum;

    if(val != -1){
      userList[snapshot.key].selectAnsNum = val;
      vue.answerList[val].push(userList[snapshot.key].name);
      vue.ansUserCount++;
      var userName = userList[snapshot.key].name;
      toastr.info(userName + 'さんが解答しました！');

    }
	});
}

/*
  ユーザーの回答を検証
*/
function checkAns(){

  //正解者一覧
  vue.winnerList = vue.answerList[vue.correctAnswerNum];

  for(var i in userList){
    if(vue.correctAnswerNum == userList[i].selectAnsNum){
      userList[i].count++;
    }
  }
}


/*
  結果を集計する
*/
function summaryResult(){

  //問題数+1の大きさのリストを作成（正答数0を考慮）
  var countList = [];
  for(var i=0; i<questions.length+1; i++){
    countList.push("");
  }

  console.log(countList)

  //正解数毎にユーザをまとめる
  for(var i in userList){
    var user = userList[i]
    countList[user.count] += user.name + "、";
  }

  var count = 0
  //最高点～1点までを表示（0点は表示しない）
  for(var i = questions.length; i> 0; i--){
    if(countList[i] != ""){
      var result = {}
      console.log(i, countList[i])
      result.count = i;
      result.name = countList[i];
      vue.resultList.push(result);
      count++;
      //3位まで表示
      if(count == 3){
        break;
      }
    }
  }
  console.log(vue.resultList)
}


/*
----------------------------------------
この下は送信関連
----------------------------------------
*/


function initQuizData(){
  ref.remove();
  ref3.remove();

}

/*
問題送信
*/
function sendQuestion(){

  var q ={
    questionNum: vue.questionNum,
    quizContents: vue.quizContents,
    ansList: vue.ansList
  }

  ref.push({
     question: q
	 });

}

/*
タイムアウト送信
*/
function sendTimeOut(){
  ref.push({
     timeout: 0
	 });
}

/*
回答送信
*/
function sendAnswer(){

    var ans = {
      correctAnswer: vue.correctAnswerNum
    }
    ref.push({
     answer: ans
	 });
}



/*
----------------------------------------
*/




console.log("load end")
