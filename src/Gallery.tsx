import type { Picture } from "./Pictures/furnitures/furnituresPictures";
import { MainThread, type ScrollEvent } from "@lynx-js/types";

import "./App.css";
import LikeImageCard from "./ImageCard";
import { calculateEstimatedSize } from "./utils";
import { useEffect, useMainThreadRef, useRef } from "@lynx-js/react";
import { NiceScrollbar, type NiceScrollbarRef } from "./Scrollbar";
import { adjustScrollbarMTS, NiceScrollbarMTS } from "./ScrollbarMTS";
import type { NodesRef } from "@lynx-js/types";

export const Gallery = (props: { pictureData: Picture[] }) => {
  const { pictureData } = props;
  const galleryRef = useRef<NodesRef>(null);

  const scrollbarRef = useRef<NiceScrollbarRef>(null);
  const scrollbarRefMTS = useMainThreadRef<MainThread.Element>(null);

  const onScrollMTS = (event: ScrollEvent) => {
    "main thread";
    adjustScrollbarMTS(
      event.detail.scrollTop,
      event.detail.scrollHeight,
      scrollbarRefMTS
    );
  };

  const onScroll = (event: ScrollEvent) => {
    scrollbarRef.current?.adjustScrollbar(
      event.detail.scrollTop,
      event.detail.scrollHeight
    );
  };

  useEffect(() => {
    galleryRef.current
      ?.invoke({
        method: "autoScroll",
        params: {
          rate: "60",
          start: true,
        },
      })
      .exec();
  }, []);

  return (
    <view className="gallery-wrapper">
      <NiceScrollbar ref={scrollbarRef} />
      <NiceScrollbarMTS main-thread:ref={scrollbarRefMTS} />
      <list
        ref={galleryRef}
        className="list"
        list-type="waterfall"
        column-count={2}
        scroll-orientation="vertical"
        custom-list-name="list-container"
        bindscroll={onScroll}
        main-thread:bindscroll={onScrollMTS}
        scroll-event-throttle={0}
      >
        {pictureData.map((picture: Picture, index: number) => (
          <list-item
            estimated-main-axis-size-px={calculateEstimatedSize(
              picture.width,
              picture.height
            )}
            item-key={"" + index}
            key={"" + index}
          >
            <LikeImageCard picture={picture} />
          </list-item>
        ))}
      </list>
    </view>
  );
};

export default Gallery;
