import "./App.css";
import { type MainThreadRef, type RefObject } from "@lynx-js/react";
import { MainThread } from "@lynx-js/types";

export const adjustScrollbarMTS = (
  scrollTop: number,
  scrollHeight: number,
  ref: RefObject<MainThread.Element>
) => {
  "main thread";
  const listHeight = SystemInfo.pixelHeight / SystemInfo.pixelRatio;
  const scrollbarHeight = listHeight * (listHeight / scrollHeight) * 1.5;
  const scrollbarTop = listHeight * (scrollTop / scrollHeight);
  ref.current?.setStyleProperties({
    height: `${scrollbarHeight}px`,
    top: `${scrollbarTop}px`,
  });
};

export const NiceScrollbarMTS = (props: {
  "main-thread:ref": RefObject<MainThread.Element>;
}) => {
  return (
    <view
      main-thread:ref={props["main-thread:ref"]}
      className="scrollbar"
      style={{ left: "7px" }}
    >
      <view className="scrollbar-label">
        <text>M</text>
        <text>T</text>
        <text>S</text>
      </view>
      <view className="scrollbar-effect glow" />
    </view>
  );
};
