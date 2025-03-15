 import PropTypes from "prop-types"
 
 function Loading({ isLoading }){
  return (<>
    <div className={`loading loading-position ${isLoading ? 'd-flex' : 'd-none'}`}>
      <div className="spinner-border loading-size" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </>)
 }

 Loading.propTypes = {
  isLoading: PropTypes.bool
 }


 export default Loading