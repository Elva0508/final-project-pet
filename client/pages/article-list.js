import React from "react";
import BreadCrumb from '@/components/article/bread-crumb';
import ArticleCatogory from '@/components/article/article-catogory';

export default function ArticleList() {
  return (
    <>
      <h1>ArticleList</h1>
      <nav>navbar</nav>
      <div>麵包屑</div>
      <BreadCrumb/>
      <div>類別按鈕</div>
      <ArticleCatogory/>
      <div>四列文章列表，一列三個</div>
      <div>分頁</div>
      <footer>footer</footer>
    </>
  );
}
