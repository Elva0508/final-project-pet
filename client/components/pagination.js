import React from 'react'
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';

export default function Pagination({handlePageChange,itemsPerPage,type}) {
  return (
    <>
        <div className="pagination size-7 d-flex justify-content-center">
            <button className='btn prev border-0'><GrFormPrevious /></button>
            {Array.from({ length: Math.ceil(type.length / itemsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} className='btn me-1 '>
              {index + 1}
            </button>
          ))}
            <button className='btn next border-0'><GrFormNext /></button>
        </div>  
    </>
  )
}
