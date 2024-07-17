import { useAtom, useAtomValue } from "jotai";
import "./index.less";
import { isLockState, openState } from "@/store/global";
import Head from "./components/Head";
import Content from "./components/Content";
import Lock from "./components/Lock";
import Info from "./components/Info";
import Add from "./components/Add";
import Setting from "./components/Setting";
import { AnimatePresence, motion } from "framer-motion";
import settingsImg from "@/assets/img/settings.png";
import tipsImg from "@/assets/img/tips.png";
import editionImg from "@/assets/img/edition.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fullAnimate = {
  initial: { y: "-110%" },
  animate: { y: 0 },
  exit: { y: "-110%" },
  transition: {
    duration: 0.25,
    type: "spring",
    damping: 40,
    stiffness: 600,
  },
};

export const fullAnimate2 = {
  initial: { y: "120%" },
  animate: { y: 0 },
  exit: { y: "120%" },
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

export default function Index() {
  const isLock = useAtomValue(isLockState);
  const [open, setOpen] = useAtom(openState);
  console.log(isLock, open)
  return (
    <div className="h-full relative">
      <div className="background absolute z-0">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <AnimatePresence mode="wait" initial>
        {isLock === 1 ? <Head key="Head" /> : null}
        {isLock === 1 ? <Content key="Content" /> : null}
        {isLock === 2 ? <Lock key="Lock" /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {isLock === 1 && open === -1 ? (
          <motion.div
            {...fullAnimate2}
            className="fixed z-20 bottom-[20px] w-full left-0 h-[100px]"
          >
            <div className="w-[80%] h-full rounded-full bg-[#f38181] flex justify-evenly m-auto">
              <div className="w-[60px] h-full rounded-full flex_center">
                <img
                  onClick={() => setOpen(0)}
                  className="anim_btn h-[60px] object-cover"
                  src={tipsImg}
                  alt=""
                />
              </div>
              <div className="w-[60px] h-full rounded-full flex_center">
                <img
                  onClick={() => setOpen(1)}
                  className="anim_btn h-[60px] object-cover"
                  src={editionImg}
                  alt=""
                />
              </div>
              <div className="w-[60px] h-full rounded-full flex_center">
                <img
                  onClick={() => setOpen(2)}
                  className="anim_btn h-[60px] object-cover"
                  src={settingsImg}
                  alt=""
                />
              </div>
            </div>
          </motion.div>
        ) : null}
        {isLock === 1 && open === 0 ? <Info key="Info" /> : null}
        {isLock === 1 && open === 1 ? <Add key="Add" /> : null}
        {isLock === 1 && open === 2 ? <Setting key="Setting" /> : null}
      </AnimatePresence>
      <ToastContainer
        className="toast-container text-[24px]"
        toastClassName="toast-class"
        bodyClassName="toast-body-class"
      />
    </div>
  );
}
