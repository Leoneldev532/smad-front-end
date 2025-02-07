import React from 'react'
            
const News3 = () => {
  return (
    <section className="flex flex-col py-10">
    <div className="flex bg-neutral-700 border border-neutral-700/40 overflow-hidden px-2  items-center rounded-full ">
      <div className="flex w-full overflow-hidden justify-start items-center">
        
  
        <label htmlFor="email-input" className="sr-only">Email</label>
        <input
          id="email-input"
          type="email" 
          placeholder="johndoe@gmail.com"
          className="px-2.5 appearance-none text-neutral-400 font-medium py-2.5 outline-none text-sm w-full bg-neutral-700 text-capitalize"
        />
      </div>
      <button 
        className="size-6 rounded-full py-1 text-black font-bold flex px-1.5 justify-center items-center hover:bg-neutral-900 hover:text-white transition-all ease duration-300  text-sm bg-yellow-500" 
        aria-label="Get monthly picks" 
      >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>

      </button>
    </div>
  </section>
  
  );
}

export default News3