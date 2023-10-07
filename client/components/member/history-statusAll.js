import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import dayjs from "dayjs";
import axios from "axios";
import Pagination from '@/components/pagination'

export default function HistoryStatusOne({ history ,getHistory }) {

  const [activePage, setActivePage] = useState(1)


  const itemsPerPage = 5;

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = history.slice(startIndex, endIndex);





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

  const transferDate = (date) => {
    const newDay = dayjs(date).format("YYYY-MM-DD");
    return newDay;
  };

  const removetype = async (id) => {
    console.log(id);
    try {
      const response = await axios.put(
        `http://localhost:3005/api/member-history/updatetype`,
      {id}
      );
    } catch (error) {
      console.error("Error:", error);
    }
    getHistory()
  };



  return (
    <>
      {currentData.map((v, i) => {
        return (
          <>
            <p className="size-7" key={i}>{transferDate(v.post_date)}
            </p>
            <div className="d-flex border-bottom my-2">
              <div className="col-9">
                <p className="size-6 title">{v.title}</p>
                <p className="size-7 content">
                  單次NT${v.price} | {v.city}
                  {v.area}
                  {v.location_detail}
                </p>
                <p className="size-7 content">
                  任務內容｜
                  <CustomHTMLRenderer htmlContent={v.description} />
                </p>
                <p className="size-7 content">
                  任務時間｜{transferDate(v.start_date)}~{transferDate(v.end_date)}
                </p>
                <p className="size-7 follow">6-10人追蹤</p>
              </div>
              <div className="col-3">
                {v.mission_status === 1 ? (
                  <button className=" btn-confirm m-2 size-6" 
                  onClick={() =>{removetype(v.mission_id)}}
                  >下架</button>
                ) : (
                  <button className=" btn-outline-confirm m-2 size-6">
                    已下架
                  </button>
                )}
              </div>
            </div>
          </>
        );
      })}


      <Pagination  itemsPerPage={itemsPerPage} total={history} activePage={activePage} setActivePage={setActivePage}/>

    </>
  );
}
