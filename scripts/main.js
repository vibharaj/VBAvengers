(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-questions="form"]';
    var CHECKLIST_SELECTOR = '[data-questions="checklist"]';
    var App = window.App;
    var FormHandler = App.FormHandler;
    var GetThemeAndCharacters = App.GetThemeAndCharacters;
    var FireBaseDataStore = App.FireBaseDataStore;
    var objThemeChar = new GetThemeAndCharacters();
    
    // getting theme
    var theme = objThemeChar.getTheme();
    console.log("Theme: " + theme);

    // getting characters
    var character = objThemeChar.getCharacter("q1");
    console.log("Character 1: " + character);

    var character = objThemeChar.getCharacter("q2");
    console.log("Character 2: " + character);

    var character = objThemeChar.getCharacter("q3");
    console.log("Character 3: " + character);

    var character = objThemeChar.getCharacter("q4");
    console.log("Character 4: " + character);

    // putting characters in dropdown
    for(var i = 1; i <= 4; ++i) {
        // find dropdown control
        var select = document.getElementById("Characters"+i);
        var option = document.createElement("option");
        option.text = option.value = "--Choose character--";
        select.add(option, 0);

        // populate the dropdown with characters
        for(var j = 1; j <= 4; ++j) {
            var character = objThemeChar.getCharacter("q"+j);
            var option = document.createElement("option");
            option.text = option.value = character;
            select.add(option, 0);
        }
    }

    // var checkList = new CheckList(CHECKLIST_SELECTOR);
    var formHandler = new FormHandler(FORM_SELECTOR);
    var remoteDataStore = new FireBaseDataStore();

    formHandler.addSubmitHandler(function(data) {
      return remoteDataStore.add("test", data);
    });

    // gets attribute of document
    var collection = firebase.firestore().collection('QandAs');
    collection.get().then((querySnapshot) => {
       
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log("question: " + doc.data().question);
        });
    });

    
    collection.where("question", "==", "what is your best quality")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    console.log("using remotedatastore object");
    var data = remoteDataStore.getAll();
    
    console.log("data: " + data);
      

}) (window);