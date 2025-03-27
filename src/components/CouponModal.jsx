import PropTypes from "prop-types";

function CouponModal ({tempCoupon, editCoupon, handleCouponInput, editModalRef, closeModal}){
  return(<>
    <div className="modal fade" ref={editModalRef}>
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">編輯優惠券</h4>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="code" className="text-muted mb-0 form-label"><span className="text-danger">*</span>優惠券碼</label>
                <input type="text" className="form-control rounded-0" name="code" id="code" placeholder="請輸入優惠券編號" value={tempCoupon.code} onChange={handleCouponInput}/>
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="text-muted mb-0 form-label"><span className="text-danger">*</span>優惠券名稱</label>
                <input type="text" className="form-control rounded-0" name="title" id="title" placeholder="請輸入優惠券名稱" value={tempCoupon.title} onChange={handleCouponInput}/>
              </div>
              <div className="mb-3">
                <label htmlFor="due_Date" className="text-muted mb-0 form-label"><span className="text-danger">*</span>優惠券期限</label>
                <input type="date" className="form-control rounded-0" name="due_date" id="due_date" placeholder="請輸入優惠券期限" value={tempCoupon.due_date} onChange={handleCouponInput}/>
              </div>
              <div className="mb-3">
                <label htmlFor="percent" className="text-muted mb-0 form-label"><span className="text-danger">*</span>優惠券折扣</label>
                <input type="number" className="form-control rounded-0" name="percent" id="percent" placeholder="請輸入優惠券折扣" value={tempCoupon.percent} onChange={handleCouponInput}/>
              </div>
              <div className="mb-3">
                <div className="form-check text-start">
                  {tempCoupon.is_enabled === 1 ? (
                    <input type="checkbox" className="form-check-input rounded-0" name="is_enabled" id="is_enabled" checked 
                    value={tempCoupon.is_enabled}
                    onChange={handleCouponInput}/>
                  ) : (
                    <input type="checkbox" className="form-check-input rounded-0" name="is_enabled" id="is_enabled"
                    value={tempCoupon.is_enabled}
                    onChange={handleCouponInput}/>
                  )}
                  <label htmlFor="is_enabled" className="text-muted mb-0 form-label"><span className="text-danger">*</span>是否啟用</label>
                </div>
              </div>
              <div className="text-end">
                <button type="button" className="btn btn-outline-danger" onClick={closeModal}>取消</button>
                <button type="button" className="btn btn-blue" onClick={() => editCoupon(tempCoupon.id)}>確定</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>)
}

CouponModal.propTypes = {
  tempCoupon: PropTypes.shape({
    id: PropTypes.string,
    code: PropTypes.string,
    title: PropTypes.string,
    is_enabled: PropTypes.bool,
    due_date: PropTypes.string,
    percent: PropTypes.number
  }).isRequired, 
  editModalRef: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleCouponInput: PropTypes.func.isRequired,
  editCoupon: PropTypes.func.isRequired
} 
export default CouponModal;