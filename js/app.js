var vue = new Vue({
  el: "#app",
  data: {
      mainTitle:"クイズ大会",
      questionNum: 1,
      quizContents: "",
      ansList:[],
      selectAnsNum: -1,
      correctAnswerNum: -1,
      correctAnswer:"",
      isHideNum: 1,
      isDoit: true,
      isCorrect: true,
      name: "",
      error: {
        require: false,
        tooLong: false
      }
  },
  watch: {
     name: function(newVal, oldVal) {
       this.error.require = (newVal.length < 1) ? true : false;
       this.error.tooLong = (newVal.length > 10) ? true : false;
     }
   },
  methods: {
    confirm: function(){
      if(0 < this.name.length && this.name.length < 10){
        sendName();
        this.toWaitMenu();
        waitQuiz();
      }
    },
    next: function(){
      this.isHideNum = 3;
    },
    selectAns: function(num) {
      this.selectAnsNum = num;
      sendSelectAnswer();
      this.isHideNum = 4;
    },
    getAnswer: function(ansNum){
      this.isCorrect = (this.selectAnsNum == ansNum);
      this.correctAnswer = this.ansList[ansNum];
      this.correctAnswerNum = ansNum;
      this.showAnswer()
    },
    showAnswer: function(){
      this.isHideNum = 5;
      doit();
    },
    setQuestion: function(questionNum, quizContents, ansList){
      this.questionNum = questionNum;
      this.quizContents = quizContents;
      this.ansList = ansList;
      this.selectAnsNum = -1;
    },
    toWaitMenu: function(){
      this.isHideNum = 2;
    },
    toTimeOut: function(){
      this.isHideNum = 6;
    }
  }
})

//回答表示まで待機
function doit(){
  setTimeout(function(){
    vue.isDoit= false
  }, 750)
}
