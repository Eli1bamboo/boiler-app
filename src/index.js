import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import authConfig from './config/authConfig';
import fbConfig from './config/fbConfig';
import rrfConfig from './config/rrfConfig';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reactReduxFirebase(fbConfig, rrfConfig),
		reduxFirestore(fbConfig) // redux bindings for firestore
	)
);

store.firebaseAuthIsReady.then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<App authConfig={authConfig} />
		</Provider>,
		document.getElementById('root')
	);
	registerServiceWorker();
});
