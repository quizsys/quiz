const database = firebase.database();
const ref = database.ref('quiz').child("admin");
const ref2 = database.ref('quiz').child("user");
const ref3 = database.ref('quiz').child("vote");
const ref5 = database.ref('quiz').child("config");
var userKey = "";

/*
  初期化処理
*/
function init(){

  userKey = getCookieUserKey();
  if(userKey != ""){
    vue.toWaitMenu();
    waitQuiz();
  } else {
    onceGetConfig();
    document.getElementById("nameInput").focus();
  }
}

/*
クイズのタイトル名を取得する
*/
function onceGetConfig(){
  ref5.child('mainTitle').once('value').then(function(snapshot) {

    var mainTitle = snapshot.val();
    if(mainTitle != null){
      vue.mainTitle = mainTitle
    }
  })
}

/*
名前送信
*/
function sendName(){

	 userKey = ref2.push({
			 name: vue.name
	 }).key;
   setCookieUserKey(userKey)
}

/*
回答送信
*/
function sendSelectAnswer(){

  ref3.child(userKey).update({
    selectAnsNum: vue.selectAnsNum
  });
  setCookieQuizKey(tmpQuestionKey)
  setCookieSelectAns(vue.selectAnsNum)
}

/*
  クイズの配信待ち処理
*/
function waitQuiz(){

	ref.on("child_added", function(snapshot){

    if(snapshot.val() == ""){
      return;
    }

    var key = snapshot.key;
    var val = snapshot.val();

    if(val.question != undefined){

      var questionNum = val.question.questionNum;
      var quizContents = val.question.quizContents;
      var ansList = val.question.ansList;
      vue.setQuestion(questionNum, quizContents, ansList)

      var selectAnsNumByCookie = getCookie(key);

      //回答済みかを判定する
      if(selectAnsNumByCookie != -1){
        vue.selectAnsNum = selectAnsNumByCookie;
        vue.isHideNum = 7;
      } else {
        tmpQuestionKey = key;
        vue.next();
      }

    } else if(val.answer != undefined){
      var correctAnswer = val.answer.correctAnswer;
      vue.getAnswer(correctAnswer)

    } else if(val.timeout != undefined){
      if(vue.selectAnsNum == -1){
        vue.toTimeOut()
      }
    } else {
      console.log("エラー！定義外のkeyです", key);
    }

	});
}

/*
クッキーから回答状況を取得
*/
function getCookie(getkey){
	var questionKey = $.cookie("questionKey")
  var selectAns = $.cookie("selectAns");

	if(questionKey == undefined){
    //未回答
		return -1;
	} else if(questionKey == getkey && selectAns != undefined){
    //回答済み
    return selectAns;
  } else {
    //他の設問で回答済み
    return -1;
  }
}

/*
クッキーから参加状況を取得
*/
function getCookieUserKey(){

  var _userKey = $.cookie("userKey")
  if(_userKey == undefined){
		return "";
  } else {
    return _userKey;
  }
}

/*
  クッキーに保存する
*/
function setCookieQuizKey(questionKey){
  setCookie("questionKey", questionKey);
}
function setCookieSelectAns(selectAns){
  setCookie("selectAns", selectAns);
}
function setCookieUserKey(_userKey){
  setCookie("userKey", _userKey);
}
function setCookie(key,val){
  //保存期間は3時間
  var date = new Date();
  date.setTime(date.getTime() + (3*60*60*1000));
	$.cookie(key, val, { expires: date, path: '/'});
}
