import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {
	const { kakao } = window; //window에 있는 kakao객체를 비구조할당으로 가져오기~안그럼지도못가져와ㅠㅠ
	const container = useRef(null);
	const [Location, setLocation] = useState(null);
	const option = {
		center: new kakao.maps.LatLng(36.2696545509031, 126.91221763712598), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	// 마커의 위치 정보값
	const markerPosition = option.center;

	// 마커의 이미지 정보값(저장위치경로, 이미지크기, 이미지 안에서의 마커 좌표 )
	const imgSrc = process.env.PUBLIC_URL + '/img/marker1.png';
	const imgSize = new kakao.maps.Size(232, 99);
	const imgOpt = {
		offset: new kakao.maps.Point(116, 99),
	};

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
	}, []);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			{/* 지도 위 교통정보 표시 */}
			<button onClick={() => Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>
				Trafiic ON
			</button>
			{/* 지도 위 교통정보 제거 */}
			<button onClick={() => Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>
				Trafiic OFF
			</button>
		</Layout>
	);
}

export default Location;
