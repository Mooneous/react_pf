import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	//글저장 함수
	const createPost = () => {
		//글저장버튼 클릭해서 해당함수가 실행이 되면
		//기존 배열인 Posts스테이트값을 deepCopy (불변성유지)
		//복사가 된 빈 배열에 참조객체로부터 전달받은 제목과 본문을 객체리터럴형식으로 만들어서 스테이트를 변경
		//빈배열에는 해당 게시글 정보로 만들어진 객체가 추가됨
		setPosts([...Posts, { title: input.current.value, content: textarea.current.value }]);
	};

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholdler='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />
				<button>CANCEL</button>
				<button onClick={createPost}>WRITE</button>
			</div>

			<div className='showBox'>
				{/* 배열에 객체값이 추가가되면 반복을 돌면서 리턴문으로 목록 출력 */}
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							<h2>{post.title}</h2>
							<p>{post.content}</p>
						</article>
					);
				})}
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
