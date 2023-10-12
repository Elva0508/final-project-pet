import React, { useState, useEffect  } from "react";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { LiaListAltSolid } from "react-icons/lia";
import JobStatus from "@/components/member/job-status";
import axios from "axios";


export default function Joblist() {
  const [currentScreen, setCurrentScreen] = useState(4);
  const [job, setJob] = useState([]);




  const getJob = async (id) => {
    await axios
      .get(`http://localhost:3005/api/member-joblist/${id}`)
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setJob(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };




  useEffect(() => {    
  const token = localStorage.getItem("token");
  const id=localStorage.getItem("id")
  // 沒有token
  if (!token) {
    console.log("user沒登入");
    return;
  }
  console.log(id);
  console.log(token)
    getJob(id);

  }, []);

 

  return (
    <>
      <div className="my-3">
        <ListUserM />
        <div className="d-flex justify-content-around py-2">
          <ListD />
          <div className="d-flex flex-column col-md-8 col-12 joblist  ">

              <h5 className="size-5 mt-3 ms-md-0 ms-3 big">
                任務清單
              </h5>
          
                <div className="mt-3">
                  <button
                    className={`size-6 listbutton first ${
                      currentScreen === 4 ? "pressed" : ""
                    }`}
                    onClick={() => {
                      setCurrentScreen(4);
                    }}
                  >
                    全部
                  </button>
                  <button
                    className={` size-6 listbutton ${
                      currentScreen === 2 ? "pressed" : ""
                    }`}
                    onClick={() => {
                      setCurrentScreen(2);
                    }}
                  >
                    未應徵
                  </button>
                  <button
                    className={` size-6 listbutton ${
                      currentScreen === 3 ? "pressed" : ""
                    }`}
                    onClick={() => {
                      setCurrentScreen(3);
                    }}
                  >
                    已應徵
                  </button>
                  <button
                    className={`size-6 listbutton ${
                      currentScreen === 1 ? "pressed" : ""
                    }`}
                    onClick={() => {
                      setCurrentScreen(1);
                    }}
                  >
                    刊登中
                  </button>
                  <button
                    className={`size-6 listbutton ${
                      currentScreen === 0 ? "pressed" : ""
                    }`}
                    onClick={() => {
                      setCurrentScreen(0);
                    }}
                  >
                    已關閉
                  </button>

                </div>
                
             

                  <JobStatus job={job} currentScreen ={currentScreen }/>

            </div>
          </div>
        </div>
    </>
  );
}
