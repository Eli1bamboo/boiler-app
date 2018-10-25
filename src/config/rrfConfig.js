const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true,
	attachAuthIsReady: true,
	customAuthParameters: {
		google: {
			prompt: 'select_account'
		}
	}
};

export default rrfConfig;
