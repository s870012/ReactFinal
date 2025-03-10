import { useForm } from "react-hook-form"

function ProductsModal ({editModalRef, closeModal, tempProduct}) {
  const { 
    register,
    handleSubmit,
    formState : {errors} 
  } = useForm();

  return(<>
    <div id="productModal" className="modal fade" tabIndex="-1" ref={editModalRef}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content border-0">
          <div className="modal-header bg-dark text-white">
            <h5 id="productModalLabel" className="modal-title">
              {tempProduct.id === '' ? <span>新增產品</span> : <span>編輯產品</span> }
            </h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <form onSubmit={handleSubmit()}>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="mb-2">
                    <div className="mb-5">
                      <label htmlFor="fileInput" className="form-label"> 圖片上傳 </label>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="form-control"
                        id="fileInput"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
                        輸入圖片網址
                      </label>
                      <input id="imageUrl" type="text" className="form-control" placeholder="請輸入圖片連結"
                        />
                    </div>
                    <img className="img-fluid" src={tempProduct.imageUrl} alt="主圖" />
                  </div>
                  <div className="border border-2 border-dashed rounded-3 p-3">
                    {/* {tempProduct.imagesUrl?.map((image, index) => {
                      return (<div key={index} className="mb-2">
                        <label htmlFor={`newImages${index}`} className="form-label">副圖{index + 1}</label>
                        <input
                          id={`newImages${index}`}
                          type="text"
                          value={image}
                          onChange={(e) => controlImgInput(e, index)}
                          placeholder={`圖片網址 ${index + 1}`}
                          className="form-control mb-2"
                        />
                        {image && (
                          <img
                            src={image}
                            alt={`副圖 ${index + 1}`}
                            className="img-preview mb-2"
                          />
                        )}
                      </div>)
                    })} */}
                  </div>
                  <div>
                    <button className="btn btn-outline-primary btn-sm d-block w-100" >
                      新增圖片
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-outline-danger btn-sm d-block w-100" >
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">標題</label>
                    <input id="title" type="text" className="form-control" placeholder="請輸入標題" value={tempProduct.title}
                    {...register('title', {
                      required:{
                        value:true,
                        message:"請輸入產品名稱"
                      }
                    })}/>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="category" className="form-label">分類</label>
                      <input id="category" type="text" className="form-control" placeholder="請輸入分類"
                      {...register('category',{
                        required:{
                          value:true,
                          message:"請輸入產品分類"
                        }
                      })}/>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="unit" className="form-label">單位</label>
                      <input id="unit" type="text" className="form-control" placeholder="請輸入單位"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="origin_price" className="form-label">原價</label>
                      <input id="origin_price" type="number" min="0" className="form-control" placeholder="請輸入原價" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="price" className="form-label">售價</label>
                      <input id="price" type="number" min="0" className="form-control" placeholder="請輸入售價"/>
                    </div>
                  </div>
                  <hr />
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">產品描述</label>
                    <textarea id="description" className="form-control" placeholder="請輸入產品描述" >
                    </textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">說明內容</label>
                    <textarea id="content" className="form-control" placeholder="請輸入說明內容" >
                    </textarea>
                  </div>
                  <div className="mb-3">
                    <div className="form-check text-start">
                      <input type="checkbox" id="is_enabled" className="form-check-input" />
                      <label className="form-check-label" htmlFor="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
                取消
              </button>
              <button type="submit" className="btn btn-primary" >確認</button>
            </div> 
          </form>
        </div>
      </div>
    </div>
  </>)
}

export default ProductsModal