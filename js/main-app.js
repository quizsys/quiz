const database = firebase.database();
const ref = database.ref('quiz').child("admin");
const ref2 = database.ref('quiz').child("user");
const ref3 = database.ref('quiz').child("vote");
var userKey = "";


function init(){

  userKey = getCookieUserKey();
  if(userKey != ""){
    vue.toWaitMenu();
    waitQuiz();
  }
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
}


function waitQuiz(){

	ref.on("child_added", (snapshot) => {

    if(snapshot.val() == ""){
      return;
    }

    var key = snapshot.key;
    var val = snapshot.val();

    if(val.question != undefined){

      var quizNum = val.question.questionNum;
      var quizContents = val.question.quizContents;
      var ansList = val.question.ansList;
      vue.setQuestion(quizNum, quizContents, ansList)

      var selectAnsNumByCookie = getCookie(key);

      //回答済みかを判定する
      if(selectAnsNumByCookie != -1){
        vue.selectAnsNum = selectAnsNumByCookie;
        vue.isHideNum = 4;
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


  //クッキーから回答状況を取得
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

  function getCookieUserKey(){

    var _userKey = $.cookie("userKey")
    if(_userKey == undefined){
  		return "";
    } else {
      return _userKey;
    }
  }


  //クッキーに保存する
  function setCookieQuizKey(questionKey){
  	//保存期間は1日
  	$.cookie("questionKey", questionKey, { expires: 1, path: '/'});
  }
  function setCookieSelectAns(selectAns){
  	//保存期間は1日
  	$.cookie("selectAns", selectAns, { expires: 1, path: '/'});
  }
  function setCookieUserKey(_userKey){
  	//保存期間は1日
  	$.cookie("userKey", _userKey, { expires: 1, path: '/'});
  }
