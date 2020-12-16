import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDIcQ0vBiWcPE1W-sPo7gKnaUB1SJM3roQ',
	authDomain: 'my-speaking-academy.firebaseapp.com',
	projectId: 'my-speaking-academy',
	storageBucket: 'my-speaking-academy.appspot.com',
	messagingSenderId: '937287323978',
	appId: '1:937287323978:web:c74475fedfe2612ad0f1b3',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
