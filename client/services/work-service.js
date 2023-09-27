import axios from "axios";
import { URL } from "@/config";
const API_URL = URL + "api/work/";
const auth = "wK9VpbpUOir2747DCVqZ0rlPG9satEQkJ5gy0zJ5RVUCB6gkXUPilIou";

class WorkService {
  getAllHelpers() {
    return axios.get(API_URL + "helpers");
  }

  getFamousHelper() {
    return axios.get(API_URL + "helpers/famous");
  }
  getCat() {
    // 用來找貓的圖片
    return axios.get(
      "https://api.pexels.com/v1/search?query=cat&per_page=1curated?page=3&per_page=80",
      {
        headers: { Authorization: auth },
      }
    );
  }
}
export default new WorkService();
