import React from "react";

function HomePage() {
  return (
    <>
      <div className="pt-16 px-12 w-full">
          {/* Code Translation */}
          <div className="h-full w-full flex">
            <div className="flex flex-1 gap-x-4 font-medium text-slate-500 pt-12 pb-6 mr-12 border-b">
              <button className="bg-[#c8e6fc] text-indigo-950 p-4 rounded-xl">Natural Language</button>
              <button className="p-4">Javascript</button>
              <button className="p-4">Python</button>
              <button className="p-4">Java</button>
              
            </div>
            <div className="flex-1 bg-[#f4f7fc]">
              <div className="flex flex-1 gap-x-4 font-medium text-slate-500 pt-12 pb-6 ml-12 border-b">
                <button className="bg-[#c8e6fc] text-indigo-950 p-4 rounded-xl">Natural Language</button>
                <button className="p-4">Javascript</button>
                <button className="p-4">Python</button>
                <button className="p-4">Java</button>
                
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default HomePage;


/* <select class="w-full rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200">
  <option value="Assembly Language">Assembly Language</option>
  <option value="Bash">Bash</option>
  <option value="C">C</option>
  <option value="C#">C#</option>
  <option value="C++">C++</option>
  <option value="Clojure">Clojure</option>
  <option value="COBOL">COBOL</option>
  <option value="CoffeeScript">CoffeeScript</option>
  <option value="CSS">CSS</option>
  <option value="Dart">Dart</option>
  <option value="Elixir">Elixir</option>
  <option value="Fortran">Fortran</option>
  <option value="Go">Go</option>
  <option value="Groovy">Groovy</option>
  <option value="Haskell">Haskell</option>
  <option value="HTML">HTML</option>
  <option value="Java">Java</option>
  <option value="JavaScript" selected="">JavaScript</option>
  <option value="JSX">JSX</option>
  <option value="Julia">Julia</option>
  <option value="Kotlin">Kotlin</option>
  <option value="Lisp">Lisp</option>
  <option value="Lua">Lua</option>
  <option value="Matlab">Matlab</option>
  <option value="Natural Language">Natural Language</option>
  <option value="NoSQL">NoSQL</option>
  <option value="Objective-C">Objective-C</option>
  <option value="Pascal">Pascal</option>
  <option value="Perl">Perl</option>
  <option value="PHP">PHP</option>
  <option value="PL/SQL">PL/SQL</option>
  <option value="Powershell">Powershell</option>
  <option value="Python">Python</option>
  <option value="R">R</option>
  <option value="Racket">Racket</option>
  <option value="Ruby">Ruby</option>
  <option value="Rust">Rust</option>
  <option value="SAS">SAS</option>
  <option value="Scala">Scala</option>
  <option value="SQL">SQL</option>
  <option value="Swift">Swift</option>
  <option value="SwiftUI">SwiftUI</option>
  <option value="TSX">TSX</option>
  <option value="TypeScript">TypeScript</option>
  <option value="Visual Basic .NET">Visual Basic .NET</option>
  <option value="Vue">Vue</option>
</select> */