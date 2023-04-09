import * as Bootstrap from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { changeAPIkey, createProfile, switchDarkMode } from "../stores/actionCreator";
import { useEffect, useState } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const { darkMode, menu } = useSelector((state) => state.uxReducer)
  const { APIkey } = useSelector((state) => state.userReducer)
  const [ tempKey, setTempKey ] = useState('')

  const handleSwitchDarkMode = () => {
    if (!darkMode) { document.getElementsByTagName('html')[0].classList.add('dark')} 
    else { document.getElementsByTagName('html')[0].classList.remove('dark')}
    dispatch(switchDarkMode(!darkMode));
  }

  const handleAnonymous = () => {
    dispatch(createProfile())
  }
  
  const handleValidateKey = ()=>{
    dispatch(changeAPIkey(tempKey))
  }

  useEffect(()=>{
    const sysPrefDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (sysPrefDarkMode) { document.getElementsByTagName('html')[0].classList.add('dark')}
    dispatch(switchDarkMode(sysPrefDarkMode));
    const key = localStorage.getItem('APIkey');
    if (key) {
      dispatch(changeAPIkey(key))
    }
  },[])


  return (
    <div className='fixed top-0 w-full px-12 z-50 font-jost bg-white dark:bg-[#0e1117]'>
      <div className='flex items-center h-full py-4 gap-x-4'>
        <div className="">
          <p className="select-none">
            <span className="text-2xl font-medium text-blue-600">C</span>
            <span className="text-2xl font-medium text-amber-400">o</span>
            <span className="text-2xl font-medium text-green-600">d</span>
            <span className="text-2xl font-medium text-red-600">e</span>
            <span className="text-2xl text-slate-700 dark:text-slate-200"> Translate</span>
          </p>
        </div>
        <div className="flex flex-1 gap-x-8 items-center">
          <button className={`flex items-center gap-x-2 px-2 ${menu=='code'?'border-b border-b-gray-500':''}`}>
            <Bootstrap.BsCodeSlash className="text-xl dark:text-slate-200"/>
            <span className="text-xl dark:text-slate-200"> Code</span>
          </button>
          <button className={`flex items-center gap-x-2 px-2 ${menu=='document'?'border-b border-b-gray-500':''}`} disabled>
            <Bootstrap.BsConeStriped className="text-xl text-amber-400"/>

            {
              darkMode?
                <Bootstrap.BsFileEarmarkCodeFill className="text-xl dark:text-slate-200"/>
              :
                <Bootstrap.BsFileEarmarkCode className="text-xl dark:text-slate-200"/>
            }
            <span className="text-xl dark:text-slate-200"> Document</span>
            <Bootstrap.BsConeStriped className="text-xl text-amber-400"/>

          </button>
        </div>
        <div className="flex gap-x-4 items-center">

          {
            APIkey?
              <>
                <button className="bg-green-400 py-1 px-2 rounded-lg" disabled>
                  <span className="text-indigo-950 font-medium">API Key loaded</span>
                </button>
                <button className="bg-red-600 py-1 px-2 rounded-lg" onClick={()=>{
                  localStorage.removeItem('APIkey')
                  dispatch(changeAPIkey(''))
                }}>
                  <Bootstrap.BsTrash3 className="text-xl text-white"/>
                </button>
              </>
              :
              <>
                {/* <span className="dark:text-gray-200">Enter your OpenAI API Key:</span> */}
                <div className="bg-[#e1e2e7] dark:bg-[#24283b] flex items-center gap-x-2 py-1 rounded-lg">
                  <div className="relative group">
                    <Bootstrap.BsInfoCircle className="text-md dark:text-slate-200 ml-2 cursor-pointer"/>
                    <div className="absolute w-72 bg-white -bottom-36 hidden group-hover:block text-sm dark:text-slate-200 dark:bg-[#1a1b26] border">
                      <ul className="pl-8 pr-4 py-2 list-disc">
                        <li>
                          <p>To get an OpenAI API key, you need to create an OpenAI account, log in, and then generate an API key from the API settings page.</p>
                        </li>
                        <li>
                          <p>Your key will be saved locally on your machine</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <form action="" autoComplete="off">
                    <div>
                      <input onChange={(e)=>setTempKey(e.target.value)} type="password" autoComplete="off" placeholder="Use your own OpenAI API Key" className="w-64 pr-2 bg-[#e1e2e7] dark:bg-[#24283b] dark:text-white" />
                    </div>
                  </form>
                </div>
                <button className="bg-green-300 py-1 px-2 rounded-lg text-indigo-950 font-medium" onClick={handleValidateKey}>Validate Key</button>
                {/* <div>
                  <span className="dark:text-slate-200">Or</span>
                </div>
                <button className="bg-[#c8e6fc] py-1 px-2 rounded-lg" onClick={handleAnonymous} disabled>
                  <span className="text-indigo-950 font-medium">Get Free 1000 Token</span>
                </button> */}
              </>
          }

        </div>
        <button className="flex p-2 h-10 w-10 rounded-full overflow-hidden relative items-center justify-center cursor-pointer" onClick={handleSwitchDarkMode}>
          <Bootstrap.BsMoonStars className={`text-xl absolute ${darkMode?'text-white':''}`}/>
        </button>
      </div>
    </div>
  )
}

export default Navbar