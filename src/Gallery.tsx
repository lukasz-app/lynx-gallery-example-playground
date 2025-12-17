import type { Picture } from "./Pictures/furnitures/furnituresPictures";
import { MainThread, type ScrollEvent } from "@lynx-js/types";

import "./App.css";
import LikeImageCard from "./ImageCard";
import { calculateEstimatedSize } from "./utils";
import { useEffect, useMainThreadRef, useRef, useState } from "@lynx-js/react";
import { NiceScrollbar, type NiceScrollbarRef } from "./Scrollbar";
import { adjustScrollbarMTS, NiceScrollbarMTS } from "./ScrollbarMTS";
import type { NodesRef } from "@lynx-js/types";

const Gallery = (props: { pictureData: Picture[] }) => {
  const { pictureData } = props;
  const galleryRef = useRef<NodesRef>(null);

  const scrollbarRef = useRef<NiceScrollbarRef>(null);
  const scrollbarRefMTS = useMainThreadRef<MainThread.Element>(null);

  const [btsJammerState, setBTSJammerState] = useState(false);

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

  const toggleBTSJammer = () => {
    setBTSJammerState(true);
  };
  useEffect(() => {
    if (!btsJammerState) return;
    const start = Date.now();
    const end = start + 10000;
    while (Date.now() < end) {
      // JAM JS thread for 10 seconds
      console.log("Jamming");
    }
    setBTSJammerState(false);
  }, [btsJammerState]);

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
      <view
        className="jammerContainer"
        style={{ width: "100%", flexDirection: "row", display: "flex" }}
      >
        <view
          bindtap={() => {
            console.log("Click");
          }}
          style={{
            padding: "8px",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <text>MTS Jammer: </text>
        </view>
        <view
          bindtap={toggleBTSJammer}
          style={{
            padding: "8px",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <text>
            BTS Jammer:{" "}
            <text style={{ color: btsJammerState ? "red" : "green" }}>
              {btsJammerState ? "ON" : "OFF"}{" "}
            </text>
          </text>
        </view>
      </view>
    </view>
  );
};

export default Gallery;
