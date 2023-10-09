import React, { useState} from "react";
import { CiHeart } from "react-icons/ci";
import { BiSolidHeart } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import dayjs from "dayjs";
import Pagination from '@/components/pagination'


export default function JobStatusTwo({record}) {
 
  const itemsPerPage = 5
  const [activePage, setActivePage] = useState(1)


  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = record.slice(startIndex, endIndex);



  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // 切換收藏狀態
  };



  const transferDate = (date) => {
    const newDay = dayjs(date).format("YYYY-MM-DD");
    return newDay;
  };


  function CustomHTMLRenderer({ htmlContent }) {
    return (
      <div className="item">
        <ul
          className="item-content size-7"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }




  return (
    <>
      <div className="form-check border-bottom border-top">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label " for="flexCheckDefault">
          全選
          <RiDeleteBin5Line />
        </label>
      </div>
      {currentData.map((v,i) => {
        return (
          <>
            <div className="d-flex border-bottom my-2 justify-content-between" key={i}>
              <div className=" d-flex  ">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />

                  <label className="form-check-label " for="flexCheckDefault">
                    <p className="size-7 d-md-none d-block">{transferDate(v.post_date)}</p>
                    <p className="size-6 title d-md-none d-block">{v.title}</p>
                    <p className="size-7 content d-md-none d-block">{v.post_name}</p>
                    <p className="size-7 content d-md-none d-block">
                      單次{v.price}元 | {v.city}{v.area}{v.location_detail}
                    </p>
                    <p className="size-7 content d-md-none d-block">
                      任務內容｜<CustomHTMLRenderer htmlContent={v.description} />
                    </p>
                    <p className="size-7 follow d-md-none d-block">
                      6-10人追蹤
                    </p>
                  </label>
                </div>
                {/* 1 */}
                <div className="d-md-flex d-none">
                  <div>
                    <p className="size-7 me-3">{transferDate(v.post_date)}</p>
                  </div>
                  <div>
                    <div className="d-flex">
                      <p className="size-6 title">{v.title}</p>
                      <div className="ms-3" onClick={toggleFavorite}>
                        {isFavorite ? <BiSolidHeart /> : <CiHeart />}
                      </div>
                    </div>
                    <p className="size-7 content">{v.post_name}</p>
                    <p className="size-7 content">單次{v.price}元 | {v.city}{v.area}{v.location_detail}</p>
                    <p className="size-7 content">
                      任務內容｜<CustomHTMLRenderer htmlContent={v.description} />
                    </p>
                    <p className="size-7 follow">6-10人追蹤</p>
                  </div>
                </div>
              </div>
              {/* 2 */}
                <div className="d-flex flex-column justify-content-center">
                  <p className="size-7 text-center apply">{transferDate(v.job_date)}</p>
                  <p className="size-7 text-center apply">已應徵</p>
                </div>

            </div>
            
          </>
        );
      })}
      <Pagination  itemsPerPage={itemsPerPage} total={record} activePage={activePage} setActivePage={setActivePage}/>
    </>
  );
}
