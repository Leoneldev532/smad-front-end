import { selectOptionType } from '@/lib/type';
import Image from 'next/image';
import React from 'react';

const SelectOption = (selectionOptionProps: selectOptionType) => {
  return (
    <div 
      onClick={selectionOptionProps?.onClick} 
      className={` ${selectionOptionProps.isSelected ? "border-yellow-400":"border-neutral-500/40" } rounded-xl border  bg-neutral-700/30 line  cursor-pointer flex justify-center items-center min-h-36 overflow-hidden relative w-full`}
      aria-pressed={selectionOptionProps.isSelected} // Indique si l'option est sélectionnée
      aria-label={`Sélectionner l'option ${selectionOptionProps?.id}`} // Description pour l'accessibilité
    >
      {selectionOptionProps.image && 
        <Image 
          src={selectionOptionProps.image} 
          className="object-cover transform  z-0 translate-y-50 absolute top-0 left-0" 
          alt={`Image de l'option ${selectionOptionProps?.id}`} 
        />
      }
      <div className="h-full w-full z-10 flex p-3 justify-end items-end">
        <button 
          className={`border border-neutral-700 flex justify-center items-center rounded-full h-8 w-8 ${selectionOptionProps.isSelected ? "bg-yellow-500" : "bg-transparent"}`}
          aria-hidden="true" 
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${selectionOptionProps.isSelected ? "stroke-black" : "stroke-white"} size-4`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SelectOption;


