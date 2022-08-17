import Anime from '../../assets/Anime';

function Btns({ setIndex, Scrolled, pos, Index }) {
	return (
		<ul className='scroll_navi'>
			<li
				className='on'
				onClick={() => {
					if (Index === 0) {
						if (Scrolled !== pos[0]) {
							new Anime(window, {
								prop: 'scroll',
								value: pos[0],
								duration: 500,
							});
						}
					} else {
						setIndex(0);
					}
				}}></li>
			<li onClick={() => setIndex(1)}></li>
			<li onClick={() => setIndex(2)}></li>
			<li onClick={() => setIndex(3)}></li>
		</ul>
	);
}

export default Btns;
