import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "react-use";
import loadingGif from "@/assets/img/loading.gif";
import Modal from "../Modal";

interface Props {
  state?: boolean;
  scale?: number;
  time: number;
}

export default function Index({
  state = true,
  time = 2000,
  scale = 95,
  ...restProps
}: Props) {
  const tRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressControl, setProgressControl] = useState({
    isStart: false, // 是否已经开始
    runnig: false, // 是否运行
    speed: 200, // 步进一次的时间
  });

  useEffect(() => {
    if (!state) {
      setProgressControl({
        isStart: false,
        runnig: false,
        speed: 200,
      });
      setProgress(100);
    } else {
      setProgress(0);
      setProgressControl({
        isStart: true,
        runnig: true,
        speed: time / scale,
      });
      tRef.current = setTimeout(() => {
        setProgressControl((v) => ({
          ...v,
          runnig: false,
        }));
      }, time);
    }
    return () => {
      tRef.current && clearTimeout(tRef.current);
    };
  }, [state]);

  // 假进度
  useInterval(
    () => {
      progress < 100 && setProgress((v) => v + 1);
    },
    progressControl.runnig && progress < 100 ? progressControl.speed : null
  );

  return (
    <Modal show={state}>
      <div
        className="w-full h-full flex_center flex-col z-10 font-normal"
        {...restProps}
      >
        <img className="z-40 w-[400px] h-[400px]" src={loadingGif} />
        <div
          className="z-40 text-[40px] text-white mt-[-120px]"
          data-content={`${progress}%`}
        >
          {progress}%
        </div>
        <div className="absolute z-30 top-0 w-full left-0 h-full backdrop-blur-sm"></div>
      </div>
    </Modal>
  );
}
