import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: 'todo-app-52a60.firebaseapp.com',
  databaseURL: 'https://todo-app-52a60.firebaseio.com',
  projectId: 'todo-app-52a60',
  storageBucket: 'todo-app-52a60.appspot.com',
  messagingSenderId: '528433444563',
  appId: '1:528433444563:web:3fb9853ad9a9901f598626',
  measurementId: 'G-9564QXXE9H',
});

const db = firebaseApp.firestore();

export default db;
