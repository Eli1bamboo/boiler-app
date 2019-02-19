const initState = {}

const contentReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_CONTENT_SUCCESS':
			return { ...state, id: action.id }
		case 'CREATE_CONTENT_ERROR':
			console.log('create content error')
			return state
		default:
			return state
	}
}

export default contentReducer
