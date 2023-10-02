import React from 'react'
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';

export default function Pagination() {
  return (
    <>
        <div className="pagination size-7 d-flex justify-content-center">
            <button className='btn prev border-0'><GrFormPrevious /></button>
            <button className='btn active me-1'>1</button>
            <button className='btn me-1'>2</button>
            <button className='btn me-1'>3</button>
            <button className='btn me-1'>4</button>
            <button className='btn'>5</button>
            <button className='btn next border-0'><GrFormNext /></button>
        </div>
    </>
  )
}
