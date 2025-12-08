import { useState } from "@lynx-js/react";
import "./styles.css";
import { SwiperItem } from "./SwiperItem";
import type { NodesRef, TouchEvent } from "@lynx-js/types";
import { useOffset, useUpdateSwiperStyle } from "./hooks";
import { Indicator } from "./Components/Indicator";

export function Swiper({
  data,
  itemWidth = SystemInfo.pixelWidth / SystemInfo.pixelRatio,
}: {
  data: string[];
  itemWidth?: number;
}) {
  const [current, setCurrent] = useState(0)

  const {swiperContainerRef,updateSwiperStyle} = useUpdateSwiperStyle()
  const {handleTouchEnd,handleTouchMove,handleTouchStart} = useOffset({onOffsetUpdate: updateSwiperStyle})

  return (
    <view className="swiper-wrapper">
      <view
        main-thread:ref={swiperContainerRef} 
        className="swiper-container"
        main-thread:bindtouchstart={handleTouchStart}
        main-thread:bindtouchmove={handleTouchMove}
        main-thread:bindtouchend={handleTouchEnd}
      >
        {data.map((pic) => <SwiperItem pic={pic} itemWidth={itemWidth} />)}
      </view>
      <Indicator total={data.length} current={current}/>
    </view>
  );
}
