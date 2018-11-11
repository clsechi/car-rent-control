import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';

const config = {
  apiKey: 'AIzaSyDz7HEWdU8GHO70NbGmH2DZfvyaGEzITYQ',
  authDomain: 'car-rent-control.firebaseapp.com',
  databaseURL: 'https://car-rent-control.firebaseio.com',
  projectId: 'car-rent-control',
  storageBucket: 'car-rent-control.appspot.com',
  messagingSenderId: '64153021131',
};

firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.firestore().enablePersistence();

const DB = firebase.firestore();

const AUTH_UI = new firebaseui.auth.AuthUI(firebase.auth());

export default ({ Vue }) => {
  Vue.prototype.$authUI = AUTH_UI;
  Vue.prototype.$firebase = firebase;
  Vue.prototype.$firestore = DB;
};
