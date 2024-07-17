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
  const [imgList, setImgList] = useState([]); // 图片列表
  const [address, setAddress] = useState("未知"); // 地址
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
  const fileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    console.log(file)
    let formdata = new FormData();
    formdata.append("file", file);
    formdata.append("name", file.name);
    upload(file, file.name).then((res) => {
      console.log(res);
    });
  };

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
        className="w-full h-full absolute z-30 backdrop-blur-xl top-0 left-0"
      ></motion.div>
      <motion.div
        {...fullAnimate}
        className="rounded-[10px] fixed z-40 top-0 w-full left-0 h-full flex flex-col"
      >
        <div className="flex-1 bg-white rounded-[10px] m-[10px] relative border-[#aaa] border-[2px] border-solid">
          <div className="absolute z-0 w-full h-full border-[2px] border-[#aaa] border-solid left-[3px] top-[-3px] origin-top-left rotate-1"></div>

          <div className="absolute z-10 w-full h-full flex flex-col p-[20px] box-border">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="请输入内容"
              style={{ fontFamily: "Haiyanzhishidongdong" }}
              className="w-full border-[4px] box-border border-solid border-[#111] mb-[20px] p-[5px] text-[24px] text-[#111]"
            />
            <div className="mb-[20px] flex gap-[10px] flex-wrap flex-1 content-start">
              {imgList.map((media, index) => (
                <div
                  key={index}
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

              <div className="w-[210px] h-[140px] rounded-[20px] mr-[4px] mb-[4px] relative flex_center">
                <img
                  className="w-[140px] h-[140px] anim_btn"
                  src={addImg}
                  onClick={() => fileInput.current?.click()}
                  alt=""
                />
                <input
                  onChange={fileChange}
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
                  min: lastRecord.height - 10,
                  max: lastRecord.height + 10,
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
              className="flex items-center w-full rounded-[10px] border-[4px] box-border border-solid border-[#111] mb-[20px] p-[5px] text-[30px] bg-[#ffacac] anim_btn"
              onClick={setCheckAddrState}
            >
              <img className="w-[50px] h-[50px]" src={localImg} />
              地址：{address}
            </div>
            <div
              className="flex items-center w-full rounded-[10px] border-[4px] box-border border-solid border-[#111] p-[5px] text-[30px] bg-[#ffacac] anim_btn"
              onClick={setCheckDateState}
            >
              <img className="w-[50px] h-[50px]" src={calendarImg} />
              时间：{etime.format("YY年MM月DD日 HH时mm分ss秒")}
            </div>
          </div>
        </div>
        <div className="w-full h-[140px] flex justify-evenly items-center">
          <div className="anim_btn text-[#e45a84]" onClick={reset}>
            重置
          </div>
          <img
            onClick={() => setOpen(-1)}
            className="h-[140px] w-[140px] anim_btn"
            src={closeImg}
            alt=""
          />
          <div className="anim_btn text-[#2E7D32]" onClick={saveFetch}>
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
                className="anim_btn text-[#e45a84]"
                onClick={setCheckAddrState}
              >
                取消
              </div>
              <div
                className="anim_btn text-[#2E7D32]"
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
                className="anim_btn text-[#e45a84]"
                onClick={setCheckDateState}
              >
                取消
              </div>
              <div
                className="anim_btn text-[#2E7D32]"
                onClick={setCheckDateState}
              >
                确定
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <MaskLoading state={saveState.loading} time={2000} />
    </>
  );
}
