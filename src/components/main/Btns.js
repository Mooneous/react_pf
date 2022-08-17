import Anime from '../../assets/Anime';
import { useEffect, useState, useRef } from 'react';

function Btns() {
	const pos = useRef([]);
	const btnRef = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Scrolled, setScrolled] = useState(0);

	const getPos = () => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
	};

	const activation = () => {
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		setScrolled(scroll);

		pos.current.map((pos, idx) => {
			if (scroll >= pos) {
				for (const btn of btns) btn.classList.remove('on');
				btns[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	useEffect(() => {
		console.log(Index);
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[Index],
			duration: 500,
		});
	}, [Index]);

	return (
		<ul className='scroll_navi' ref={btnRef}>
			<li
				className='on'
				onClick={() => {
					if (Index === 0) {
						if (Scrolled !== pos[0]) {
							new Anime(window, {
								prop: 'scroll',
								value: pos.current[0],
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
								value: pos.current[1],
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
								value: pos.current[2],
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
								value: pos.current[3],
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
