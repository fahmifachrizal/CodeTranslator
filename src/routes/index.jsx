import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CodeTranslationPage from "../views/CodeTranslationPage"

// Route definition
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    // loader: ()=>{
    //   const guarder = localStorage.getItem('userId')
    //   if (!guarder){
    //     return redirect('/welcome')
    //   }
    //   return null
    // },
    children:[
      {
        path:'/',
        element: <CodeTranslationPage />
      }
    ]
  },
  // {
  //   path:'/welcome',
  //   element: <LandingPage />,
  //   loader: ()=>{
  //     const guarder = localStorage.getItem('userId')
  //     if (guarder){
  //       return redirect('/')
  //     }
  //     return null
  //   },
  // }, 
])


export default router