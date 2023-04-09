import { useState } from "react";
import * as Bootstrap from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage, runTranslation } from "../stores/actionCreator";
import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import CodeMirror from '@uiw/react-codemirror';

function HomePage() {
  const dispatch = useDispatch();
  const { source, target, selection, darkMode } = useSelector((state) => state.uxReducer);
  const { APIkey } = useSelector((state) => state.userReducer);
  const [ langSelection, setLangSelection ] = useState({target:false, source:false});
  const [ code, setCode ] = useState('');
  const [ resultCode, setResultCode ] = useState('');
  const [ loading, setLoading ] = useState(false);

  // import.meta.env.VITE_OPENAI_API_KEY
  const toggleLangSelection = (sourceTarget) => {
    setLangSelection({target:false, source:false, [sourceTarget]:!langSelection[sourceTarget]})
  }

  const handleChangeLang = (lang, sourceTarget) => {
    dispatch(changeLanguage((!sourceTarget?(langSelection.source?'source':'target'):sourceTarget), lang))
  }

  const handleSwapLang = () => {
    dispatch(changeLanguage('source', target))
    dispatch(changeLanguage('target', source))
    setCode(resultCode)
    setResultCode(code)
  }

  const handleTranslate = async () => {
    if (!APIkey) {
      alert('Please enter an API key.');
      return;
    }

    if (source === target) {
      alert('Please select different languages.');
      return;
    }

    if (!code) {
      alert('Please enter some code.');
      return;
    }
    setLoading(true);
    const result = await dispatch(runTranslation(source, target, code, APIkey))
    if (!result.error) {
      setLoading(false);
      setResultCode(result.data.replace(/^\n/, ''))
    } else {
      setLoading(false);
      alert(result.error)
    }
        
  };

  return (
    <>
      {/* Code Translation */}
      <div className="pt-20 px-12 min-h-screen dark:bg-[#0e1117]">
        <div className="w-full relative">
          <div className="h-full w-full flex">

            <div className="w-1/2 bg-[#e1e2e7] dark:bg-[#1a1b26] px-12 rounded-l-3xl">
              <div className="flex gap-x-4 font-medium text-slate-500 pt-8 pb-6 border-b select-none dark:border-b-gray-200 border-b-gray-500">
                { source && <div className="bg-blue-100 text-indigo-950 p-4 rounded-xl dark:bg-[#c8e6fc]">{source}</div> }
                <div className="flex flex-1 overflow-clip">
                  { source!='JavaScript' && <button className="p-4" onClick={()=>handleChangeLang('JavaScript','source')}>Javascript</button>}
                  { source!='Python' && <button className="p-4" onClick={()=>handleChangeLang('Python','source')}>Python</button>}
                  { source!='Java' && <button className="p-4" onClick={()=>handleChangeLang('Java','source')}>Java</button>}
                </div>
                <button className="p-4 flex gap-x-4 items-center" onClick={()=>toggleLangSelection('source')}>
                  <span>Source</span>
                  <Bootstrap.BsChevronDown className={`text-lg ${langSelection.source?'rotate-180':'rotate-0'} duration-200`}/>
                </button>
              </div>
              {/* Text Area */}
              <div className="w-full pt-8">
                <CodeMirror
                  editable={{code:'', editable:false}}
                  value={code}
                  minHeight="500px"
                  // extensions={[StreamLanguage.define(go)]}
                  theme={darkMode?tokyoNight:tokyoNightDay}
                  placeholder="Type your code here..."
                  onChange={(value) => setCode(value)}
                  autoFocus={false}
                  lang={source}
                  options={{
                    mode: 'javascript',
                    theme: 'material',
                    lineNumbers: true,
                    ...StreamLanguage.define(go).options, // merge with extension options
                    styleSelectedText: true, // enable selection styling
                    styleSelectedTextBackground: '#FBC02D', // set selection background color
                    styleSelectedTextForeground: '#212121', // set selection text color
                  }}
                />
              </div>
              <div className="pb-8 text-gray-500 dark:text-gray-500 text-sm select-none">
                <p>Number of token used: {Math.round(code.length/4)}</p>
              </div>
            </div>

            <div className="w-1/2 bg-[#24283b] px-12  rounded-r-3xl">
              <div className="flex flex-row-reverse gap-x-4 font-medium text-slate-500 pt-8 pb-6 border-b select-none">
                { target && <div className="bg-[#c8e6fc] text-indigo-950 p-4 rounded-xl">{target}</div> }
                <div className="flex overflow-clip">
                { target!='JavaScript' && <button className="p-4" onClick={()=>handleChangeLang('JavaScript','target')}>Javascript</button>}
                  { target!='Python' && <button className="p-4" onClick={()=>handleChangeLang('Python','target')}>Python</button>}
                  { target!='Java' && <button className="p-4" onClick={()=>handleChangeLang('Java','target')}>Java</button>}
                </div>
                <div className=" flex-1">

                </div>
                <button className="p-4 flex gap-x-4 items-center" onClick={()=>toggleLangSelection('target')}>
                  <Bootstrap.BsChevronDown className={`text-lg ${langSelection.target?'rotate-180':'rotate-0'} duration-200`}/>
                  <span>Target</span>
                </button>
              </div>
              {/* Text Area */}
              <div className="w-full py-8">
                <CodeMirror
                  editable={false}
                  value={resultCode}
                  minHeight="500px"
                  extensions={[StreamLanguage.define(go)]}
                  theme={tokyoNightStorm}
                  lang={target}
                  // onChange={(value) => onChange(value)}
                />
              </div>
            </div>
          </div>

          {/* Dropdown language selection */}
          { (langSelection.target || langSelection.source) &&
            <div className="top-32 w-full absolute px-20 z-50">
              <div className=" bg-white rounded-3xl border-rounded border-[1px] px-4 dark:bg-slate-700 dark:border-slate-600">

                <div className="pt-8 px-4 w-full flex justify-center">
                  <span className="text-xl font-semibold select-none text-slate-700 dark:text-slate-300">{langSelection.source?'Source':'Target'}</span>
                </div>
                <div className="grid grid-cols-6 p-4">
                  {
                    selection.map((el, index)=>{
                      return (
                        <button className="pl-8 bg-white text-left p-2 hover:bg-blue-50 rounded-xl text-slate-500 hover:text-slate-700 dark:bg-slate-700 dark:hover:text-gray-200 dark:hover:bg-slate-500" 
                          key={index} onClick={()=>handleChangeLang(el.value)}>
                          <span className="text-sm ">{ el.value }</span>
                        </button>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          }
          <div className="top-1/2 left-1/2 absolute flex justify-center flex-col gap-4 -translate-x-1/2 -translate-y-1/2">
            <button className="flex flex-col items-center justify-center p-3 bg-[#e1e2e7] dark:bg-[#1a1b26] rounded-r-full h-20 w-20" onClick={handleTranslate}>
              {
                loading?
                  <svg className="h-6 w-6 animate-spin" viewBox="3 3 18 18">
                    <path
                      className="fill-gray-200"
                      d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                    <path
                      className="fill-gray-800"
                      d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                  </svg>
                  :
                  <>
                    <Bootstrap.BsTranslate className="text-2xl text-slate-500"/>
                    <p className="text-xs pt-1 text-slate-500 font-semibold">Translate</p>
                  </>
              }
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-[#24283b] rounded-l-full h-20 w-20" onClick={handleSwapLang}>
              <Bootstrap.BsArrowLeftRight className="text-2xl text-slate-500"/>
              <p className="text-xs pt-1 text-slate-500 font-semibold">Swap</p>
            </button>

          </div>
        </div>
      </div>

    </>
  );
}

export default HomePage;