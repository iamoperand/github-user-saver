import firebase from 'firebase/app';
import 'firebase/firestore';


import { config } from './constants';


firebase.initializeApp(config);

const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});


export default db;
