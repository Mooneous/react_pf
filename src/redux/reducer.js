import { combineReducers } from 'redux';

//초기데이터를 state에 저장했다가 추후 action객체가 전달되면
//action객체의 타입에 따라 기존 데이터를 변경해서 리턴
const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };

		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case 'FLICKR_START':
			return { ...state };
		case 'FLICR_SUCCESS':
			return { ...state, flickr: action.payload };
		case 'FLICKR_ERROR':
			return state;
	}
};

//전달된 각각의 reducer를 하나로 합쳐서 반환
const reducers = combineReducers({ memberReducer, youtubeReducer });

export default reducers;
