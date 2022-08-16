import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';

import { useRef, useEffect, useState } from 'react';
import Anime from '../../assets/Anime';

function Main() {
	//브라우저 리사이즈시 메인 컴포넌트 호출이 되는지안되는지 알아보려고~
	console.log('main called'); //처음에만 호출되고 리사이즈시 호출안됨

	const main = useRef(null);
	const pos = useRef([]);
	const [Index, setIndex] = useState(0);

	//섹션의 세로 위치값을 구하는 함수
	const getPos = () => {
		pos.current = []; //리사이즈시마다 위치값(pos) 추가되고있으므로 빈배열 만들어 초기화한 다음 담기
		const secs = main.current.querySelectorAll('.myScroll');
		//반복문(메인페이지섹션높이값)
		for (const sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
	};

	//스크롤 위치에 따라서 버튼 활성화 함수
	const activation = () => {
		const scroll = window.scrollY;
		const btns = main.current.querySelectorAll('.scroll_navi li');

		//pos.current에 등록된 각 섹션의 세로 위치값을 반복
		pos.current.map((pos, idx) => {
			//현재 스크롤된 거리값이 각 섹션의 위치값보다 같거나 크면
			//기존 버튼 모두 비활성화시키고 해당 순번의 버튼만 활성화
			if (scroll >= pos) {
				for (const btn of btns) btn.classList.remove('on');
				btns[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPos(); //마운트될때
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		return () => {
			//언마운트될때
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	useEffect(() => {
		//console.log(Index);
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[Index],
			duration: 500,
		});
	}, [Index]);

	return (
		<main ref={main}>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Btns setIndex={setIndex} />
			{/*setIndex라는 state함수를 setIndex라는 props 이름으로 전달*/}
		</main>
	);
}

export default Main;

/*
	useRef : state와는 달리 useRef에 담겨있는 값은 변경이 되도 화면이 재랜더링되지 않으면서
	만약 다른 state변경으로 화면이 재랜더링 되었을때 일반 변수값처럼 useRef에 담겨있는 값은 사라지지 않음
vs.
  state : 해당값이 변경이 되면 무조건 해당 컴포넌트는 재랜더링 일어남 (화면의 변경점을 담당하는 화면UI에 관련 데이터)
	지역변수 : 컴포넌트가 재랜더링될떄마다 해당 변수에 있는 값은 유지가 안되고 다시 초기화 (권장사항 아님)
	useRef : 컴포넌트가 재랜더링되더라도 값이 유지가됨, 해당 값이 변경되어도 화면을 재랜더링하지 않음 (화면UI의 직접적인 변경사항은 아니나 특정 정보값을 단기간에 엄청 많이 변경해야될때)
*/
