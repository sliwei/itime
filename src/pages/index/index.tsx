import { useAtom, useSetAtom } from "jotai";
import "./index.less";
import { countAtom } from "@/store/count";
import { authorityState } from "@/store/authority";
import bgImg from "@/assets/img/memphis-colorful.webp";
import settingsImg from "@/assets/img/settings.png";
import cardTopImg from "@/assets/img/card-top.jpg";
import graphImg from "@/assets/img/graph.png";
import tipsImg from "@/assets/img/tips.png";
import headImg from "@/assets/img/f0d9fd95-a5f0-474d-98b0-d51e8450f2cf.png";
import editionImg from "@/assets/img/edition.png";
import n0Img from "@/assets/img/0.png";
import n1Img from "@/assets/img/1.png";
import n2Img from "@/assets/img/2.png";
import n3Img from "@/assets/img/3.png";
import n4Img from "@/assets/img/4.png";
import n5Img from "@/assets/img/5.png";
import n6Img from "@/assets/img/6.png";
import n7Img from "@/assets/img/7.png";
import n8Img from "@/assets/img/8.png";
import n9Img from "@/assets/img/9.png";
import localImg from "@/assets/img/1189872.png";
import closeImg from "@/assets/img/close.png";
import calendarImg from "@/assets/img/calendar.png";
import imageImg from "@/assets/img/image.png";
import mapsImg from "@/assets/img/maps.png";
import voiceControlImg from "@/assets/img/voice-control.png";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Numbers = [
  n0Img,
  n1Img,
  n2Img,
  n3Img,
  n4Img,
  n5Img,
  n6Img,
  n7Img,
  n8Img,
  n9Img,
];

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

export default function Index() {
  const [count, setCount] = useAtom(countAtom);
  const setAuthority = useSetAtom(authorityState);
  const [open, setOpen] = useState(-1);

  return (
    <div className="h-full">
      {/* 顶部 */}
      <div className="fixed w-full h-full top-0 z-0 bg-repeat">
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
        <div className="relative z-10 p-[20px] text-[#f38181]">
          <div className="text-[60px]">
            电风扇<span className="text-[40px]">(电动阀)</span>
          </div>
          <div className="">
            宝宝
            <img className="w-[40px] h-[40px]" src={Numbers[1]} alt="" />
            岁<img className="w-[40px] h-[40px]" src={Numbers[2]} alt="" />
            <img className="w-[40px] h-[40px]" src={Numbers[6]} alt="" />天
            <img className="w-[40px] h-[40px]" src={Numbers[1]} alt="" />
            <img className="w-[40px] h-[40px]" src={Numbers[2]} alt="" />
            小时辣
          </div>
          <div className="">
            距<img className="w-[40px] h-[40px]" src={Numbers[2]} alt="" />
            岁还有
            <img className="w-[40px] h-[40px]" src={Numbers[1]} alt="" />
            <img className="w-[40px] h-[40px]" src={Numbers[6]} alt="" />
            <img className="w-[40px] h-[40px]" src={Numbers[2]} alt="" />天
          </div>

          <div className="absolute right-[30px] top-[30px] rounded-full w-[120px] h-[120px]">
            <div className="absolute w-full h-full rounded-full border-[2px] border-[#fff] border-solid left-0 top-0 skew-x-1 origin-top-left rotate-1"></div>
            <div className="rounded-full w-full h-full overflow-hidden">
              <img className="w-full h-full" src={headImg} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* 顶部占位 */}
      <div className="relative z-10 h-[250px] w-full"></div>
      {/* 内容 */}
      <div className="relative z-10 bg-white min-h-full rounded-[10px] overflow-hidden shadow-yellow-600 m-[10px] p-[10px]">
        <div className="absolute w-[2px] h-[88%] bg-[#aaa] left-[20px]"></div>
        <div className="absolute w-[2px] h-[88%] bg-[#aaa] left-[20px] origin-center rotate-1"></div>

        <div className="py-[10px] text-[30px]">
          {/* 时间 */}
          <div className="flex justify-start items-center">
            <div className="bg-[#f38181] px-[10px] ml-[-10px] relative flex_center flex-col">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <p className="leading-[1]">7月</p>
              <p className="leading-[1]">15日</p>
            </div>
            <div className="ml-[10px]">15时21分43秒</div>

            <div className="flex-1 flex justify-end items-center pl-[40px] info_bg rounded-tr-[50px]">
              <img className="w-[30px] h-[30px]" src={graphImg} alt="" />
              <div>10kg,75cm</div>
            </div>
          </div>
          {/* 文字 */}
          <div className="leading-[1.2] pl-[40px] my-[20px]">
            说点什么吧~说点什么吧~说点什么吧~说点什么吧~说点什么吧~
          </div>
          {/* 音频 */}
          {/* <div className="pl-[40px] my-[20px]">
            <div className="h-[40px] rounded-full bg-[#7a4cba] relative overflow-hidden mb-[10px] px-[10px]">
              <div className="bg-[#3D1E67] w-[50%] h-full absolute z-0 left-0 top-0"></div>
              <span className="text-white relative z-10">20s</span>
            </div>

            <div className="h-[40px] rounded-full bg-[#7a4cba] relative overflow-hidden mb-[10px] px-[10px]">
              <div className="bg-[#3D1E67] w-[50%] h-full absolute z-0 left-0 top-0"></div>
              <span className="text-white relative z-10">20s</span>
            </div>
          </div> */}
          {/* 图片视频 */}
          <div className="flex pl-[40px] my-[20px] flex-wrap">
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
          </div>
          {/* 地址 */}
          <div className="text-[#666] text-[18px] leading-[1] pl-[40px] my-[20px] flex justify-start items-center">
            <img className="w-[30px] h-[30px]" src={localImg} alt="" />
            xx省xx市xx区xx街道xx号
          </div>
        </div>
        <div className="py-[10px] text-[30px]">
          {/* 时间 */}
          <div className="flex justify-start items-center">
            <div className="bg-[#f38181] min-h-[20px] min-w-[20px] px-[10px] ml-[-10px] relative flex_center flex-col">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              {/* <p className="leading-[1]">7月</p>
              <p className="leading-[1]">15日</p> */}
            </div>
            <div className="ml-[10px]">6月3日15时21分43秒</div>

            <div className="flex-1 flex justify-end items-center pl-[40px] info_bg rounded-tr-[50px]">
              <img className="w-[30px] h-[30px]" src={graphImg} alt="" />
              <div>10kg,75cm</div>
            </div>
          </div>
          {/* 文字 */}
          <div className="leading-[1.2] pl-[40px] my-[20px]">
            说点什么吧~说点什么吧~说点什么吧~说点什么吧~说点什么吧~
          </div>
          {/* 音频 */}
          {/* <div className="pl-[40px] my-[20px]">
            <div className="h-[40px] rounded-full bg-[#7a4cba] relative overflow-hidden mb-[10px] px-[10px]">
              <div className="bg-[#3D1E67] w-[50%] h-full absolute z-0 left-0 top-0"></div>
              <span className="text-white relative z-10">20s</span>
            </div>

            <div className="h-[40px] rounded-full bg-[#7a4cba] relative overflow-hidden mb-[10px] px-[10px]">
              <div className="bg-[#3D1E67] w-[50%] h-full absolute z-0 left-0 top-0"></div>
              <span className="text-white relative z-10">20s</span>
            </div>
          </div> */}
          {/* 图片视频 */}
          <div className="flex pl-[40px] my-[20px] flex-wrap">
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
          </div>
          {/* 地址 */}
          <div className="text-[#666] text-[18px] leading-[1] pl-[40px] my-[20px] flex justify-start items-center">
            <img className="w-[30px] h-[30px]" src={localImg} alt="" />
            xx省xx市xx区xx街道xx号
          </div>
        </div>
        <div className="py-[10px] text-[30px]">
          {/* 时间 */}
          <div className="flex justify-start items-center">
            <div className="bg-[#f38181] min-h-[20px] min-w-[20px] px-[10px] ml-[-10px] relative flex_center flex-col">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              {/* <p className="leading-[1]">7月</p>
              <p className="leading-[1]">15日</p> */}
            </div>
            <div className="ml-[10px]">6月3日15时21分43秒</div>

            <div className="flex-1 flex justify-end items-center pl-[40px] info_bg rounded-tr-[50px]">
              <img className="w-[30px] h-[30px]" src={graphImg} alt="" />
              <div>10kg,75cm</div>
            </div>
          </div>
          {/* 文字 */}
          <div className="leading-[1.2] pl-[40px] my-[20px]">
            说点什么吧~说点什么吧~说点什么吧~说点什么吧~说点什么吧~
          </div>
          {/* 音频 */}
          {/* <div className="pl-[40px] my-[20px]">
            <div className="h-[40px] rounded-full bg-[#7a4cba] relative overflow-hidden mb-[10px] px-[10px]">
              <div className="bg-[#3D1E67] w-[50%] h-full absolute z-0 left-0 top-0"></div>
              <span className="text-white relative z-10">20s</span>
            </div>

            <div className="h-[40px] rounded-full bg-[#7a4cba] relative overflow-hidden mb-[10px] px-[10px]">
              <div className="bg-[#3D1E67] w-[50%] h-full absolute z-0 left-0 top-0"></div>
              <span className="text-white relative z-10">20s</span>
            </div>
          </div> */}
          {/* 图片视频 */}
          <div className="flex pl-[40px] my-[20px] flex-wrap">
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
            <div className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
              <img
                className="w-full h-full object-contain"
                src={cardTopImg}
                alt=""
              />
            </div>
          </div>
          {/* 地址 */}
          <div className="text-[#666] text-[18px] leading-[1] pl-[40px] my-[20px] flex justify-start items-center">
            <img className="w-[30px] h-[30px]" src={localImg} alt="" />
            xx省xx市xx区xx街道xx号
          </div>
        </div>
      </div>
      {/* 操作占位 */}
      <div className="bg-white w-full h-[140px]"></div>
      {/* 弹窗 */}
      <AnimatePresence>
        {/* 操作 */}
        {open === -1 ? (
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
      </AnimatePresence>
      {/* 弹窗 */}
      <AnimatePresence>
        {/* 操作 */}
        {open !== -1 ? (
          <motion.div
            {...maskAnimate}
            className="fixed z-30 top-0 w-full left-0 h-full backdrop-blur-sm"
          ></motion.div>
        ) : null}
        {open === 0 ? (
          <motion.div
            {...fullAnimate}
            className="rounded-[10px] fixed z-40 top-0 w-full left-0 h-full flex flex-col"
          >
            <div className="flex-1 bg-white rounded-[10px] m-[10px] relative border-[#aaa] border-[2px] border-solid">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-[3px] top-[-3px] origin-top-left rotate-1"></div>
              信息ℹ️
            </div>
            <div className="h-[140px] flex_center px-[20px]">
              <img
                onClick={() => setOpen(-1)}
                className="h-[80px] w-[80px] anim_btn"
                src={calendarImg}
                alt=""
              />
              <img
                onClick={() => setOpen(-1)}
                className="h-[80px] w-[80px] anim_btn"
                src={imageImg}
                alt=""
              />
              <img
                onClick={() => setOpen(-1)}
                className="h-[80px] w-[80px] anim_btn"
                src={mapsImg}
                alt=""
              />
              <img
                onClick={() => setOpen(-1)}
                className="h-[80px] w-[80px] anim_btn"
                src={voiceControlImg}
                alt=""
              />
              <img
                onClick={() => setOpen(-1)}
                className="h-[140px] w-[140px] anim_btn"
                src={closeImg}
                alt=""
              />
              <div className="rounded-full info_btn h-[80px] anim_btn flex-1 flex_center leading-none text-white">
                保存
              </div>
            </div>
          </motion.div>
        ) : null}
        {open === 1 ? (
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
        ) : null}
        {open === 2 ? (
          <motion.div
            {...fullAnimate}
            className="rounded-[10px] fixed z-40 top-0 w-full left-0 h-full flex flex-col"
          >
            <div className="flex-1 bg-white rounded-[10px] m-[10px] relative border-[#aaa] border-[2px] border-solid">
              <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-[3px] top-[-3px] origin-top-left rotate-1"></div>
              配置
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
        ) : null}
      </AnimatePresence>
    </div>
  );
}
