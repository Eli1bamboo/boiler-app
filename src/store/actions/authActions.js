// export const signIn = (credentials) => {
//   return (dispatch, getState, {getFirebase}) => {
//     const firebase = getFirebase();

//     firebase.auth().signInWithEmailAndPassword(
//       credentials.email,
//       credentials.password
//     ).then(() => {
//       dispatch({ type: 'LOGIN_SUCCESS' });
//     }).catch((err) => {
//       dispatch({ type: 'LOGIN_ERROR', err });
//     });

//   }
// }

export const signInGoogle = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		dispatch({ type: 'LOGIN_LOADING' });
		firebase
			.login({ provider: 'google', type: 'popup' })
			.then((resp) => {
				return firestore.collection('users').doc(resp.user.uid).update({
					lastLoginAt: new Date()
				});
			})
			.then(() => {
				dispatch({ type: 'LOGIN_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'LOGIN_ERROR', err });
			});
	};
};

export const signUpGoogle = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		dispatch({ type: 'SIGNUP_LOADING' });
		firebase
			.login({ provider: 'google', type: 'popup' })
			.then((resp) => {
				return firestore.collection('users').doc(resp.user.uid).update({
					createdAt: new Date()
				});
			})
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'SIGNUP_ERROR', err });
			});
	};
};

export const signInFacebook = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.login({ provider: 'facebook', type: 'popup' })
			.then(() => {
				dispatch({ type: 'LOGIN_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'LOGIN_ERROR', err });
			});
	};
};

export const signUpFacebook = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		dispatch({ type: 'SIGNUP_LOADING' });
		firebase
			.login({ provider: 'facebook', type: 'popup' })
			.then((resp) => {
				return firestore.collection('users').doc(resp.user.uid).update({
					createdAt: new Date()
				});
			})
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'SIGNUP_ERROR', err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' });
		});
	};
};

export const signUp = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((resp) => {
				return firestore.collection('users').doc(resp.user.uid).set({
					firstName: newUser.firstName,
					lastName: newUser.lastName,
					initials: newUser.firstName[0] + newUser.lastName[0]
				});
			})
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'SIGNUP_ERROR', err });
			});
	};
};
