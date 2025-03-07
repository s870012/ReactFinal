import { useEffect } from "react";
import { useNavigate } from "react-router"

function NotFound(){
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(() => {
      navigate('/')
    }, 3000);
  },[])

  return(<>
    <img src={"https://img.freepik.com/free-vector/404-error-design-with-cute-monsters_23-2147735884.jpg?t=st=1741309982~exp=1741313582~hmac=47b9dc5743b596b15bb7c8aa6df421487f4eab8e74b867b044186abe29919e56&w=900"} alt="notfound" className="object-fit-cover img-fluid d-block mx-auto" style={{height:"650px"}} />
  </>)
}

export default NotFound