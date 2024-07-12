import useAnimationState from "@/hooks/useAnimationState";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface IProps {
  /*
   * 是否显示
   */
  show: boolean;
  /*
   * 是否有遮罩，默认true
   */
  mask?: boolean;
  /*
   * 是否点击遮罩关闭
   */
  maskClick?: boolean;
  /*
   * 内容体
   */
  children: React.ReactNode;
  /*
   * 模式 0 弹出 1 划出 默认 0
   */
  mode?: number;
  /*
   * 取消事件
   */
  cancel?: (() => void) | null;
}

export const defAnimate = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.3 },
  transition: {
    duration: 0.25,
    type: "spring",
    damping: 35,
    stiffness: 600,
  },
};

export const fullAnimate = {
  initial: { y: "110%" },
  animate: { y: 0 },
  exit: { y: "110%" },
  transition: {
    duration: 0.25,
    type: "spring",
    damping: 40,
    stiffness: 600,
  },
};

export const maskAnimate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
};

export default function Index({
  show = false,
  maskClick = true,
  children,
  mode = 0,
  mask = true,
  cancel = null,
}: IProps) {
  const [localState, animation, setAnimationState] = useAnimationState();
  const [bodyOverflow, setBodyOverflow] = useState("");
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current) {
      return;
    }
    ref.current = document.createElement("div");
    ref.current.classList.add("modal");
    document.body.appendChild(ref.current);
    return () => {
      // 页面销毁时，移除外层元素
      document.body.removeChild(ref.current as Node);
    };
  }, []);

  useEffect(() => {
    setAnimationState(show);
    if (show) {
      if (document.body.style.overflow !== "hidden") {
        setBodyOverflow(document.body.style.overflow);
        document.body.style.overflow = "hidden";
      }
    } else {
      setTimeout(() => {
        const modal_container: any = document.querySelector(".modal_container");
        if (!modal_container) {
          document.body.style.overflow = bodyOverflow;
        }
      }, 500);
    }
  }, [show, bodyOverflow, setAnimationState]);

  return ref.current
    ? ReactDOM.createPortal(
        localState ? (
          <div className="fixed w-screen h-screen top-0 left-0 z-[700] flex_center">
            <AnimatePresence>
              {animation && mask ? (
                <motion.div
                  {...maskAnimate}
                  key="mask"
                  className="mark bg-[#00000050] w-full h-full absolute top-0 left-0 z-[701]"
                  onClick={() => {
                    maskClick && cancel && cancel();
                  }}
                ></motion.div>
              ) : null}

              {animation && localState ? (
                <motion.div
                  {...(mode ? fullAnimate : defAnimate)}
                  className="z-[702]"
                >
                  {children}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ) : null,
        ref.current
      )
    : null;
}
