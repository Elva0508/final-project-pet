import React from 'react'
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';

export default function Pagination({itemsPerPage,total,activePage,setActivePage}) {
    console.log(total)
      const totalPages = Math.ceil(total.length / itemsPerPage); 
      let startPage
      let endPage
      if(totalPages<=5){
        startPage=1
        endPage=totalPages
      }else{
        startPage = Math.max(1, activePage - 2);
        endPage = Math.min(totalPages, activePage +2);
        // 如果起始頁小於 1，則調整結束頁
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + 4);
          startPage = 1;
        }
        // 如果結束頁大於總頁數，則調整起始頁
        if (endPage === totalPages) {
          startPage = Math.max(1, endPage - 4);
        }
      }
    console.log(totalPages)

      const pageButtons = [];
      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => {
              setActivePage(i);
            }}
            className={`btn me-1 ${activePage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
  return (   
    <>
        <div className="pagination size-7 d-flex justify-content-center mt-3">
            {activePage===1?(
              ""
            ):(
              <button className='btn prev border-0' onClick={()=>{setActivePage(activePage-1)}}><GrFormPrevious /></button>
            )}

            {pageButtons}

            {activePage===Math.ceil(total.length / itemsPerPage)? (
              ""
            ):(
              <button className='btn next border-0' onClick={()=>{setActivePage(activePage+1)}}><GrFormNext /></button>
            )}
            
        </div>  
    </>
  )
}

