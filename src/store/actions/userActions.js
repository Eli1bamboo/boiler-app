export const grantAdmin = (id) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		dispatch({ type: 'GRANT_ADMIN_LOADING' });

		return firestore
			.collection('users')
			.doc(id)
			.update({
				isAdmin: true
			})
			.then(() => {
				console.log('grand admin success');
				dispatch({ type: 'GRANT_ADMIN_SUCCESS' });
			})
			.catch((err) => {
				console.log('grand admin error', err);
				dispatch({ type: 'GRANT_ADMIN_ERROR' }, err);
			});
	};
};
