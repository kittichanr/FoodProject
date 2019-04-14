var firebase = require('firebase');

const config = {
    apiKey: "AIzaSyAAm4xRgpPLs18eEH_fFSXv-qXECuqndkA",
    authDomain: "foodproject-7c7f2.firebaseapp.com",
    databaseURL: "https://foodproject-7c7f2.firebaseio.com",
    projectId: "foodproject-7c7f2",
    storageBucket: "foodproject-7c7f2.appspot.com",
    messagingSenderId: "740918420604"
}

let instance = null;

class FirebaseService {
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(config);
      instance = this;
    }
    return instance;
  }
}

const firebaseService = new FirebaseService().app;
export default firebaseService;