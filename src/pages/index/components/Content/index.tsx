import cardTopImg from "@/assets/img/card-top.jpg";
import graphImg from "@/assets/img/graph.png";
import localImg from "@/assets/img/1189872.png";
import { motion } from "framer-motion";
import MaskLoading from "@/components/MaskLoading";
import { fullAnimate, fullAnimate2 } from "../..";
import { useAsyncFn } from "react-use";
import { useEffect, useState } from "react";
import { recordFindAll } from "@/api/record";
import dayjs from "dayjs";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useAtomValue, useSetAtom } from "jotai";
import { updateListState, Record, lastRecordState } from "@/store/global";
import useGetState from "@/hooks/useGetState";

// {
//   type: "video" as const,
//   title: "Big Buck Bunny",
//   description:
//     "The Peach Open Movie Project\n\nBlender Institute, Netherlands",
//   width: 1280,
//   height: 720,
//   poster:
//     "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
//   sources: [
//     {
//       src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//       type: "video/mp4",
//     },
//   ],
// },

export default function Index() {
  const [page, setPage, getPage] = useGetState(1);
  const setLastRecord = useSetAtom(lastRecordState);
  const updateList = useAtomValue(updateListState);
  const [advancedExampleOpen, setAdvancedExampleOpen] = useState(false);
  const [advancedSlides, setAdvancedSlides] = useState([]);
  console.log(advancedExampleOpen);

  useEffect(() => {
    setPage(1);
    recordFindAllFetch();
  }, [updateList]);

  // 登录密钥
  const [recordFindAllState, recordFindAllFetch] = useAsyncFn(async () => {
    const p = getPage();
    const res = await recordFindAll({
      page: p,
      size: 100,
      order: [["etime", "DESC"]],
    });
    console.log(res);
    if (res.code !== 0) {
      return "";
    }
    if (p === 1 && res.data.list.length > 0) {
      setLastRecord(res.data.list[0]);
    }
    return res.data;
  }, []);

  return (
    <>
      {/* 内容 */}
      <motion.div
        {...fullAnimate}
        className="relative z-10 bg-white rounded-[10px] overflow-hidden shadow-yellow-600 m-[10px] p-[10px]"
      >
        <div className="absolute w-[2px] h-[88%] bg-[#aaa] left-[20px]"></div>
        <div className="absolute w-[2px] h-[88%] bg-[#aaa] left-[20px] origin-center rotate-1"></div>
        {recordFindAllState.value?.list?.map((v: Record, i) => (
          <div key={v.id} className="py-[10px] text-[30px]">
            {/* 时间 */}
            <div className="flex justify-start items-center">
              <div className="bg-[#f38181] min-h-[20px] min-w-[20px] px-[10px] ml-[-10px] relative flex_center flex-col">
                <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
                {i === 0 ? (
                  <p className="leading-[1]">{dayjs(v.etime).format("MM月")}</p>
                ) : null}
                {i === 0 ? (
                  <p className="leading-[1]">{dayjs(v.etime).format("DD日")}</p>
                ) : null}
              </div>
              {i === 0 ? (
                <div className="ml-[10px]">
                  {dayjs(v.etime).format("HH时mm分ss秒")}
                </div>
              ) : (
                <div className="ml-[10px]">
                  {" "}
                  {dayjs(v.etime).format("MM月DD日HH时mm分ss秒")}
                </div>
              )}

              <div className="flex-1 flex justify-end items-center pl-[40px] info_bg rounded-tr-[50px]">
                <img className="w-[30px] h-[30px]" src={graphImg} alt="" />
                <div>
                  {v.weight}kg,{v.height}cm
                </div>
              </div>
            </div>
            {/* 文字 */}
            <div className="leading-[1.2] pl-[40px] my-[20px]">{v.message}</div>
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
              {JSON.parse(v.media || "[]").map((media, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setAdvancedSlides(
                      JSON.parse(v.media || "[]").map((view) => ({
                        src: view,
                        // width: 3840,
                        // height: 5760,
                        // srcSet: [],
                        // title: "Puppy in sunglasses",
                        // description: "Mollie Sivaram",
                      }))
                    );
                    setAdvancedExampleOpen(true);
                  }}
                  className="w-[210px] h-[140px] border-[2px] border-[#aaa] border-solid rounded-[20px] mr-[4px] mb-[4px] relative"
                >
                  <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div>
                  <img
                    className="w-full h-full object-cover"
                    src={media}
                    alt=""
                  />
                </div>
              ))}
            </div>
            {/* 地址 */}
            <div className="text-[#666] text-[18px] leading-[1] pl-[40px] my-[20px] flex justify-start items-center">
              <img className="w-[30px] h-[30px]" src={localImg} alt="" />
              {v.address}
            </div>
          </div>
        ))}
      </motion.div>
      {/* 操作占位 */}
      <div className="bg-white w-full h-[140px]"></div>

      <Lightbox
        open={advancedExampleOpen}
        close={() => setAdvancedExampleOpen(false)}
        slides={advancedSlides}
        plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
      />

      <MaskLoading state={false} time={2000} />
    </>
  );
}
