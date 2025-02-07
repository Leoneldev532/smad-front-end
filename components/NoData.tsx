

import React from 'react'

const NoData = () => {
    return (
        <div className='flex gap-x-1 text-neutral-500 font-consolas  stroke-neutral-500 justify-center  items-center'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(115 115 115)" className="size-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>

            <p>No data</p>


        </div>
    )
}

export default NoData
