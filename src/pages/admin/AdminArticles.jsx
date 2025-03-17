import axios from "axios"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"

import Loading from "../../components/Loading";

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
function AdminArticles(){
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState : { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    const activeData = {
      data:{
        ...data,
        create_at: new Date().getTime(),
        isPublic:true,
        tag:[data.tag1, data.tag2, data.tag3]
      }
    }
    addActive(activeData);
    reset();
  }

  const addActive = async (data) => {
    try {
      await axios.post(`${url}/api/${path}/admin/article`, data)
      getArticles();
    } catch (error) {
      console.log(error);
    }
  }

  const getArticles = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${url}/api/${path}/admin/articles`)
      setArticles(res.data.articles)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1",
    );
    axios.defaults.headers.common['Authorization'] = `${token}`;
    getArticles();
  },[])

  const deleteArticle = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${url}/api/${path}/admin/article/${id}`)
      getArticles();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  
  return(<>
    <Loading isLoading={isLoading} />
    <div className="container">
      <div className="mb-66">
        <table className="table mt-4">
          <thead>
            <tr className="text-nowrap">
              <th>活動名稱</th>
              <th >活動標籤</th>
              <th>活動發起人</th>
              <th>活動內容</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => {
              return(
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.tag[0]}</td>
                  <td>{article.author}</td>
                  <td className="w-50">{article.description}</td>
                  <td>
                    <button className="btn btn-outline-danger text-nowrap" onClick={() => deleteArticle(article.id)}>刪除</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="container">
        <div className="row flex-column">
          <div className="col-lg-10 mx-auto border p-4 rounded-3">
            <h4 className="fw-bold mt-4 mb-3">活動管理</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="activeTitle" className="text-muted mb-0 form-label"><span className="text-danger">*</span>活動名稱</label>
                <input type="text" className={`form-control rounded-0 ${errors.title && "is-invalid"}`} id="activeTitle" placeholder="請輸入活動名稱"
                {...register("title", {
                  required:{
                    value:true,
                    message:"請輸入活動名稱"
                  }
                })}/>
                {errors.title&& (
                  <div className="text-start text-danger my-2">{errors?.title?.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="activeAuthor" className="text-muted mb-0 form-label"><span className="text-danger">*</span>活動發起人</label>
                <input type="text" className={`form-control rounded-0 ${errors.author && "is-invalid"}`} id="activeAuthor" placeholder="請輸入活動發起人"
                {...register("author", {
                  required:{
                    value:true,
                    message:"請輸入活動發起人"
                  }
                })}/>
                {errors.author&& (
                  <div className="text-start text-danger my-2">{errors?.author?.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="activeImg" className="text-muted mb-0 form-label"><span className="text-danger">*</span>活動照片</label>
                <input type="text" className={`form-control rounded-0 ${errors.image && "is-invalid"}`} id="activeImg" placeholder="請放入活動照片"
                {...register("image", {
                  required:{
                    value:true,
                    message:"請放入活動照片"
                  }
                })}/>
                {errors.image&& (
                  <div className="text-start text-danger my-2">{errors?.image?.message}</div>
                )}
              </div>
              <div className="mb-3">
                <div className="text-muted">活動標籤</div>
                <div className="row">
                  <div className="col-4">
                  <label htmlFor="tag1" className="text-muted mb-0 form-label"><span className="text-danger">*</span>標籤1</label>
                    <input type="text" className={`form-control rounded-0 ${errors.tag && "is-invalid"}`} id="tag1" placeholder="請輸入標籤1"
                    {...register("tag1", {
                      required:{
                        value:true,
                        message:"請輸入標籤"
                      }
                    })}/>
                    {errors.tag&& (
                      <div className="text-start text-danger my-2">{errors?.tag?.message}</div>
                    )}
                  </div>
                  <div className="col-4">
                  <label htmlFor="tag2" className="text-muted mb-0 form-label">標籤2</label>
                    <input type="text" className="form-control rounded-0" id="tag2" placeholder="請輸入標籤2"
                    {...register("tag2")}/>
                  </div>
                  <div className="col-4">
                  <label htmlFor="tag3" className="text-muted mb-0 form-label">標籤3</label>
                    <input type="text" className="form-control rounded-0" id="tag3" placeholder="請輸入標籤3"
                    {...register("tag3")}/>
                  </div>
                </div>
                
              </div>
              <div>
                <label htmlFor="activeDescription" className="form-label text-muted"><span className="text-danger">*</span>活動簡介</label>
                <textarea id="activeDescription" className={`form-control rounded-0 ${errors.description && "is-invalid"}`} cols="30" rows="5"
                {...register('description',{
                  required:{
                    value:true,
                    message:"請輸入活動簡介"
                  }
                })}></textarea>
                {errors.description&& (
                  <div className="text-start text-danger my-2">{errors?.description?.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="activeContent" className="form-label text-muted"><span className="text-danger">*</span>活動內容</label>
                <textarea id="activeContent" className={`form-control rounded-0 ${errors.content && "is-invalid"}`} cols="30" rows="10"
                {...register('content',{
                  required:{
                    value:true,
                    message:"請輸入活動內容"
                  }
                })}></textarea>
                {errors.content&& (
                  <div className="text-start text-danger my-2">{errors?.content?.message}</div>
                )}
              </div>
              <div className="text-end mt-3">
                <button type="submit" className="btn btn-primary">新增活動</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default AdminArticles