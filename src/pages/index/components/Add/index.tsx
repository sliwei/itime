import closeImg from "@/assets/img/close.png";
import { motion } from "framer-motion";
import MaskLoading from "@/components/MaskLoading";
import { fullAnimate, maskAnimate } from "../..";
import { lastRecordState, openState, updateListState } from "@/store/global";
import { useAtomValue, useSetAtom } from "jotai";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { PickerPanel } from "rc-picker";
// import "rc-picker/assets/index.css";
import zhCN from "rc-picker/lib/locale/zh_CN";
import dayjsGenerateConfig from "rc-picker/es/generate/dayjs";
import { useRef, useState } from "react";
import "./index.less";
import Modal from "@/components/Modal";
import { useAsyncFn, useToggle } from "react-use";
import localImg from "@/assets/img/1189872.png";
import calendarImg from "@/assets/img/calendar.png";
import addImg from "@/assets/img/add.png";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { recordCreate } from "@/api/record";
import { sleep } from "@/utils";
import { Slide, toast } from "react-toastify";
import { upload } from "@/api/global";

dayjs.locale("zh-cn");

export default function Index() {
  const setOpen = useSetAtom(openState);
  const setUpdateList = useSetAtom(updateListState);
  const lastRecord = useAtomValue(lastRecordState);
  const [checkDateState, setCheckDateState] = useToggle(false);
  const [checkAddrState, setCheckAddrState] = useToggle(false);
  const [etime, setEtime] = useState<Dayjs>(dayjs()); // 选择的时间
  const [imgList, setImgList] = useState<string[]>([]); // 图片列表
  const [address, setAddress] = useState(""); // 地址
  const [coordinates, setCoordinates] = useState(""); // 坐标
  const [message, setMessage] = useState(""); // 内容
  const [height, setHeight] = useState(lastRecord?.height); // 身高
  const [weight, setWeight] = useState(lastRecord?.weight); // 体重
  const fileInput = useRef<HTMLInputElement>(null);

  const reset = () => {
    console.log("lastRecord", lastRecord);
    setEtime(dayjs());
    setImgList([]);
    setAddress("未知");
    setCoordinates("");
    setMessage("");
    setHeight(lastRecord?.height);
    setWeight(lastRecord?.weight);
  };

  const onChange = (newValue: Dayjs, formatString?: string) => {
    setEtime(newValue);
  };

  const sharedProps = {
    generateConfig: dayjsGenerateConfig,
    value: etime,
    onChange,
  };

  // H5选择图片
  const [fileChangeState, fileChangeFetch] = useAsyncFn(async (e) => {
    await sleep(1000);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    fileInput.current!.value = "";
    let formdata = new FormData();
    formdata.append("file", file);
    const res = await upload(formdata);
    setImgList((v) => [...v, res.data.data.url]);
    return res.data.data.url;
  }, []);

  // 保存
  const [saveState, saveFetch] = useAsyncFn(async () => {
    await sleep(1000);
    const res = await recordCreate({
      cell: {
        message,
        etime,
        height,
        weight,
        media: JSON.stringify(imgList),
        address,
        coordinates,
      },
    });
    console.log(res);
    if (res.code !== 0) {
      return "";
    }
    toast.success(res.msg, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
    setOpen(-1);
    setUpdateList(Math.random());
    return res.data;
  }, [imgList, etime, height, weight, message, address, coordinates]);

  return (
    <>
      <motion.div
        {...maskAnimate}
        className="w-screen h-screen fixed top-0 left-0 z-30 backdrop-blur-xl"
      ></motion.div>
      <motion.div
        {...fullAnimate}
        className="rounded-[10px] fixed z-40 top-0 w-full left-0 h-full flex flex-col text-[30px]"
      >
        <div className="flex-1 bg-white rounded-[10px] m-[10px] relative border-[#fae3d9] border-[2px] border-solid">
          {/* <div className="absolute z-0 w-full h-full border-[2px] border-[#aaa] border-solid left-[3px] top-[-3px] origin-top-left rotate-1"></div> */}
          <img
            onClick={() => setOpen(-1)}
            className="h-[56px] w-[56px] anim_btn absolute z-20 right-[5px] top-[5px]"
            src={closeImg}
            alt=""
          />
          <div className="absolute z-10 w-full h-full flex flex-col p-[20px] box-border">
            <div>文本：</div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="请输入内容"
              style={{ fontFamily: "HYYouYuan-65W" }}
              className="w-full border-[2px] box-border border-solid rounded-[10px] border-[#fae3d9] mb-[20px] p-[5px] text-[24px] text-[#111]"
            />
            <div>媒体：</div>
            <div className="mb-[20px] flex gap-[10px] flex-wrap flex-1 content-start">
              {imgList.map((media, index) => (
                <div
                  key={index}
                  className="w-[210px] h-[140px] border-[2px] border-[#fae3d9] border-solid rounded-[10px] box-border overflow-hidden mr-[4px] mb-[4px] relative"
                >
                  {/* <div className="absolute w-full h-full border-[2px] border-[#aaa] border-solid left-0 top-0 skew-x-2 origin-top-left rotate-1"></div> */}
                  <img
                    onClick={() => {
                      setImgList((v) => v.filter((_, i) => i !== index));
                    }}
                    className="h-[30px] w-[30px] anim_btn absolute z-20 right-[5px] top-[5px]"
                    src={closeImg}
                    alt=""
                  />
                  <img
                    className="w-full h-full object-cover"
                    src={media}
                    alt=""
                  />
                </div>
              ))}
              <div
                className="w-[140px] h-[140px] border-[#fae3d9] box-border border-[2px] border-solid rounded-[10px] mr-[4px] mb-[4px] relative flex_center anim_btn"
                onClick={() => fileInput.current?.click()}
              >
                <img className="w-[60px] h-[60px]" src={addImg} alt="" />
                <input
                  onChange={fileChangeFetch}
                  type="file"
                  ref={fileInput}
                  accept="image/*"
                  hidden
                />
              </div>
            </div>
            <div className="mb-[60px] flex w-full items-center">
              重：
              <Nouislider
                onChange={(v) => setWeight(Number(v[0]))}
                className="flex-1"
                range={{
                  min: lastRecord.weight - 5,
                  max: lastRecord.weight + 5,
                }}
                start={[weight]}
                pips={{ mode: "count", values: 5 }}
                clickablePips
                tooltips={[
                  {
                    from: (val) => Number(val),
                    to: (val) => val.toFixed(2) + "kg",
                  },
                ]}
                connect
              />
            </div>
            <div className="mb-[60px] flex w-full items-center">
              高：
              <Nouislider
                onChange={(v) => setHeight(Number(v[0]))}
                className="flex-1"
                range={{
                  min: lastRecord.height - 8,
                  max: lastRecord.height + 12,
                }}
                start={[height]}
                pips={{ mode: "count", values: 5 }}
                clickablePips
                tooltips={[
                  {
                    from: (val) => Number(val),
                    to: (val) => val.toFixed(2) + "cm",
                  },
                ]}
                connect
              />
            </div>
            <div
              className="flex items-center w-full rounded-[10px] border-[2px] box-border border-solid border-[#fff] mb-[20px] p-[5px] text-[30px] bg-[#fae3d9] anim_btn"
              onClick={setCheckAddrState}
            >
              <img className="w-[40px] h-[40px] mx-[5px]" src={localImg} />
              地址：{address}
            </div>
            <div
              className="flex items-center w-full rounded-[10px] border-[2px] box-border border-solid border-[#fff] p-[5px] text-[30px] bg-[#fae3d9] anim_btn"
              onClick={setCheckDateState}
            >
              <img className="w-[40px] h-[40px] mx-[5px]" src={calendarImg} />
              时间：{etime.format("YY年MM月DD日 HH时mm分ss秒")}
            </div>
          </div>
        </div>
        <div className="w-full h-[140px] flex justify-evenly items-center">
          <div
            className="anim_btn text-[40px] mt-[-40px] leading-none"
            onClick={reset}
          >
            重置
          </div>
          <div
            className="anim_btn text-[40px] mt-[-40px] leading-none"
            onClick={saveFetch}
          >
            保存
          </div>
        </div>
      </motion.div>
      <Modal show={checkAddrState} mode={1}>
        <div className="flex justify-end items-center flex-col h-screen w-screen">
          <div
            className="absolute z-0 w-full h-full"
            onClick={setCheckAddrState}
          ></div>
          <div className="absolute z-10 bg-white w-full flex justify-end items-center flex-col py-[40px]">
            <div className="mb-[20px]">位置</div>
            <div>地图</div>
            <div className="w-full flex justify-evenly items-center mt-[20px]">
              <div
                className="anim_btn text-[40px] mb-[20px] leading-none"
                onClick={setCheckAddrState}
              >
                取消
              </div>
              <div
                className="anim_btn text-[40px] mb-[20px] leading-none"
                onClick={setCheckAddrState}
              >
                确定
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={checkDateState} mode={1}>
        <div className="flex justify-end items-center flex-col h-screen w-screen">
          <div
            className="absolute z-0 w-full h-full"
            onClick={setCheckDateState}
          ></div>
          <div className="absolute z-10 bg-white w-full flex justify-end items-center flex-col py-[40px]">
            <div className="mb-[20px]">选择时间</div>
            <PickerPanel<Dayjs> {...sharedProps} locale={zhCN} showTime />
            <div className="w-full flex justify-evenly items-center mt-[20px]">
              <div
                className="anim_btn text-[40px] mb-[20px] leading-none"
                onClick={setCheckDateState}
              >
                取消
              </div>
              <div
                className="anim_btn text-[40px] mb-[20px] leading-none"
                onClick={setCheckDateState}
              >
                确定
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <MaskLoading
        state={saveState.loading || fileChangeState.loading}
        time={2000}
      />
    </>
  );
}
