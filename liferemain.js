(function(){
    'use strict';
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

        /**
         * 指定した要素の子どもをすべて削除する
         * @param {HTMLElement} element HTMLの要素
         */
        function removeAllChildren(element) {
            while (element.firstChild) {  // 子どもの要素があるかぎり削除
                element.removeChild(element.firstChild);
            }
        }



    assessmentButton.onclick = () => {
        const yearNum = parseInt(yearInput.value);
        const monthNum = parseInt(monthInput.value);
        const dayNum = parseInt(dayInput.value);
        //名前が空のときは処理を終了する
        if (yearNum.length === 0 || monthNum.length === 0 || dayNum.length === 0) {
            return;
        }
        
        // 診断結果表示エリアの作成
        removeAllChildren(resultDivided);
       
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(yearNum,monthNum,dayNum);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = '<a href="https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E4%BA%BA%E7%94%9F%E6%AE%8B%E3%82%8A%E6%99%82%E9%96%93&text='
                + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E4%BA%BA%E7%94%9F%E6%AE%8B%E3%82%8A%E6%99%82%E9%96%93';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();


    };


    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {int} yearNum ユーザーの名前
     * @param {int} monthNum ユーザーの名前
     * @param {int} dayNum ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(yearNum, monthNum, dayNum) {
         // 誕生日の変数
         var myBirthTime = new Date(yearNum, monthNum-1, dayNum);
         
         // 現在の時間
         var now = new Date();

         //生まれてから「何日」「何年」「最後の誕生日からの何日」
         var daysFromBirth = parseInt((now.getTime() - myBirthTime.getTime()) / (1000 * 60 * 60 * 24));
         var yearsFromBirth = Math.floor(daysFromBirth / 365);
         var daysAfterBirthday = daysFromBirth % 365 - Math.floor(yearsFromBirth / 4); //うるう年を考慮
         
         //var result = '生まれてから' + yearsFromBirth + '年と' + daysAfterBirthday +'日経過。';

         // 日本人の平均寿命（81歳）の人生実感時間
         var averageConsciousTime = 0;

         for (var i=3; i <= 81; i++){
            averageConsciousTime += 1 / i;
        }   

         // これまでの実感時間の計算。意識があるのは３歳から
         var yourConsciousTime = 0;
         if (yearsFromBirth > 2) {
             for (var i=3; i <= yearsFromBirth; i++){
                 yourConsciousTime += 1 / i;
             }
             yourConsciousTime += (1/yearsFromBirth) * daysAfterBirthday / 365;
         }

         //var result = '平均の人生総実感時間は' + averageConsciousTime + "\n" + 'あなたの実感時間は' + yourConsciousTime +'です';

         // 何％が終了したか
         var passedConsciousTime = Math.round(yourConsciousTime / averageConsciousTime * 1000)/10;

         var result = '生まれてから' + yearsFromBirth + '年と' + daysAfterBirthday +'日経過。' + "\n" + '人生の実感時間のうち' +passedConsciousTime + '％が過ぎました。';







         // 結果を返す
         return result;
     }
     

})();
