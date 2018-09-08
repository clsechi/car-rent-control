import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDz7HEWdU8GHO70NbGmH2DZfvyaGEzITYQ',
  authDomain: 'car-rent-control.firebaseapp.com',
  databaseURL: 'https://car-rent-control.firebaseio.com',
  projectId: 'car-rent-control',
  storageBucket: 'car-rent-control.appspot.com',
  messagingSenderId: '64153021131',
};

const fireApp = firebase.initializeApp(config);

const AUTH = fireApp.auth();

fireApp.firestore().settings({ timestampsInSnapshots: true });
const DB = fireApp.firestore();

export default ({ Vue }) => {
  Vue.prototype.$auth = AUTH;
  Vue.prototype.$firestore = DB;
};
