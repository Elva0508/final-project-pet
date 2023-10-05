import axios from "axios";
import { URL } from "@/config";
const API_URL = URL + "api/member/";

class MemberService {
  // 小幫手頁route
  getHelperInfo() {
    const user_id = 1;
    return axios.get(API_URL + "helper", { params: { user_id } });
  }
  handleHelperValid(valid) {
    // const valid = true;
    console.log(valid);
    const user_id = 1;
    return axios.patch(API_URL + "helper/valid", { valid, user_id });
  }
  handleHelperEdit(formData) {
    console.log(formData);
    return axios.put(API_URL + "/helper", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // reserve頁route
  getReserve(status) {
    const user = 1;
    return axios.get(API_URL + "reserve", {
      params: { user_id: user, status },
    });
  }

  // reserve detail頁
  getReserveDetail(pid) {
    return axios.get(`${API_URL}reserve/detail/${pid}`);
  }
  // selling頁route
  getSelling(status) {
    const user = 45;
    return axios.get(API_URL + "selling", {
      params: { user_id: user, status },
    });
  }

  // selling detail頁
  getSellingDetail(pid) {
    return axios.get(`${API_URL}selling/detail/${pid}`);
  }
}
export default new MemberService();
