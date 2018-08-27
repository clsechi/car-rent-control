import { initializeApp } from 'firebase';

const config = {
  apiKey: 'AIzaSyDz7HEWdU8GHO70NbGmH2DZfvyaGEzITYQ',
  authDomain: 'car-rent-control.firebaseapp.com',
  databaseURL: 'https://car-rent-control.firebaseio.com',
  projectId: 'car-rent-control',
  storageBucket: 'car-rent-control.appspot.com',
  messagingSenderId: '64153021131',
};

const fireApp = initializeApp(config);

const AUTH = fireApp.auth();

fireApp.firestore().settings({ timestampsInSnapshots: true });
const DB = fireApp.firestore();

const STORAGE = fireApp.storage();

export default ({ Vue }) => {
  Vue.prototype.$auth = AUTH;
  Vue.prototype.$firestore = DB;
  Vue.prototype.$storage = STORAGE;
};
