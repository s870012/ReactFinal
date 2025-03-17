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
    <div className="container py-120">
      <div className="row">
        <h2 className="fw-bold mb-3">活動消息</h2>
        {articles.map((article) => {
          return(
            <div key={article.id} className="d-flex mb-4">
              <div className="col-lg-2 me-2">
                <img src={article.image} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                <p></p>
              </div>
              <div className="col-lg-10 d-flex flex-column">
                <h4>{article.title}</h4>
                <p>{article.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <p>主辦單位 : {article.author}</p>
                  <p>了解更多</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </>)
}

export default Articles