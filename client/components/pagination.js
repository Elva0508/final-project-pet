import React from 'react'
import Link from "next/link";
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';

export default function Pagination() {
  return (
    <>
        <div className="pagination size-7 d-flex justify-content-center">
            <Link href="" className='prev border-0'><GrFormPrevious /></Link>
            <Link href="" className='active me-1'>1</Link>
            <Link href="" className='me-1'>2</Link>
            <Link href="" className='me-1'>3</Link>
            <Link href="" className='me-1'>4</Link>
            <Link href="" className=''>5</Link>
            <Link href="" className='next border-0'><GrFormNext /></Link>
        </div>

    </>
  )
}
