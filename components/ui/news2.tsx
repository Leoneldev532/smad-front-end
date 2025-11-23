import React from "react";

const News2 = () => {
  return (
    <section className="flex flex-col py-10">
      <div className="flex bg-neutral-700 border border-neutral-700/40 py-0.5 px-0.5 overflow-hidden rounded-xl justify-between">
        <div className="flex w-8/12 px-1.5 overflow-hidden justify-start items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 stroke-neutral-500"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>

          <label htmlFor="email-input" className="sr-only">
            Email
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="johndoe@gmail.com"
            className="px-2.5 appearance-none text-neutral-400 font-medium py-2.5 outline-none text-sm w-full bg-neutral-700 text-capitalize"
          />
        </div>
        <button
          className="px-3 w-1/3 rounded-xl py-1 text-black font-bold hover:bg-neutral-900 hover:text-white transition-all ease duration-300  text-sm bg-yellow-500"
          aria-label="Get monthly picks"
        >
          Get Monthly Picks
        </button>
      </div>
    </section>
  );
};

export default News2;
