
(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  // add firebase API
  
  class FireBaseDataStore {
      constructor() {
          console.log('running the FireBaseDataStore function');
            firebase.initializeApp(firebaseConfig);
        this.firestore = firebase.firestore();
      }

      async add(key, val) {
        alert("Question Successfully Added!");

        console.log('firebase add  ');
        console.log("values: " + val);
        var collection = firebase.firestore().collection('QandAs');
        return collection.add(val);

      }
      async get(key, cb)  { 
          const docRef = this.firestore.collection(`QandAs`);
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          return await snapshot.docs.map(e => e.data());
      }
      async getAll(cb)    { 
          const docRef = this.firestore.collection(`QandAs`);
          const snapshot = await docRef.get();
          console.log("snapshot: " + snapshot);

          return await snapshot.docs.map(e => e.data());  
      }


      async remove(email)   { 
          const docRef = await this.firestore.collection(`QandAs`);
          const batch = this.firestore.batch();
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          snapshot.forEach(doc => {
              batch.delete(doc.ref);
          });
          await batch.commit();
      }
  }
  App.FireBaseDataStore = FireBaseDataStore;
  window.App = App;

})(window);