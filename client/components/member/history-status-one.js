import React, { useState } from "react";
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';

export default function HistoryStatusOne({history}) {
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = history.slice(startIndex, endIndex);



  const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };


    function CustomHTMLRenderer({ htmlContent }) {
      return (
          <div className="item">
              <ul className="item-content size-7" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
      );
  }


  return (
    <>
    {currentData.map((v,i)=>{
      return(
        <>
      <p className="size-7" key={i}>{v.post_date}</p>
      <div className="d-flex border-bottom my-2">
        <div className="col-9">
          <p className="size-6 title">{v.title}</p>
          <p className="size-7 content">單次NT${v.price} | {v.city}{v.area}{v.location_detail}</p>
          <p className="size-7 content">
            任務內容｜<CustomHTMLRenderer htmlContent={v.description} />
          </p>
          <p className="size-7 content">
            任務時間｜{v.start_date}~{v.end_date}
          </p>
          <p className="size-7 follow">6-10人追蹤</p>
        </div>
        <div className="col-3">
        {v.mission_status===1?(
          <button className=" btn-confirm m-2 size-6">刊登中</button>
        ):(
          <button className=" btn-outline-confirm m-2 size-6">已下架</button>
        )}
          
        </div>
      </div>
        </>
      )
    })}

      <div className="pagination size-7 d-flex justify-content-center">
            <button className='btn prev border-0'><GrFormPrevious /></button>
            {Array.from({ length: Math.ceil(history.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className='btn me-1 '>
            {index + 1}
          </button>
        ))}
            <button className='btn next border-0'><GrFormNext /></button>
        </div> 
    </>
  );
}
