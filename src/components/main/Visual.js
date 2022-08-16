import Anime from '../../assets/Anime';
import { useRef } from 'react';

const btnStyle = {
	position: 'absolute',
	top: 120,
	left: 100,
};
const boxStyle = {
	width: 100,
	height: 100,
	backgroundColor: 'aqua',
	position: 'absolute',
	top: 200,
	left: 200,
};

function Visual() {
	const box = useRef(null);

	return (
		<figure id='visual'>
			<button
				style={btnStyle}
				onClick={() => {
					new Anime(box.current, {
						prop: 'left',
						value: 1000,
						duration: 500,
						callback: () => {
							new Anime(box.current, {
								prop: 'top',
								value: 500,
								duration: 500,
							});
						},
					});
				}}>
				start
			</button>

			<div className='box' style={boxStyle} ref={box}></div>
		</figure>
	);
}

export default Visual;
