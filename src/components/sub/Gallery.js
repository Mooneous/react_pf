import Layout from '../common/Layout';
import Pop from '../common/Pop';
//npm i react-masonry-component
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);
	const input = useRef(null);
	const [Items, setItems] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Open, setOpen] = useState(false);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(false);
	//masonry 전환속도 옵션객체 설정
	const masonryOptions = { transitionDuration: '0.5s' };
	const num = 50;
	const user = '164021883@N04';

	const getFlickr = async (opt) => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		let url = '';
		//객체로 전달되는 type에 따라 호출한 URL을 새로 만들고 axios에 전달
		if (opt.type === 'interest')
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1}`;
		if (opt.type === 'user')
			url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${user}`;
		if (opt.type === 'search')
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tag}`;

		const url_user = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${user}`;

		await axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});

		//masonry 박스정렬시간동안 기다린후 리스트 출력
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setEnableClick(true);
		}, 1000);
	};

	//처음  호출시에는 interest방식으로 호출
	useEffect(() => getFlickr({ type: 'interest' }), []);

	return (
		<>
			<Layout name={'Gallery'}>
				<button
					onClick={() => {
						if (!EnableClick) return;
						setLoading(true);
						frame.current.classList.remove('on');
						//user 갤러리 호출시에는 추가로 user키값에 검색하고자 하는 유저아이디 전달
						getFlickr({ type: 'user', user: user });
						setEnableClick(false);
					}}>
					My Gallery
				</button>

				<button
					onClick={() => {
						if (!EnableClick) return;
						setLoading(true);
						frame.current.classList.remove('on');
						getFlickr({ type: 'interest' });
						setEnableClick(false);
					}}>
					Interest Gallery
				</button>

				<div className='searchBox'>
					<input type='text' ref={input} />
					<button
						onClick={() => {
							const result = input.current.value.trim();
							if (!result) return alert('검색어를 입력하세요');
							if (!EnableClick) return;
							setEnableClick(false);
							setLoading(true);
							frame.current.classList.remove('on');
							getFlickr({ type: 'search', tag: result });
							input.current.value = '';
						}}>
						search
					</button>
				</div>

				{Loading && <img className='loading' src={process.env.PUBLIC_URL + '/img/loading.gif'} />}

				<div className='frame' ref={frame}>
					{/* masonry를 적용한 요소들의 부모컴포넌트를 Masonry로 만들고 태그명 지정하고 옵션객체 연결 */}
					<Masonry elementType={'div'} options={masonryOptions}>
						{Items.map((pic, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										setIndex(idx);
										setOpen(true);
									}}>
									<div className='inner'>
										<div className='pic'>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={pic.title}
											/>
										</div>
										<h2>{pic.title}</h2>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			{Open && (
				<Pop setOpen={setOpen}>
					<img
						src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
						alt={Items[Index].title}
					/>
				</Pop>
			)}
		</>
	);
}

export default Gallery;
