import Layout from '../common/Layout';
import { useState } from 'react';

function Members() {
	const initVal = {
		userid: '',
	};
	const [Val, setVal] = useState(initVal);

	//현재 입력하고 있는 input값을 state에 저장해주는 함수
	const handleChange = (e) => {
		const { name, value } = e.target;
		//name = 'userid'
		//객체에서 키값을 변수로 지정이 안됨 (es5)
		//객체에세 키값을 변수로 치환하고자 할때는 키에 들어갈 변수를 대괄호로 감싸줌 (es6)
		//setVal({...Val, 'userid': value})
		setVal({ ...Val, [name]: value });
	};

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
										onChange={handleChange}
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
