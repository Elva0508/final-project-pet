import axios from "axios";
import { URL } from "@/config";
const API_URL = URL + "api/work/";
const auth = "wK9VpbpUOir2747DCVqZ0rlPG9satEQkJ5gy0zJ5RVUCB6gkXUPilIou";

class WorkService {
  getAllHelpers(type) {
    return axios.get(API_URL + "helpers", { params: { type } });
  }

  getFamousHelper(type) {
    return axios.get(API_URL + "helpers/famous", { params: { type } });
  }
  getOrderHelper(filterType, orderType, orderWay) {
    return axios.get(API_URL + "helpers/order", {
      params: { filterType, orderType, orderWay },
    });
  }
  getSearchHelper(search) {
    return axios.get(API_URL + "helpers/search", { params: { search } });
  }
  getHelperDetail(uid) {
    console.log(uid);
    return axios.get(API_URL + "/helpers/detail/" + uid);
  }
  createMission(formData) {
    return axios.post(API_URL + "/mission", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
