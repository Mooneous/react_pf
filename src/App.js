import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFlickr } from './redux/flickrSlice';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchMembers } from './redux/memberSlice';
//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Main from './components/main/Main';

//sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Members from './components/sub/Members';

import './scss/style.scss';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchMembers());
		dispatch(fetchFlickr({ type: 'user', user: '164021883@N04' }));
	}, []);
	return (
		<>
			{/* 중복되는 라우터명이 있을때 처음 연결된 라우터 하나만 연결 */}
			<Switch>
				{/* 메인페이지 전용 라우터 */}
				<Route exact path='/' component={Main} />

				{/* 서브페이지 전용 header 라우터 */}
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/members' component={Members} />

			<Footer />
		</>
	);
}

export default App;
