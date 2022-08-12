import Layout from '../common/Layout';
import { useState } from 'react';

function Members() {
	//userid의 입력값이 담길 초기값을 객체로 생성
	const initVal = {
		userid: '',
	};
	const [Val, setVal] = useState(initVal);

	return (
		<Layout name={'Members'}>
			<form>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1' width='600'>
						<caption>회원가입 정보 입력</caption>
						<tbody>
							<tr>
								<th>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										placeholder='아이디를 입력하세요'
										name='userid'
										id='userid'
										value={Val.userid}
										onChange={(e) => {
											console.log(e.target.value);
											//onChange이벤트가 발생할때마다 기존의 Val 스테이트값을 복사해서 현재 입력하고 있는 값으로 바꿔치기
											setVal({ ...Val, userid: e.target.value });
										}}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Members;
