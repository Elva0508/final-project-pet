import React, { useState, useEffect  } from "react";
import ListM from "@/components/member/list-m";
import ListD from "@/components/member/list-d";
import ListUserM from "@/components/member/list-user-m";
import { LiaListAltSolid } from "react-icons/lia";
import JobStatusOne from "@/components/member/job-status-one";
import JobStatusTwo from "@/components/member/job-status-two";
import JobStatusThree from "@/components/member/job-status-three";
import JobStatusFour from "@/components/member/job-status-four";
import axios from "axios";


export default function Joblist() {
  const [currentScreen, setCurrentScreen] = useState("1");
  const [job, setJob] = useState([]);
  const [record, setRecord] = useState([]);
  const [close ,setClose]=useState([])
  const [norecord,setNorecord]=useState([])

  const handleButtonClick = (screenName) => {
    setCurrentScreen(screenName);
  };



  const getJob = async () => {
    await axios
      .get("http://localhost:3005/api/member-joblist")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setJob(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const  getRecord = async () => {
    await axios
      .get("http://localhost:3005/api/member-joblist/record")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setRecord(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const  getNorecord = async () => {
    await axios
      .get("http://localhost:3005/api/member-joblist/norecord")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setNorecord(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const  getClose = async () => {
    await axios
      .get("http://localhost:3005/api/member-joblist/close")
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setClose(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  useEffect(() => {
    getJob();
    getRecord()
    getClose()
    getNorecord()
  }, []);

 

  return (
    <>
      <div className="my-3">
        <div className="d-flex justify-content-end me-3">
          <ListM />
        </div>
        <ListUserM />
        <div className="d-flex justify-content-around py-2">
          <ListD />
          <div className="row col-lg-8 col-md-8 col-12 joblist p-3 ">
            <div>
              <h5 className="size-5 ">
                <LiaListAltSolid />
                任務清單
              </h5>
          
                <div className="my-3">
                  <button
                    className={`mx-2 size-7 listbutton ${
                      currentScreen === "1" ? "pressed" : ""
                    }`}
                    onClick={() => {
                      handleButtonClick("1");
                    }}
                  >
                    全部
                  </button>
                  <button
                    className={`mx-2 size-7 listbutton ${
                      currentScreen === "2" ? "pressed" : ""
                    }`}
                    onClick={() => {
                      handleButtonClick("2");
                    }}
                  >
                    未應徵
                  </button>
                  <button
                    className={`mx-2 size-7 listbutton ${
                      currentScreen === "3" ? "pressed" : ""
                    }`}
                    onClick={() => {
                      handleButtonClick("3");
                    }}
                  >
                    已應徵
                  </button>
                  <button
                    className={`mx-2 size-7 listbutton ${
                      currentScreen === "4" ? "pressed" : ""
                    }`}
                    onClick={() => {
                      handleButtonClick("4");
                    }}
                  >
                    已關閉
                  </button>

                </div>
                
             

                  {currentScreen === "1" && <JobStatusOne job={job}/>}
                  {currentScreen === "2" && <JobStatusTwo norecord={norecord}/>}
                  {currentScreen === "3" && <JobStatusThree record={record}/>}
                  {currentScreen === "4" && <JobStatusFour close={close}/>}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
