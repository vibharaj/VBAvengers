(function(window) {
    var App = window.App || {};
    var $ = window.jQuery;

    var characterCount = [];

    // add firebase API
    
    firebase.initializeApp(firebaseConfig);
    var i= 0;
    var j = 0;
    var collection = firebase.firestore().collection('QandAs');
    collection.get().then((querySnapshot) => {
       
        querySnapshot.forEach((doc) => {
            i = i + 1;
            console.log(doc.id, " => ", doc.data());
            console.log("question: " + doc.data().question);
            //question
            $('#question' + i).html(doc.data().question);
            //answer choices
            j = j + 1;
            $('#option' + j).html(doc.data().option1);
            $('#character' + j).val(doc.data().character1);
            console.log("character1" + doc.data().character1);

            j = j + 1;
            $('#option' + j).html(doc.data().option2);
            $('#character' + j).val(doc.data().character2);
            console.log("character2" + doc.data().character2);

            j = j + 1;
            $('#option' + j).html(doc.data().option3);
            $('#character' + j).val(doc.data().character3);
            console.log("character3" + doc.data().character3);

            j = j + 1;
            $('#option' + j).html(doc.data().option4);
            $('#character' + j).val(doc.data().character4);
            console.log("character4" + doc.data().character4);
        });
    });

    //corresponding characters
   addSubmitHandler();

    function addSubmitHandler (){
        $('#form1').submit(function(event) {
          var radioValue1 = $("input[name='answer1']:checked").val();
          console.log("radio value1: " + radioValue1);
          characterCount.push(radioValue1);

          var radioValue2 = $("input[name='answer2']:checked").val();
          console.log("radio value2: " + radioValue2);
          characterCount.push(radioValue2);

          var radioValue3 = $("input[name='answer3']:checked").val();
          console.log("radio value3: " + radioValue3);
          characterCount.push(radioValue3);

          var radioValue4 = $("input[name='answer4']:checked").val();
          console.log("radio value4: " + radioValue4);
          characterCount.push(radioValue4);

          var radioValue5 = $("input[name='answer5']:checked").val();
          console.log("radio value5: " + radioValue5);
          characterCount.push(radioValue5); 
          
          console.log("character count array: " + characterCount);

          // finds character that occurs most
          var mf = 1;
          var m = 0;
          var item;
          for (var i=0; i<characterCount.length; i++)
          {
                  for (var j=i; j<characterCount.length; j++)
                  {
                          if (characterCount[i] == characterCount[j])
                           m++;
                          if (mf<m)
                          {
                            mf=m; 
                            item = characterCount[i];
                          }
                  }
                  m=0;
          }
          console.log(item+" ( " +mf +" times ) ") ;
          alert("You got: " + item + "!");
      })
    }


}) (window);