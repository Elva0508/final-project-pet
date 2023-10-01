import axios from "axios";
import { URL } from "@/config";
const API_URL = URL + "api/member/";

class MemberService {
  getHelperInfo() {
    const user_id = 25;
    return axios.get(API_URL + "helper-info", { params: { user_id } });
  }
}
export default new MemberService();
