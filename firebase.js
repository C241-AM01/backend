import { initializeApp } from 'firebase/app';
// import config from './config.js';
const firebaseConfig = {
    apiKey: "AIzaSyAyaqgzFyFycxFQGT89aNLws4fIlrktjnc",
    authDomain: "tracky-b3b65.firebaseapp.com",
    projectId: "tracky-b3b65",
    storageBucket: "tracky-b3b65.appspot.com",
    messagingSenderId: "317842492501",
    appId: "1:317842492501:web:45eb49c0f5b472713a98dc"
    // apiKey: "AIzaSyDF2t9gMW6do-0BxDdC9trlL5Jo-v4d2ak",
    // authDomain: "testing-e6cb8.firebaseapp.com",
    // projectId: "testing-e6cb8",
    // storageBucket: "testing-e6cb8.appspot.com",
    // messagingSenderId: "695496358880",
    // appId: "1:695496358880:web:78181eeea23a0984a8c985"
    
};

const firebase = initializeApp(firebaseConfig);

export default firebase;