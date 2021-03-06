import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Reducers
import notifyReducer from './reducers/notifyReducer';
import settingReducer from './reducers/settingReducer';

const firebaseConFig = { '***WILL DIFFER BETWEEN USERS***'
    apiKey: "***ENTER YOUR KEY HERE***",
    authDomain: "reactclientpanel-b4033.firebaseapp.com",
    databaseURL: "https://reactclientpanel-b4033.firebaseio.com",
    projectId: "reactclientpanel-b4033",
    storageBucket: "reactclientpanel-b4033.appspot.com",
    messagingSenderId: "987988149932"
};

//react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

//Init firebase instance
firebase.initializeApp(firebaseConFig);
//Init firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings)

//Add reactReduxFirebase enhancer when making store creator
const creatStoreWithFirebase = compose(
    reactReduxFirebase(firebase,rrfConfig),
    reduxFirestore(firebase)
)(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingReducer
})

//Check for settings in localStorage
if(localStorage.getItem('settings') == null) {
    //Default Setting
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    }
    //Set to local Storage
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

//Create initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

// Create store
const store = creatStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__() 
));

export default store;

