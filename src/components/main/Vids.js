import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Vids() {
	return (
		<section id='vids' className='myScroll'>
			<Swiper
				pagination={{ clickable: true }}
				navigation={true}
				modules={[Pagination, Navigation]}
				spaceBetween={50}
				loop={true}
				slidesPerView={3}
				centeredSlides={true}>
				{/*	centeredSlides={true} : 가운데요소 활성화*/}
				<SwiperSlide>
					<div className='inner'>1</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>2</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>3</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>4</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>5</div>
				</SwiperSlide>
			</Swiper>
		</section>
	);
}

export default Vids;
