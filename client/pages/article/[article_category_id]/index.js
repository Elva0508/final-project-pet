import { useState, useEffect } from "react";
import BreadCrumb from "@/components/article/bread-crumb";
import ArticleCatogory from "@/components/article/article-catogory";
import ArticleListCard from "@/components/article/article-list-card";
import Pagination from "@/components/article/article-pagination";
import { useRouter } from "next/router";
import axios from "axios";

export default function ArticleList() {
  const [articlelist, setArticleList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); //目前頁碼
  const [totalPages, setTotalPages] = useState(1); // 總頁數，從data長度設定

  const router = useRouter();

  useEffect(() => {
    const getArticleList = async () => {
      await axios
        .get(`http://localhost:3005/api/article/${selectedCategory}`)
        .then((response) => {
          const data = response.data.result;
          console.log(data);
          setArticleList(data);

          // 設定總頁數
          const totalItems = data.length;
          const itemsPerPage = 12;
          const totalPages = Math.ceil(totalItems / itemsPerPage);
          console.log("totalPages:", totalPages);
          console.log("吃屎吧");

          setTotalPages(totalPages);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    getArticleList();
  }, [selectedCategory]);

  useEffect(() => {
    // 使用useRouter監聽路由變化
    const handleRouteChange = () => {
      // 當路由發生變化時手動重新載入頁面
      location.reload();
    };

    // 加入路由變化監聽器
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // 設定頁碼狀態
  };

  return (
    <>
      <div className="container mt-5">
        <div>
          <BreadCrumb />
        </div>

        <div className="d-flex justify-content-center mb-5 mt-5">
          <ArticleCatogory />
        </div>

        <div>
          <ArticleListCard category={selectedCategory} />
        </div>

        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
