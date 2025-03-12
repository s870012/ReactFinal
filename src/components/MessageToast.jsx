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
  },[messages])

  return(<>
    <div className="position-fixed top-0 end-0 p-3 mb-3" style={{ zIndex: 1000 }}>
      {messages.map((message) => {
        return(
          <div key={message.id} ref={(el) => messageRefs.current[message.id] = el} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className={`toast-header ${message.status ==='success' ? 'bg-success' : 'bg-danger'} text-white`}>
              <strong className="me-auto">
                {message.status === 'success' ? '成功' : '失敗'}
              </strong>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body text-start">{message.text}</div>
          </div>
        )
      })}
    </div>
  </>)
}


export default MessageToast;