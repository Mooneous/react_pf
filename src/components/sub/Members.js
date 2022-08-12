import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Members() {
	const initVal = {
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});

	const check = (value) => {
		const errs = {};

		//userid 인증처리
		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		//email 인증처리
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일주소는 8글자 이상 @를 포함하세요';
		}

		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(Val));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	useEffect(() => {
		console.log(Err);
	}, [Err]);

	return (
		<Layout name={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1' width='600'>
						<caption>회원가입 정보 입력</caption>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
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
									<span className='err'>{Err.userid}</span>
								</td>
							</tr>

							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										value={Val.pwd1}
										placeholder='비밀번호를 입력하세요'
										onChange={handleChange}
									/>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										value={Val.pwd2}
										placeholder='비밀번호를 재입력하세요'
										onChange={handleChange}
									/>
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										value={Val.email}
										placeholder='이메일 주소를 입력하세요'
										onChange={handleChange}
									/>
									<span className='err'>{Err.email}</span>
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' />
									<input type='submit' value='submit' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Members;
