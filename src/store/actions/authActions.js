export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: 'LOGIN_SUCCESS' })
			})
			.catch((err) => {
				dispatch({ type: 'LOGIN_ERROR', err })
			})
	}
}

export const authWithGoogle = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()

		dispatch({ type: 'LOGIN_LOADING' })

		firebase
			.login({ provider: 'google', type: 'popup' })
			.then((resp) => {
				return firestore.collection('users').doc(resp.user.uid).update({
					lastLoginAt: new Date(),
					createdAt: new Date(resp.user.metadata.creationTime)
				})
			})
			.then(() => {
				dispatch({ type: 'LOGIN_SUCCESS' })
			})
			.catch((err) => {
				dispatch({ type: 'LOGIN_ERROR', err })
			})
	}
}

export const authWithFacebook = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()

		dispatch({ type: 'SIGNUP_LOADING' })

		firebase
			.login({ provider: 'facebook', type: 'popup' })
			.then((resp) => {
				return firestore.collection('users').doc(resp.user.uid).update({
					lastLoginAt: new Date(),
					createdAt: resp.user.metadata.creationTime
				})
			})
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' })
			})
			.catch((err) => {
				dispatch({ type: 'SIGNUP_ERROR', err })
			})
	}
}

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()

		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' })
		})
	}
}

export const signUp = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((resp) => {
				return firestore.collection('users').doc(resp.user.uid).set({
					email: newUser.email,
					firstName: newUser.firstName,
					lastName: newUser.lastName,
					displayName: newUser.firstName + ' ' + newUser.lastName,
					initials: newUser.firstName[0] + newUser.lastName[0]
				})
			})
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' })
			})
			.catch((err) => {
				dispatch({ type: 'SIGNUP_ERROR', err })
			})
	}
}
