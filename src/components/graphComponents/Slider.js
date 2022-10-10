import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


{/* <SwiperSlide>{index}. {val} stress = {(singleData[index]['stress']).toFixed(3)*100}%</SwiperSlide> */}
const Slider = (props) => {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#4285F4','#ff4444','#2BBBAD','#33b5e5'];
    const {posts,singleData} = props;

    return (
        <div>

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                slidesPerGroup={3}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
            {
                posts.map((val, index) => {
                    return (
                       <SwiperSlide className="single-post-evaluate-div" style={{background:`${COLORS[index%COLORS.length]}`}}>
                        <h2>Post Number {index+1}</h2>
                        <p>{val}</p>
                        <span> Stress = {(singleData[index]['stress']).toFixed(3)*100}%</span>
                        <span> Personality Detected = IFTP</span>
                       </SwiperSlide>
                    )
                })
            }
            </Swiper>
        </div>
    );
}

export default Slider;