document.addEventListener('DOMContentLoaded', function() {
    var magicBall = {};
    magicBall.listOfAnswers = ["不會", "會", "我不覺得", "當然", "無庸置疑", "夢裡什麼都有"];

    var answerContainer = document.getElementById('answerContainer');
    if (answerContainer) {
        answerContainer.style.display = 'none';
    }

    //定義問問題的函數
    magicBall.askQuestion = function (question) {
        //顯示答案
        document.getElementById("answerContainer").style.display = "none";

        //生成一個隨機數
        var randomNumber = Math.random();

        //根據隨機數和答案數量計算索引
        var randomNumberForListOfAnswers = randomNumber * this.listOfAnswers.length;
        var randomIndex = Math.floor(randomNumberForListOfAnswers);

        //獲取答案
        var answer = this.listOfAnswers[randomIndex];

        //將答案設置到DOM元素中
        var ballElement = document.querySelector('.ball');
        ballElement.classList.add('youGotAns');
        document.getElementById("answer").textContent = answer;
        document.getElementById("answer").style.display = "block";
        document.getElementById("answerContainer").style.display = "block";
        document.getElementById("answerContainer").style.display = "block";

        //在控制台輸出問題和答案
        console.log(question, answer);
    };

    //點擊按鈕的事件處理函數
    var onClick = function() {
        //隱藏答案
        document.getElementById('answer').style.display = 'none';

        //延遲執行間問題的函數
        setTimeout(function(){
            //使用prompt 提示用戶輸入問題
            var question = prompt("ASK ME  YES/NO QUESTION!");

            //調用問問題的函數
            magicBall.askQuestion(question);
        }, 500);
    };

    //綁定點擊事件
    document.getElementById("questionBtn").addEventListener("click", onClick);
});

