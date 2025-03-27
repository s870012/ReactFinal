import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import Loading from "../../components/Loading";

const url = import.meta.env.VITE_BASE_URL;
const path = import.meta.env.VITE_API_PATH;
function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');

  const getArticles = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${url}/api/${path}/articles`)
      setArticles(res.data.articles);
      setDate(new Date().getMonth(res.data.articles[0].create_at) +1 + '月' + new Date().getDate(res.data.articles[0].create_at) + '日');
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  },[])

  return(<>
    <Loading isLoading={isLoading}/>
    <div className="position-relative d-flex align-items-center justify-content-center pt-62" style={{minHeight: "300px"}}>
      <div className="position-absolute article-banner-position article-banner-img"></div>
      <h2 className="fs-1 text-white">活動訊息</h2>
    </div>
    <div className="bg-white100">
      <div className="container py-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <h2 className="mb-3">活動訊息</h2>
            {articles.map((article) => {
              return(
                <Link key={article.id} to={`/article/${article.id}`} className="d-flex flex-column flex-lg-row mb-4 bg-white shadow text-decoration-none text-dark200 article-hover">
                  <div className="col-lg-3">
                    <img src={article.image} alt="articleImg" style={{width:"100%", height:"100%", objectFit:"cover"}} className="mx-auto d-block overflow-hidden "/>
                  </div>
                  <div className="col-lg-9 d-flex flex-column p-3">
                    <h4 className="text-dark100 mb-2">{article.title}</h4>
                    <p>{article.description}</p>
                    <div className="d-flex justify-content-end justify-content-sm-between align-items-center mt-3 mt-sm-auto">
                      <p className="d-none d-sm-block text-gray600">主辦單位 : {article.author}</p>
                      <p className="text-base100">{date}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Articles;