import { useSelector } from 'react-redux';

function Pics({ Scrolled, currentPos }) {
	const Pics = useSelector((store) => store.flickrReducer.flickr);
	//position = 전체 스크롤 거리값에서 해당 섹션 요소의 세로위치값을 뺀값
	//해당박스가 활성화 된순간의 position값은 0이므로 좀더 정밀한 모션작업가능
	const position = Scrolled - currentPos || 0;

	return (
		<section id='pics' className='myScroll'>
			<h1
				style={{
					left: position * 4,
				}}>
				Flickr
			</h1>
			<h1>Recent Flickr</h1>
			<h2
				style={{
					left: position / 2,
				}}>
				GALLERY
			</h2>

			<div
				className='box'
				style={{
					transform: `scale(${1 + position / 1000})`,
					opacity: 1 - position / 1000,
				}}></div>
			<ul>
				{Pics.map((pic, idx) => {
					if (idx >= 5) return;
					return (
						<li key={pic.id}>
							<img
								src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
								alt={pic.title}
							/>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default Pics;
