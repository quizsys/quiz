var vue = new Vue({
  el: "#app",
  data: {
      quizNum: 1,
      quizContents: "",
      questionId: 1,
      questionTitle: "",
      ansList:[],
      name: "",
      password: "",
      selectAnsNum: -1,
      correctAnswer : "",
      correctAnswerNum: -1,
      isHideNum: 0,
      error: {
        requireName: false,
        requirePassword: false,
        missLoginInfo: false
      },
      isCommit:false,
      resultURL:"",
      appURL:"",
      loginCount:0,
      json:[
        {
          genre: "例題",
          quizContents: "次のうち、俳句の季語として認定されて<b>いない</b>ものはどれ？",
          ansList: ["サザン", "チューブ", "ユーミン","山下達郎"],
          explain: "「山下達郎」は夏と冬、「ユーミン」は冬、「サザン」は夏の季語として使用できる。",
          correctAnswer: 1
        },
      ],
  },
  watch: {
     name: function(newVal, oldVal) {
       this.error.requireName = (newVal.length < 1) ? true : false;
     },
      password: function(newVal, oldVal) {
        this.error.requirePassword = (newVal.length < 1) ? true : false;
      },
   },
  methods: {
    upQuestion(e){
      var id = parseInt(e.target.id);
      var tmpQ = this.json[id];
      this.json.splice(id, 1, this.json[id-1])
      this.json.splice(id-1, 1, tmpQ)
    },
    downQuestion(e){
      var id = parseInt(e.target.id);
      var tmpQ = this.json[id];
      this.json.splice(id, 1, this.json[id+1])
      this.json.splice(id+1, 1, tmpQ)
    },
    addQuestion(){
      var q = {
        genre: "",
        quizContents: "",
        ansList: ["", "", "", ""],
        explain: "",
        correctAnswer: 0
      };
      this.json.push(q);
    },
    deleteQuestion(e){
      var id = e.target.id;
      this.json.splice(id, 1)
    },
    preView(){
      this.isHideNum = 3;
    },
    commit(){
      sendMaser();
      this.isCommit = true

      var url="";
      var sp = document.URL.split('/')
      for(var i = 0; i<sp.length-1; i++){
        url += sp[i] + "/"
      }
      this.resultURL =  url + "result.html"
      this.appURL =  url + "index.html"
    },

    goQuiz(e){
      var selectQuestionNum = parseInt(e.target.id) ;

      //ボタン更新
      this.selectQuestionNum = selectQuestionNum;
      this.questionTitle = e.target.innerText;

      //クイズ取得
      var q = vue.json[selectQuestionNum]
      this.setQuestion(this.quizNum+1, q.quizContents, q.ansList)
      this.getAnswerResult(q.correctAnswer, q.explain)
      this.questionId = q.questionId;

      //画面描画
      this.isHideNum = 4;
    },
    back(){
      this.isHideNum = 2;
    },
    reset(){
      if(!this.isHide1) this.isHide1 = true;
      if(!this.isHide2) this.isHide2 = true;
      if(!this.isHide3) this.isHide3 = true;
    },
    clickFunc(num) {
      this.selectAnsNum = num;
      sendSelectAnswer();
      this.isHideNum = 4;
    },
    confirm(){
      //ログイン処理
      if(0 < this.name.length && 0 < this.password.length){
        if(login(this.name, this.password)){
            this.isHideNum = 2;
            waitLoginInit();
        } else {
          this.error.missLoginInfo = true;
        }
      }

    },

    toWaitMenu(){
      this.isHideNum = 2;
    },
    next(){
      this.isHideNum = 3;
    },
    getAnswer(ansNum){
      this.isCorrect = (this.selectAnsNum == ansNum);
      this.correctAnswer = this.ansList[ansNum];
      this.correctAnswerNum = ansNum;
    },
    setQuestion(quizNum, quizContents, ansList){
      this.quizNum = quizNum;
      this.quizContents = quizContents;
      this.ansList = ansList;
      this.selectAnsNum = -1;
    },

    //Result用メソッド
    getAnswerResult(ansNum, explain){
      this.correctAnswer = this.ansList[ansNum];
      this.correctAnswerNum = ansNum;
      this.explain = explain
    },
    toTimeOut(){
      this.reset()
      this.isHide6 = false;
    }
  }
})
