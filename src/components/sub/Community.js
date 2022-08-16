import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);

	//로컬스토리지에 있는 데이터를 가져와서 다시 JSON객체로 parsing해서 리턴하는 함수
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	//초기 Posts 스테이트에 로컬스토리지의 데이터를 가져와서 저장
	const [Posts, setPosts] = useState([getLocalData()]);
	const [Allowed, setAllowed] = useState(true);

	//기존 폼요소 초기화 함수
	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	//실제 글 수정 함수
	const updatePost = (index) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			resetForm();
			return alert('수정할 제목과 본문을 모두 입력하세요.');
		}

		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) {
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
		setAllowed(true);
	};

	//글저장 함수
	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			return alert('제목과 본문을 모두 입력하세요');
		}
		setPosts([...Posts, { title: input.current.value, content: textarea.current.value }]);
		resetForm();
	};

	//글삭제 함수
	const deletePost = (index) => {
		//기존 Posts스테이트의 배열값을 filter로 반복돌면서 현재 반복도는 순번값과 ,index파라미터로 전달된 삭제할 순번이 같지 않은 글만 반환
		const newPosts = Posts.filter((_, idx) => idx !== index); //index : 삭제할 순번
		//console.log(newPosts);
		//삭제순번의 글이 제외되어 반환된 데이터로 다시 state변경
		//해당 setPosts시 전개연산자(..블라블라)를 쓰지 않는 이유는 filter메서드 자체가 새로운배열을 이미 deepCopy해서 반환하기 때문
		setPosts(newPosts);
	};

	//글 수정모드 변경함수
	const enableUpdate = (index) => {
		if (!Allowed) return;
		setAllowed(false);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	//글 출력모드 변경함수
	const disableUpdate = (index) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	//Posts값이 변경될떄마다 로컬 스토리지에 기존 데이터를 다시 문자열로 변환해서 저장
	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholdler='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />
				<div className='btnSet'>
					<button>CANCEL</button>
					<button onClick={createPost}>WRITE</button>
				</div>
			</div>

			<div className='showBox'>
				{/* 배열에 객체값이 추가가되면 반복을 돌면서 리턴문으로 목록 출력 */}
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//수정모드
								<>
									<div className='editTxt'>
										<input type='text' defaultValue={post.title} ref={inputEdit} />
										<br />
										<textarea
											name=''
											id=''
											cols='30'
											rows='3'
											ref={textareaEdit}
											defaultValue={post.content}></textarea>
										<br />
									</div>
									<div className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button onClick={() => updatePost(idx)}>UPDATE</button>
									</div>
								</>
							) : (
								//출력모드
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<div className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										{/* 각 게시글 목록을 생성할때 삭제버튼까지 같이 생성, 삭제버튼 클릭시 삭제하려고 하는 해당 순번을 인수로 전달 */}
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</div>
								</>
							)}
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
