import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';

import { useRef, useEffect } from 'react';

function Main() {
	const main = useRef(null);

	useEffect(() => {
		const secs = main.current.querySelectorAll('.myScroll');
	}, []);

	return (
		<main ref={main}>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics />
			<Vids />
		</main>
	);
}

export default Main;
