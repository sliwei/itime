import closeImg from "@/assets/img/close.png";
import { motion } from "framer-motion";
import MaskLoading from "@/components/MaskLoading";
import { fullAnimate } from "../..";
import { openState } from "@/store/global";
import { useSetAtom } from "jotai";

export default function Index() {
  const setOpen = useSetAtom(openState);

  return (
    <>
      <motion.div
        {...fullAnimate}
        className="rounded-[10px] fixed z-40 top-0 w-full left-0 h-full flex flex-col"
      >
        <div className="flex-1 bg-white rounded-[10px] m-[10px] relative border-[#aaa] border-[2px] border-solid">
          <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-[3px] top-[-3px] origin-top-left rotate-1"></div>
          添加一条记录
        </div>
        <div className="w-full h-[140px] flex_center">
          <img
            onClick={() => setOpen(-1)}
            className="h-[140px] w-[140px] anim_btn"
            src={closeImg}
            alt=""
          />
        </div>
      </motion.div>

      <MaskLoading state={false} time={2000} />
    </>
  );
}
