export const createProject = (project) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;

		if (project.file) {
			const file = project.file;

			firebase
				.uploadFile('files', file, null, { progress: true })
				.then(() => {
					dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
				})
				.catch((err) => {
					dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
				});
		} else {
			firestore
				.collection('projects')
				.add({
					...project,
					authorName: profile.displayName,
					authorId: authorId,
					createdAt: new Date()
				})
				.then(() => {
					dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
				})
				.catch((err) => {
					dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
				});
		}
	};
};
