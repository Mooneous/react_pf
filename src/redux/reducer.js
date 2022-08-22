import { combineReducers } from 'redux';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'MEMBERS_START':
			return { ...state };
		case 'MEMBERS_SUCCESS':
			return { ...state, members: action.payload };
		case 'MEMBERS_ERROR':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'YOUTUBE_START':
			return { ...state };
		case 'YOUTUBE_SUCCESS':
			return { ...state, youtube: action.payload };
		case 'YOUTUBE_ERROR':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case 'FLICKR_START':
			return { ...state };
		case 'FLICKR_SUCCESS':
			return { ...state, flickr: action.payload };
		case 'FLICKR_ERROR':
			return { ...state, flikcr: action.payload }; //오류장소
		default: //오류 ㅍㅍ
			return state;
	}
};

//전달된 각각의 reducer를 하나로 합쳐서 반환
const reducers = combineReducers({ memberReducer, youtubeReducer, flickrReducer });

export default reducers;
