import axios from "axios";
import { URL } from "@/config";
const API_URL = URL + "api/member/";

class MemberService {
  getHelperInfo() {
    const user_id = 30;
    return axios.get(API_URL + "helper", { params: { user_id } });
  }
  handleHelperValid(valid) {
    // const valid = true;
    console.log(valid);
    const user_id = 30;
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
}
export default new MemberService();
