import Layout from '../common/Layout';
import Pop from '../common/Pop';
//npm i react-masonry-component
import Masonry from 'react-masonry-component';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';

function Gallery() {
	const dispatch = useDispatch();
	const frame = useRef(null);
	const input = useRef(null);
	//추후 자식컴포넌트인 Pop에서 forwardRef로 전달되는 객체값을 참조하기위한 빈 참조객체 생성
	const pop = useRef(null);
	//store에 있는 flickr데이터를 가져옴 (처음 사이클에서는 빈배열  가져옴)
	const Pics = useSelector((store) => store.flickrReducer.flickr);

	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(false);
	//masonry 전환속도 옵션객체 설정
	const masonryOptions = { transitionDuration: '0.5s' };
	const user = '164021883@N04';
	//saga로 전달될 axios호출시 필요한 옵션값이 담길 state
	const [Opt, setOpt] = useState({ type: 'user', user: user });

	//interest요청 함수
	const showInterest = () => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');
		//Opt값 변경 (itnerest)
		setOpt({ type: 'interest' });
		setEnableClick(false);
	};

	//search요청 함수
	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를 입력하세요');
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		//Opt값 변경 (search)
		setOpt({ type: 'search', tag: result });
		input.current.value = '';
	};

	//user요청 함수
	const showUser = (e) => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');
		//Opt값 변경 (user)
		setOpt({ type: 'user', user: e.target.getAttribute('user') });
		setEnableClick(false);
	};

	//데이터가 로딩완료되면 로딩바 제거하고 frame출력하는 함수
	const endLoading = () => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setTimeout(() => setEnableClick(true), 600);
		}, 1000);
	};

	//Opt값이 변경될떄마다 dispath로 변경된 해당 Opt값을 Flickr_start액션객체에 담아서 saga에 전달
	useEffect(() => {
		dispatch({ type: types.FLICKR.start, Opt });
	}, [Opt]);

	//flickr데이터가 변경될때마다 (새로운데이터 요청을 해서 해당 요청이 완료될때마다) 로딩제거함수 호출
	useEffect(endLoading, [Pics]);

	return (
		<>
			<Layout name={'Gallery'}>
				<button user={user} onClick={showUser}>
					My Gallery
				</button>
				<button onClick={showInterest}>Interest Gallery</button>

				<div className='searchBox'>
					<input
						type='text'
						ref={input}
						onKeyUp={(e) => {
							if (e.key === 'Enter') showSearch();
						}}
					/>
					<button onClick={showSearch}>search</button>
				</div>

				{Loading && <img className='loading' src={process.env.PUBLIC_URL + '/img/loading.gif'} />}

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={masonryOptions}>
						{Pics.map((pic, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												pop.current.open();
											}}>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={pic.title}
											/>
										</div>
										<h2>{pic.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt={pic.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span user={pic.owner} onClick={showUser}>
												{pic.owner}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Pop ref={pop}>
				{Pics.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt={Pics[Index].title}
					/>
				)}
			</Pop>
		</>
	);
}

export default Gallery;

/*
onkeyDown//키를 누를때
onkeyUp//키를 눌렀다 뗐을때(추천!)
onkeyPress//눌렀다 뗐을때 (한글자판에서는 안먹는 키가 있음)
*/
