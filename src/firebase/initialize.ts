import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAiFiopBdIJU3L0pEISc4-qVqiaAbOIp7U',
	authDomain: 'msa-english.firebaseapp.com',
	projectId: 'msa-english',
	storageBucket: 'msa-english.appspot.com',
	messagingSenderId: '874842350059',
	appId: '1:874842350059:web:f3078e66202bd4fafd79ae',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
