const initState = {};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case 'GRANT_ADMIN_LOADING':
			return {
				...state,
				isLoading: true
			};
		case 'GRANT_ADMIN_SUCCESS':
			return {
				...state,
				isLoading: false
			};
		case 'GRANT_ADMIN_ERROR':
			return {
				...state,
				isLoading: true
			};
		default:
			return state;
	}
};

export default userReducer;
