import { useSetAtom } from 'jotai'
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
import leftArrowImg from '@/assets/img/left-arrow.png'
import passwordImg from '@/assets/img/password.png'
import asteriskImg from '@/assets/img/asterisk.png'
import starImg from '@/assets/img/star.png'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import MaskLoading from '@/components/MaskLoading'
import { useAsyncFn } from 'react-use'
import { loginKey } from '@/api/record'
import CryptoJS from 'crypto-js'
import { isLockState } from '@/store/global'
import { sleep } from '@/utils'
import { Slide, toast } from 'react-toastify'

export const fullAnimate = {
  initial: { y: '-110%' },
  animate: { y: 0 },
  exit: { y: '-110%' },
  transition: {
    duration: 0.25,
    type: 'spring',
    damping: 40,
    stiffness: 600
  }
}

export const fullAnimate2 = {
  initial: { y: '120%' },
  animate: { y: 0 },
  exit: { y: '120%' },
  transition: {
    duration: 0.25,
    type: 'spring',
    damping: 40,
    stiffness: 600
  }
}

export const maskAnimate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 }
}

export const defAnimate = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.3 },
  transition: {
    duration: 0.25,
    type: 'spring',
    damping: 35,
    stiffness: 600
  }
}
export default function Index() {
  const setIsLock = useSetAtom(isLockState)
  const [passwordTxt, setPasswordTxt] = useState<(number | '*')[]>([])

  const add = (num: number | '*') => {
    if (num === -1) {
      // 删除最后一个
      setPasswordTxt(passwordTxt.slice(0, passwordTxt.length - 1))
    } else if (passwordTxt.length < 6) {
      setPasswordTxt([...passwordTxt, num])
    }
  }

  useEffect(() => {
    if (passwordTxt.length >= 6) {
      loginKeyFetch(passwordTxt)
    }
  }, [passwordTxt])

  // 登录密钥
  const [loginKeyState, loginKeyFetch] = useAsyncFn(async (pwd) => {
    await sleep()
    const res = await loginKey({
      pwd: CryptoJS.MD5(pwd.join('')).toString()
    })
    console.log(res)
    if (res.code !== 0) {
      setPasswordTxt([])
      toast.error(res.msg, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide
      })
      return ''
    }
    localStorage.token = res.data.token
    setIsLock(1)
    return res.data
  }, [])

  return (
    <>
      {/* 解锁 */}
      <motion.div {...fullAnimate} className="w-full h-full flex_center flex-col z-10 font-normal">
        <img className="z-40 w-[100px] h-[100px]" src={passwordImg} alt="" />
        <div className="z-40 w-[300px] h-[50px] flex gap-[6px] items-center justify-start border-[8px] mt-[-14px] rounded-[6px] border-solid border-[#E84049]">
          <AnimatePresence>
            {passwordTxt.map((v, i) => (
              <motion.div key={i} {...defAnimate} className="w-[45px] h-[45px] flex_center">
                <img className="w-[45px] h-[45px]" src={asteriskImg} alt="" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="z-40 text-[20px] mb-[40px] leading-none">输入密钥解锁</div>
        <div className="z-40 flex flex-wrap w-[320px] gap-[10px]">
          <img onClick={() => add(1)} className="w-[100px] h-[100px] anim_btn" src={n1Img} alt="" />
          <img onClick={() => add(2)} className="w-[100px] h-[100px] anim_btn" src={n2Img} alt="" />
          <img onClick={() => add(3)} className="w-[100px] h-[100px] anim_btn" src={n3Img} alt="" />
          <img onClick={() => add(4)} className="w-[100px] h-[100px] anim_btn" src={n4Img} alt="" />
          <img onClick={() => add(5)} className="w-[100px] h-[100px] anim_btn" src={n5Img} alt="" />
          <img onClick={() => add(6)} className="w-[100px] h-[100px] anim_btn" src={n6Img} alt="" />
          <img onClick={() => add(7)} className="w-[100px] h-[100px] anim_btn" src={n7Img} alt="" />
          <img onClick={() => add(8)} className="w-[100px] h-[100px] anim_btn" src={n8Img} alt="" />
          <img onClick={() => add(9)} className="w-[100px] h-[100px] anim_btn" src={n9Img} alt="" />
          <img onClick={() => add('*')} className="w-[100px] h-[100px] anim_btn" src={starImg} alt="" />
          <img onClick={() => add(0)} className="w-[100px] h-[100px] anim_btn" src={n0Img} alt="" />
          <img onClick={() => add(-1)} className="w-[100px] h-[100px] anim_btn" src={leftArrowImg} alt="" />
        </div>
        <div className="absolute z-30 top-0 w-full left-0 h-full backdrop-blur-sm"></div>
      </motion.div>
      <MaskLoading state={loginKeyState.loading} time={2000} />
    </>
  )
}
