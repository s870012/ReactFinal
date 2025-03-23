import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "bootstrap"
import { asyncRemoveMessage } from "../slices/messageSlice";

function MessageToast(){
  const messages = useSelector((state) => state.messages.messages);
  const messageRefs = useRef({})
  const dispatch = useDispatch();

  useEffect(() =>{
    messages.forEach((message) => {
      const messageEl = messageRefs.current[message.id];
      if(messageEl) {
        const messageInstance = new Toast(messageEl)
        messageInstance.show();
      }
      setTimeout(() => {
        dispatch(asyncRemoveMessage(message.id))
      }, 2000)
    })
  },[messages, dispatch])

  const closeMessage = () => {
    messages.forEach((message) => {
      const messageEl = messageRefs.current[message.id];
      if(messageEl) {
        const messageInstance = new Toast(messageEl)
        messageInstance.hide();
      }
    })
  }

  return(<>
    <div className="position-fixed top-50 start-50 translate-middle p-3 mb-3" style={{ zIndex: 1000 }}>
      {messages.map((message) => {
        return(
          <div key={message.id} ref={(el) => messageRefs.current[message.id] = el} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header border-0">
              <h4 className="mx-auto ">
                {message.status === 'success' ? '成功' : '失敗'}
              </h4>
            </div>
            <div className="toast-body text-center fs-5">{message.text}</div>
            <button
                type="button"
                className="d-block mx-auto rounded-circle bg-white100 border-0"
                onClick={closeMessage}
            ><i className={`bi ${message.status ==='success' ? 'bi-check-circle-fill text-blue' : 'bi-x-circle-fill text-danger'} fs-2`}></i></button>
          </div>
        )
      })}
    </div>
  </>)
}


export default MessageToast;