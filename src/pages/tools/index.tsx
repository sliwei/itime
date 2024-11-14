import { ToastContainer, toast } from 'react-toastify'
import './index.less'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useUpdateEffect } from 'react-use'

export default function Index() {
  const [oldval, setOldval] = useState<string>(localStorage.oldval || '')
  const [val, setVal] = useState<string>('')
  const [trim1, setTrim1] = useState<boolean>(true)
  const [trim2, setTrim2] = useState<boolean>(false)
  const [comma1, setComma1] = useState<boolean>(false)
  const [comma2, setComma2] = useState<boolean>(false)
  const [deduplication, setDeduplication] = useState<boolean>(true)

  const change = (e: any) => {
    setOldval(e.target.value)
    localStorage.oldval = e.target.value
  }

  const oper = (tips = 0) => {
    const arr = oldval.split('\n')
    let data = arr.filter((item) => item)
    if (trim1) {
      data = data.map((item) => item.trim())
    }
    if (trim2) {
      data = data.map((item) => item.replace(/\s/g, ''))
    }
    if (comma1) {
      // 去首尾逗号
      data = data.map((item) => {
        if (item[0] === ',') {
          item = item.slice(1)
        }
        if (item[item.length - 1] === ',') {
          item = item.slice(0, item.length - 1)
        }
        return item
      })
    }
    if (comma2) {
      data = data.map((item) => {
        if (item[0] === '，') {
          item = item.slice(1)
        }
        if (item[item.length - 1] === '，') {
          item = item.slice(0, item.length - 1)
        }
        return item
      })
    }
    if (deduplication) {
      // 去重
      data = Array.from(new Set(data))
    }
    setVal(data.join(','))
    if (data.length && tips) {
      toast.dismiss()
      toast.success('操作成功')
    }
  }

  useUpdateEffect(() => {
    oper()
  }, [trim1, trim2, oldval, comma1, comma2])

  return (
    <div className="w-screen h-screen">
      <div className="h-[50px] flex_center mb-[30px] text-[28px]">
        <div className="mr-[20px]">
          去重 <input onChange={(e) => setDeduplication(e.target.checked)} checked={deduplication} className="w-[24px] h-[24px]" type="checkbox" name="" id="" />
        </div>
        <div className="mr-[20px]">
          去首尾空格 <input onChange={(e) => setTrim1(e.target.checked)} checked={trim1} className="w-[24px] h-[24px]" type="checkbox" name="" id="" />
        </div>
        <div className="mr-[20px]">
          去所有空格 <input onChange={(e) => setTrim2(e.target.checked)} checked={trim2} className="w-[24px] h-[24px]" type="checkbox" name="" id="" />
        </div>
        <div className="mr-[20px]">
          去英文逗号 <input onChange={(e) => setComma1(e.target.checked)} checked={comma1} className="w-[24px] h-[24px]" type="checkbox" name="" id="" />
        </div>
        <div className="mr-[20px]">
          去中文逗号 <input onChange={(e) => setComma2(e.target.checked)} checked={comma2} className="w-[24px] h-[24px]" type="checkbox" name="" id="" />
        </div>

        {/* <div>
          添加逗号 <input className="w-[24px] h-[24px]" type="checkbox" name="" id="" />
        </div> */}
      </div>
      <div className="flex_center h-[500px] mb-[30px]">
        <textarea value={oldval} onChange={change} className="text-[24px] h-full flex-1 p-[5px] m-[5px]" placeholder="原数据" />
        <textarea value={val} readOnly className="text-[24px] h-full flex-1 p-[5px] m-[5px]" placeholder="去重后数据" />
      </div>
      <div className="p-[5px] flex">
        <button onClick={() => oper(1)} className="rounded-[4px] cursor-pointer w-[140px] h-[40px] flex_center text-[16px] text-white border-none mr-[20px] bg-green-500 hover:bg-green-700">
          执行
        </button>
        <button
          onClick={() => {
            setOldval('')
            localStorage.oldval = ''
          }}
          className="rounded-[4px] cursor-pointer w-[140px] h-[40px] flex_center text-[16px] text-white border-none mr-[20px] bg-red-500 hover:bg-red-700"
        >
          清除
        </button>
      </div>
      <ToastContainer position="bottom-right" className="toast-container text-[24px]" toastClassName="toast-class" bodyClassName="toast-body-class" />
    </div>
  )
}
