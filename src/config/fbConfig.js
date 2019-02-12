import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

// Replace this with your own config details
var config = {
	apiKey: 'AIzaSyBRbJw0GroftacX980Je7__rBFHycciohc',
	authDomain: 'boiler-app-5307f.firebaseapp.com',
	databaseURL: 'https://boiler-app-5307f.firebaseio.com',
	projectId: 'boiler-app-5307f',
	storageBucket: 'boiler-app-5307f.appspot.com',
	messagingSenderId: '939861755012'
};
firebase.initializeApp(config);

export default firebase;
