import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

//부모요소에서 해당 컴포넌트를 참조할 수 있도록 forwardRef의 인수값으로 자기자신함수를 그대로 전달
const Pop = forwardRef(({ children }, ref) => {
	//내부적으로 팝업의 컨텐츠 출력여부를 결정할 Open 스테이트 생성
	const [Open, setOpen] = useState(false);

	//팝업열어주는 함수를 open이라는 키값에 담아서 객체를 리턴해주는 useImperativeHandle함수 호출
	//부모요소에서는 해당 리턴값을 참조하게됨
	//만약 해당 함수가 없으면 부모요소는 Pop컴포넌트 자체를 참조하게 됨
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
		};
	});

	return (
		<>
			<AnimatePresence>
				{/* Open 스테이트값이 true일때만 내부 컨텐츠 출력 */}
				{Open && (
					<motion.aside
						className='pop'
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0 } }}
						exit={{ opacity: 0, scale: 0, transition: { duration: 0.5, delay: 0.5 } }}>
						<motion.div
							className='con'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
							exite={{ opacity: 0, transition: { duration: 0.5, delay: 0 } }}>
							{children}
						</motion.div>
						<motion.span
							className='close'
							onClick={() => setOpen(false)}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 1 } }}
							exit={{ opacity: 0, x: 100, transition: { duration: 0.5, delay: 0 } }}>
							close
						</motion.span>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
});

export default Pop;

/*
	forwardRef hook을 이용해서 자식 컴포넌트의 데이터를 부모컴포넌트로 역으로 전달방법
	1- 기존의 컴포넌트 함수를 대입형(화살표) 함수로 변경
	2- 해당 화살표함수를 forwardRef의 인수로 전달
	3- forwardRef로 전달되는 화살표함수의 두번째 파라미터로 ref 추가
	4- forwardRef안쪽에 useImperativeHandle함수 호출
	5- 해당함수를 객체로 반환해서 해당 객체값을 부모컴포넌트로 전달
	6- 부모컴포넌트에서 useRef로 forwardRef로 전달되는 자식 컴포넌트 자체를 참조
	7- 참조 객체는 useImperativeHandle로 리턴하는 객체를 지칭
*/
