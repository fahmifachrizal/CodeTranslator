import * as Bootstrap from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const { activeMenu } = useSelector((state) => state.uxReducer);
  // const handleChangeMenu = (menu) => {
  //   dispatch(changeMenu(menu));
  //   navigate(`/${menu=='home'?'':menu}`)
  // }

  return (
    <div className='fixed top-0 w-full px-12 z-50 font-jost bg-white'>
      <div className='flex items-center h-full border-b-[1px] py-4'>
        <div className="flex-1">
          <p className="select-none">
            <span className="text-2xl font-medium text-blue-600">C</span>
            <span className="text-2xl font-medium text-amber-400">o</span>
            <span className="text-2xl font-medium text-green-600">d</span>
            <span className="text-2xl font-medium text-red-600">e</span>
            <span className="text-2xl text-slate-700"> Translate</span>
          </p>
        </div>
        <div className="flex gap-x-8 items-center">
          <button className="flex items-center gap-x-2">
            <Bootstrap.BsCodeSlash className="text-xl"/>
            <span className="text-xl"> Code</span>
          </button>
          <button className="flex items-center gap-x-2">
            <Bootstrap.BsFileEarmarkCode className="text-xl"/>
            {/* <Bootstrap.BsFileEarmarkCodeFill className="text-xl"/> */}
            <span className="text-xl"> Document</span>
          </button>
          <div className="group flex p-2 h-10 w-10 rounded-full border-[1px] overflow-hidden relative items-center justify-center cursor-pointer">
            <div className="w-32 h-full bg-gradient-to-r from-amber-200 via-amber-200 via-40% to-slate-800 to-60% absolute translate-x-8 group-hover:-translate-x-8 duration-200"></div>
            <Bootstrap.BsSun className="text-2xl group-hover:-translate-x-8 duration-200 absolute"/>
            <Bootstrap.BsMoonStars className="text-xl translate-x-8 group-hover:translate-x-0 duration-200 absolute text-white"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar