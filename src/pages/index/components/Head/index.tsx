import headImg from '@/assets/img/f0d9fd95-a5f0-474d-98b0-d51e8450f2cf.png'
import n0Img from '@/assets/img/0.png'
import n1Img from '@/assets/img/1.png'
import n2Img from '@/assets/img/2.png'
import n3Img from '@/assets/img/3.png'
import n4Img from '@/assets/img/4.png'
import n5Img from '@/assets/img/5.png'
import n6Img from '@/assets/img/6.png'
import n7Img from '@/assets/img/7.png'
import n8Img from '@/assets/img/8.png'
import n9Img from '@/assets/img/9.png'
import { motion } from 'framer-motion'
import MaskLoading from '@/components/MaskLoading'
import { fullAnimate } from '../..'

const Numbers = [n0Img, n1Img, n2Img, n3Img, n4Img, n5Img, n6Img, n7Img, n8Img, n9Img]

export default function Index() {
  return (
    <>
      {/* 顶部 */}
      <motion.div {...fullAnimate} className="fixed w-full h-full top-0 z-0 bg-repeat">
        <div className="relative z-10 p-[20px] text-[#f38181]">
          <div className="text-[50px]">
            沫沫<span className="text-[30px] text-[#666]">(Happy泡沫)</span>
          </div>
          <div className="text-[#666] text-[24px]">
            宝宝 <span className="text-[#f38181] text-[40px]">2</span> 岁 <span className="text-[#f38181] text-[40px]">26</span> 天 <span className="text-[#f38181] text-[40px]">12</span> 小时辣
          </div>
          <div className="text-[#666] text-[24px]">
            距 <span className="text-[#f38181] text-[40px]">2</span> 岁还有 <span className="text-[#f38181] text-[40px]">162</span> 天
          </div>

          <div className="absolute right-[20px] top-[20px] rounded-full w-[120px] h-[120px]">
            {/* <div className="absolute w-full h-full rounded-full border-[2px] border-[#fff] border-solid left-0 top-0 skew-x-1 origin-top-left rotate-1"></div> */}
            <div className="rounded-full w-full h-full overflow-hidden">
              <img className="w-full h-full" src={headImg} alt="" />
            </div>
          </div>
        </div>
      </motion.div>
      {/* 顶部占位 */}
      <div className="relative z-10 h-[250px] w-full"></div>

      <MaskLoading state={false} time={2000} />
    </>
  )
}
