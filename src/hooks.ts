import { useMainThreadRef } from "@lynx-js/react";
import type { MainThread, NodesRef, TouchEvent } from "@lynx-js/types";
import { useRef } from "react";

  const useUpdateSwiperStyle = () => {
    const swiperContainerRef = useMainThreadRef<MainThread.Element>(null);

    function updateSwiperStyle(offset: number) {
      "main thread";
    swiperContainerRef.current
      ?.setStyleProperties({
        // style: {
          transform: `translateX(${offset}px)`,
        // },
      })
  }
    return { updateSwiperStyle, swiperContainerRef }
  }

  const useOffset = ({
    onOffsetUpdate,
  }:{onOffsetUpdate: (offset:number)=>void}) => {
    const touchStartXRef = useMainThreadRef<number>(0);
    const currentOffsetRef = useMainThreadRef<number>(0);
    const touchStartCurrentOffsetRef = useMainThreadRef<number>(0);
    
    function updateOffset(offset: number) {
      "main thread";
    currentOffsetRef.current = offset;
    onOffsetUpdate(offset);
  }

    function handleTouchStart(e: MainThread.TouchEvent) {
      "main thread";
    touchStartXRef.current = e.touches[0].clientX;
    touchStartCurrentOffsetRef.current = currentOffsetRef.current;
    console.log("handleTouchStart" )
  }

  function handleTouchMove(e: MainThread.TouchEvent) {
    "main thread";
    const delta = e.touches[0].clientX - touchStartXRef.current;
    const offset = touchStartCurrentOffsetRef.current + delta;
    updateOffset(offset); 
    console.log("handleTouchMove", offset )
  }

  function handleTouchEnd(e: MainThread.TouchEvent) {
    "main thread";
    touchStartXRef.current = 0;
    touchStartCurrentOffsetRef.current = 0;
  }
    return { handleTouchStart, handleTouchMove, handleTouchEnd }
  }

  export {useOffset,useUpdateSwiperStyle}