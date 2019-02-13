export const createContent = (content) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;

		if (content.file) {
			const file = content.file;

			firebase
				.uploadFile('files', file, null, { progress: true })
				.then(() => {
					dispatch({ type: 'CREATE_CONTENT_SUCCESS' });
				})
				.catch((err) => {
					dispatch({ type: 'CREATE_CONTENT_ERROR' }, err);
				});
		} else {
			firestore
				.collection('content')
				.add({
					...content,
					authorName: profile.displayName,
					authorId: authorId,
					createdAt: new Date()
				})
				.then(() => {
					dispatch({ type: 'CREATE_CONTENT_SUCCESS' });
				})
				.catch((err) => {
					dispatch({ type: 'CREATE_CONTENT_ERROR' }, err);
				});
		}
	};
};
