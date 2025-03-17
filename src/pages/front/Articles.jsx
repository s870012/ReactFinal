import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router"

import Loading from "../../components/Loading"

const url = import.meta.env.VITE_BASE_URL
const path = import.meta.env.VITE_API_PATH
function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const getArticles = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${url}/api/${path}/articles`)
      setArticles(res.data.articles)
      console.log(new Date().getMonth(res.data.articles[0].create_at) +1 + '月' + new Date().getDate(res.data.articles[0].create_at));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  },[])

  return(<>
    <Loading isLoading={isLoading}/>
    <div className="position-relative d-flex align-items-center justify-content-center pt-66" style={{minHeight: "300px"}}>
      <div className="position-absolute banner-position banner-img"></div>
      <h2 className="fs-1 fw-bold text-white">活動訊息</h2>
    </div>
    <div className="container py-5">
      <div className="row">
        <div className="col-10 mx-auto">
          <h2 className="fw-bold mb-3">活動消息</h2>
          {articles.map((article) => {
            return(
              <div key={article.id} className="d-flex flex-column flex-lg-row mb-4">
                <div className="col-lg-3 me-2 mb-3 mb-lg-0">
                  <img src={article.image} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                </div>
                <div className="col-lg-9 d-flex flex-column">
                  <h4 className="mb-2">{article.title}</h4>
                  <p>{article.description}</p>
                  <div className="d-flex justify-content-end justify-content-sm-between align-items-center mt-3 mt-sm-auto">
                    <p className="d-none d-sm-block">主辦單位 : {article.author}</p>
                    <Link to={`/article/${article.id}`} className="text-decoration-none">了解更多</Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </>)
}

export default Articles