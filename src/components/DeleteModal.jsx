function DeleteModal ({
  deleteRef, 
  closeModal, 
  tempProduct, 
  deleteProduct
}){
  return(<>
    <div
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      ref={deleteRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除 
            <span className="text-danger fw-bold">{tempProduct.title}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              取消
            </button>
            <button type="button" className="btn btn-danger" onClick={deleteProduct}>
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default DeleteModal;