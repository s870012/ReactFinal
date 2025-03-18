import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router";

const url = import.meta.env.VITE_BASE_URL
const path = import.meta.env.VITE_API_PATH
function ArticleDetail (){
  const [article, setArticle] = useState({});
  const { id } = useParams();

  const getArticle = async() => {
    try {
      const res = await axios.get(`${url}/api/${path}/article/${id}`)
      setArticle(res.data.article)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArticle();
  },[])
  
  return(<>
    <div className="position-relative d-flex align-items-center justify-content-center pt-66" style={{minHeight: "300px"}}>
      <div className="position-absolute article-banner-position article-banner-img"></div>
      <h2 className="fs-1 fw-bold text-white">活動詳情</h2>
    </div>
    <div className="bg-white100">
      <div className="container py-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb px-0 mb-0 py-2">
            <li className="breadcrumb-item"><Link className="text-muted" to="/">首頁</Link></li>
            <li className="breadcrumb-item"><Link className="text-muted" to="/articles">活動訊息</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{article.title}</li>
          </ol>
        </nav>
        <h4 className="bg-dark text-white mb-3 py-3">{article.title}</h4>
        <div className="row flex-column flex-lg-row">
          <div className="col-lg-6">
            <img src={article.image} alt="" className="w-100 h-100 object-fit-cover"/>
          </div>
          <div className="col-lg-6">
            <div className="d-flex flex-column justify-content-center h-100 p-3">
              <h5 className="fw-bold mb-3 mt-3 mt-md-0">活動詳情</h5>
              <p className="lh-lg mb-3">{article.description}</p>
              <p className="lh-lg mb-3">{article.content}</p>
              <div className="d-flex justify-content-between align-items-end mt-auto">
                <Link to="/articles" className="text-decoration-none text-dark300"><i className="bi bi-arrow-left-short"></i>返回活動訊息</Link>
                <p>{article.author}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default ArticleDetail