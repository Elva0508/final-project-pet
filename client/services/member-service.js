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

  // selling頁route
  getSelling(status) {
    const user = 1;
    return axios.get(API_URL + "selling", {
      params: { user_id: user, status },
    });
  }

  // selling & reserve detail頁
  getRequestDetail(pid) {
    return axios.get(`${API_URL}request/detail/${pid}`);
  }
  setRequestStatus(pid, status) {
    console.log(status);
    return axios.patch(API_URL + "request/detail/status", {
      pid,
      status,
    });
  }
  createReview(pid, user_id, helper_id, review_content, star_rating) {
    return axios.post(API_URL + "reserve/review", {
      pid,
      user_id,
      helper_id,
      review_content,
      star_rating,
    });
  }
  getReview(pid) {
    return axios.get(API_URL + "reserve/review", {
      params: { pid },
    });
  }
}
export default new MemberService();
