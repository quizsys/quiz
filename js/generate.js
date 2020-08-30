var vue = new Vue({
  el: "#app",
  data: {
      mainTitle:"クイズ大会",
      questionNum: 1,
      quizContents: "",
      questionTitle: "",
      ansList:[],
      name: "",
      password: "",
      selectAnsNum: -1,
      correctAnswer : "",
      correctAnswerNum: -1,
      isHideNum: 0,
      isIconHide1:true,
      isIconHide2:true,
      isIconHide3:true,
      isIconHide4:true,
      isIconHide6:true,
      isCorrectList:[false, false, false, false],
      isHideResult:true,
      explain: "",
      error: {
        requireName: false,
        requirePassword: false,
        missLoginInfo: false,
        requireMainTitle:false,
        toLongMainTitle:false,
        requireMaxLimitTime:false,
        toLongMaxLimitTime:false
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
      maxLimitTime: 40
    },
  watch: {
     name: function(newVal, oldVal) {
       this.error.requireName = (newVal.length < 1) ? true : false;
     },
      password: function(newVal, oldVal) {
        this.error.requirePassword = (newVal.length < 1) ? true : false;
      },
      mainTitle: function(newVal, oldVal) {
       this.error.requireMainTitle = (newVal.length < 1) ? true : false;
       this.error.toLongMainTitle = (30 < newVal.length) ? true : false;
      },
      maxLimitTime: function(newVal, oldVal) {
       this.error.requireMaxLimitTime = (newVal < 5) ? true : false;
       this.error.toLongMaxLimitTime = (180 < newVal) ? true : false;
      }
   },
  methods: {
    resetIcon: function(){
      if(!this.isIconHide1) this.isIconHide1 = true;
      if(!this.isIconHide2) this.isIconHide2 = true;
      if(!this.isIconHide3) this.isIconHide3 = true;
      if(!this.isIconHide4) this.isIconHide4 = true;
      if(!this.isIconHide6) this.isIconHide6 = true;
    },
    upQuestion: function(e){
      var id = parseInt(e.target.id);
      var tmpQ = this.json[id];
      this.json.splice(id, 1, this.json[id-1])
      this.json.splice(id-1, 1, tmpQ)
    },
    downQuestion: function(e){
      var id = parseInt(e.target.id);
      var tmpQ = this.json[id];
      this.json.splice(id, 1, this.json[id+1])
      this.json.splice(id+1, 1, tmpQ)
    },
    addQuestion: function(){
      var q = {
        genre: "",
        quizContents: "",
        ansList: ["", "", "", ""],
        explain: "",
        correctAnswer: 0
      };
      this.json.push(q);
    },
    deleteQuestion: function(e){
      var id = e.target.id;
      this.json.splice(id, 1)
    },
    preView: function(){
      this.isHideNum = 3;
      this.resetIcon()
      this.isIconHide1 = false;
    },
    commit: function(){
      sendMaser();
      this.isCommit = true

      var url="";
      var sp = document.URL.split('/')
      for(var i = 0; i<sp.length-1; i++){
        url += sp[i] + "/"
      }
      this.resultURL =  url + "result.html"
      this.appURL =  url + "index.html"
      this.updateAlart();
    },

    goQuiz: function(e){
      var selectQuestionNum = parseInt(e.target.id) ;

      //ボタン更新
      this.selectQuestionNum = selectQuestionNum;
      this.questionTitle = e.target.innerText;

      //クイズ取得
      var q = vue.json[selectQuestionNum]
      this.setQuestion(this.questionNum+1, q.quizContents, q.ansList)
      this.getAnswerResult(q.correctAnswer, q.explain)

      //画面描画
      this.isHideNum = 4;

      this.resetIcon()
      this.isIconHide3 = false;
      this.isIconHide6 = false;
    },
    toTopPage: function(){
      this.isHideNum = 2;
    },
    toHome: function(){
      this.isHideNum = 3;
      this.resetIcon();
      this.isIconHide1 = false;
    },
    toTimeUp: function(){
      this.isHideNum = 5;
      this.resetIcon();
      this.isIconHide2 = false;
    },
    toCorrectAnswer: function(){
      this.setCorrectButton()
      this.isHideNum = 6;
      this.resetIcon();
      this.isIconHide4 = false;
    },
    checkToResultPage: function(){
      swal({
        title: "結果発表に進む？",
        type:"info",
        showCancelButton : true
      })
      .then(function(val){
        this.isHideResult = true;
        vue.toResultPage()
      })
      .catch(function(e) {
        //cancelを押した場合はこちら
      });
    },
    toResultPage: function(){
      this.isHideNum = 7;
    },
    showResult: function(){
      this.isHideResult = false;
    },
    back: function(){
      this.isHideNum = 2;
    },
    confirm: function(){
      //ログイン処理
      this.error.requireName = (0 == this.name.length);
      this.error.requirePassword = (0 == this.password.length);

      if(0 < this.name.length && 0 < this.password.length){
       login(this.name, this.password)
      }
    },
    logout: function(){
      signOut();
      this.isHideNum = 1;
    },
    getAnswer: function(ansNum){
      this.isCorrect = (this.selectAnsNum == ansNum);
      this.correctAnswer = this.ansList[ansNum];
      this.correctAnswerNum = ansNum;
    },
    setQuestion: function(questionNum, quizContents, ansList){
      this.questionNum = questionNum;
      this.quizContents = quizContents;
      this.ansList = ansList;
      this.selectAnsNum = -1;
    },

    //Result用メソッド
    getAnswerResult: function(ansNum, explain){
      this.correctAnswer = this.ansList[ansNum];
      this.correctAnswerNum = ansNum;
      this.explain = explain
    },
    setCorrectButton: function(){
      for(var i in this.isCorrectList){
        this.isCorrectList[i] = false;
      }
      this.isCorrectList[this.correctAnswerNum] = true;
    },
    alertLogout: function(){

      swal({
            title: 'ログアウトしますか？',
            confirmButtonText : "はい",
            cancelButtonText : "いいえ",
            showCancelButton:true,
            type: 'warning'
          })
          .then(function(val){
            vue.logout();
          })
          .catch(function(e) {
            //cancelを押した場合はこちら
          });

    },
    toSetting: function(){
      this.isHideNum = 10;
    },
    updateConfig: function(){
      if(0 < this.mainTitle.length && this.mainTitle.length < 31 && 4 < this.maxLimitTime && this.maxLimitTime < 301){
        sendConfig();
        this.updateAlart();
      }
    },
    updateAlart: function(){
      swal({
          title: '更新しました',
          type: 'success'
        })
        .then(function(val){
          vue.toTopPage();
        })
        .catch(function(e) {
          //cancelを押した場合はこちら
        });
    }
  }
})
