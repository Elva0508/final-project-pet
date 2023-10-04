import axios from "axios";
import { URL } from "@/config";
const API_URL = URL + "api/work/";

class WorkService {
  // list頁的api
  getAllHelpers(type, page) {
    console.log(page);
    return axios.get(API_URL + "helpers", { params: { type, page } });
  }

  getFamousHelper(type) {
    return axios.get(API_URL + "helpers/famous", { params: { type } });
  }
  getOrderHelper(filterType, orderType, orderWay, page) {
    return axios.get(API_URL + "helpers/order", {
      params: { filterType, orderType, orderWay, page },
    });
  }
  getSearchHelper(search) {
    return axios.get(API_URL + "helpers/search", { params: { search } });
  }

  // detail頁
  getHelperDetail(uid) {
    console.log(uid);
    return axios.get(API_URL + "/helpers/detail/" + uid);
  }
  getPetInfo(uid) {
    return axios.get(API_URL + "helpers/detail/petInfo", { params: { uid } });
  }
  // createMission頁
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
