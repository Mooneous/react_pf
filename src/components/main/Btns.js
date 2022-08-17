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

			<li
				onClick={() => {
					if (Index === 0) {
						if (Scrolled !== pos[1]) {
							new Anime(window, {
								prop: 'scroll',
								value: pos[1],
								duration: 500,
							});
						}
					} else {
						setIndex(1);
					}
				}}></li>

			<li
				onClick={() => {
					if (Index === 0) {
						if (Scrolled !== pos[2]) {
							new Anime(window, {
								prop: 'scroll',
								value: pos[2],
								duration: 500,
							});
						}
					} else {
						setIndex(2);
					}
				}}></li>

			<li
				onClick={() => {
					if (Index === 0) {
						if (Scrolled !== pos[3]) {
							new Anime(window, {
								prop: 'scroll',
								value: pos[3],
								duration: 500,
							});
						}
					} else {
						setIndex(3);
					}
				}}></li>
		</ul>
	);
}

export default Btns;
