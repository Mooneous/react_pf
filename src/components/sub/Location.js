import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {
	const { kakao } = window; //window에 있는 kakao객체를 비구조할당으로 가져오기~안그럼지도못가져와ㅠㅠ
	//위치별로 관리할 정보값을 객체로 묶어서 다시 배열로 그룹핑
	//각 지점별 정보값 배열에 추가
	const info = [
		{
			title: '궁남지',
			latlng: new kakao.maps.LatLng(36.2696545509031, 126.91221763712598),
			imgUrl: process.env.PUBLIC_URL + '/img/marker1.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgOpt: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '올림픽 공원',
			latlng: new kakao.maps.LatLng(37.51881764760613, 127.11633054508519),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 90) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.566918804166775, 126.97863525321908),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 90) },
		},
	];

	const container = useRef(null);
	const [Location, setLocation] = useState(null);
	const [Traffic, setTraffic] = useState(false);
	//해당 지도관련 정보값이 변경될때마다 화면을 다시 렌더링하고 return문에서 편하게 호출하기 위해 Info 스테이트에 옮겨담음
	const [Info] = useState(info);
	//지점버튼 클릭시 변경되는 순서값이 저장될 스테이트 추가
	const [Index, setIndex] = useState(0);

	const option = {
		center: Info[Index].latlng, // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	// 마커의 위치 정보값
	const markerPosition = option.center;

	// 마커의 이미지 정보값(저장위치경로, 이미지크기, 이미지 안에서의 마커 좌표 )
	const imgSrc = Info[Index].imgUrl;
	const imgSize = Info[Index].imgSize;
	const imgOpt = Info[Index].imgOpt;

	// 마커의 이미지정보를 가지고 있는 마커이미지를 생성
	const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOpt);

	// 위 정보값을 통해 마커생성
	const marker = new kakao.maps.Marker({
		position: markerPosition,
		image: markerImage,
	});

	//가상돔 요소가 브라우저에 마운트(생성) 되면
	useEffect(() => {
		// 지도를 표시할 div와  지도 옵션으로  지도를 생성
		const map_instance = new kakao.maps.Map(container.current, option); //가상돔이니까 container아니고,container.current!
		// 마커가 지도 위에 표시되도록 설정
		marker.setMap(map_instance);
		setLocation(map_instance);
	}, [Index]);
	//▲기존에 의존성 배열이 비어져 있을때에는 그냥 컴포넌트 마운트시 지도가 한번 호출되고 마는 구조
	//의존성 배열에 Index스테이트를 등록하면 지점버튼을 클릭해서 Index스테이트가 변경될때마다 새로 변경된 Index값 정보를 토대로 지도 재호출

	//Traffic값이 바뀔때마다 호출되는 useEffect문
	useEffect(() => {
		if (!Location) return; //Location의 state값이 비어있다면 아래 함수값 실행하지 않고끝~(지도를 불러오지 않았다면)
		//Traffic값이 true일때 교통량 표시
		//그렇지 않으면 교통량 표시제거
		Traffic
			? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			{/* 지도 위 교통정보 표시, 제거 버튼*/}
			{/* 버튼을 클릭할때마다 기존의 Traffic정보값을 반전시킴 (토글) */}
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>

			{/* 지점보기 버튼 추가후 버튼 클릭시 해당 버튼의 순서값으로 Index스테이트 변경 */}
			<ul className='branch'>
				{/* <li onClick={() => setIndex(0)}>궁남지</li>
				<li onClick={() => setIndex(1)}>올림픽 공원</li>
				<li onClick={() => setIndex(2)}>서울 시청</li> */}
				{Info.map((info, idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)}>
							{info.title}
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Location;
