import * as Rebase from 're-base';

// To avoid loading unecessary scripts
import * as firebase from 'firebase/app';
import 'firebase/database';

const app = firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com'
});

const base = Rebase.createClass(app.database());

export default base;
