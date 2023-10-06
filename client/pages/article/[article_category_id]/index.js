import { useState, useEffect } from "react";
import BreadCrumb from "@/components/article/bread-crumb";
import ArticleCatogory from "@/components/article/article-catogory";
import ArticleListCard from "@/components/article/article-list-card";
import { useRouter } from "next/router";

export default function ArticleList() {
  const [articlelist, setArticleList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const router = useRouter();

  // 向伺服器要求資料，設定到狀態中
  const getArticleList = async (article_category_id) => {
    const res = await fetch(
      "http://localhost:3005/api/article/" + article_category_id
    );

    const data = await res.json();

    // console.log(data);
    // 設定到狀態中 -> 會觸發重新渲染(re-render)
    if (Array.isArray(data)) setArticleList(data);
  };

  // didMount 初次渲染"後", 向伺服器要求資料，設定到狀態中
  useEffect(() => {
    if (router.isReady) {
      // 確保能得到router.query有值
      const { article_category_id } = router.query;
      // console.log(article_category_id);
      // 有article_category_id後，向伺服器要求資料，設定到狀態中
      getArticleList(article_category_id);
    }
    // eslint-disable-next-line
  }, [router.isReady]);

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
      </div>
    </>
  );
}
