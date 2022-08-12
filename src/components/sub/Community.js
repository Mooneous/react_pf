import Layout from '../common/Layout';
import { useRef, useState } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	//글저장 함수
	const createPost = () => {
		console.log('title', input.current.value);
		console.log('content', textarea.current.value);
	};

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />
				<button>CANCEL</button>
				<button onClick={createPost}>WRITE</button>
			</div>
		</Layout>
	);
}

export default Community;

/*
Create : 데이터베이스에 정보 생성 (데이터 저장)
Read : 데이터베이스에 정보 불러 (데이터 출력)
Update : 데이터베이스에 정보 업데이트 (데이터 수정)
Delete : 데이터베이스에 정보 삭제 (데이터 제거)
*/
