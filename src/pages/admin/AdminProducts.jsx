import axios from "axios";
import * as bootstrap from "bootstrap";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createMessage } from "../../slices/messageSlice";

import MessageToast from "../../components/MessageToast";
import Pagination from "../../components/Pagination";
import ProductsModal from "../../components/ProductsModal";
import DeleteModal from "../../components/DeleteModal";
import Loading from "../../components/Loading";

const url = import.meta.env.VITE_BASE_URL; 
const path = import.meta.env.VITE_API_PATH; 
function AdminProducts (){
  //products
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const getProducts = async(page=1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${url}/api/${path}/admin/products?page=${page}`);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1",
    );
    axios.defaults.headers.common['Authorization'] = `${token}`;
    getProducts();
  },[])
  
  //products for Modal
  const [tempProduct, setTempProduct] = useState({
    id: "",
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content:"",
    is_enabled: false,
    imagesUrl: [],
  })

  const controlModal = useRef(null);
  // editModal
  const editModalRef = useRef(null);
  const openEditModal = (product, type) => {
    if (type == 'edit'){
      setTempProduct(product);
    } else {
      setTempProduct({
        id: product.id || "",
        imageUrl: product.imageUrl || "",
        title: product.title || "",
        category: product.category || "",
        unit: product.unit || "",
        origin_price: product.origin_price || "",
        price: product.price || "",
        description: product.description || "",
        content: product.content || "",
        is_enabled: product.is_enabled || false,
        imagesUrl: product.imagesUrl || [],
      })
    }
    controlModal.current = new bootstrap.Modal(editModalRef.current);
    controlModal.current.show();
  }

  const controlModalInput = (e) =>{
    const {id, value, type, checked} = e.target;
    setTempProduct({
      ...tempProduct,
      [id]:type =='checkbox' ? checked : value
    });
  }

  // edit product
  const editProduct = async () => {
    const productData ={
      data:{
        ...tempProduct,
        origin_price:Number(tempProduct.origin_price),
        price:Number(tempProduct.price),
        is_enabled:tempProduct.is_enabled? 1 : 0,
        imagesUrl:tempProduct.imagesUrl
      }
    }
    try {
      if(tempProduct.id ===''){
        await axios.post(`${url}/api/${path}/admin/product`, productData);
        dispatch(createMessage({
          text:'新增產品成功',
          status:'success'
        }));
      } else {
        await axios.put(`${url}/api/${path}/admin/product/${tempProduct.id}`, productData);
        dispatch(createMessage({
          text:'編輯產品成功',
          status:'success'
        }));
      }
      getProducts();
      controlModal.current.hide();
    } catch (error) {
      if(tempProduct.id===''){
        dispatch(createMessage({
          text:"新增產品失敗",
          status:'false'
        }));
      } else {
        dispatch(createMessage({
          text:error.response.data.message,
          status:'false'
        }));
      }
    } 
  };

  // image
  const controlImgInput = (e, index) => {
    const { value } = e.target;
    const newImages = [...tempProduct.imagesUrl];
    newImages[index] = value;
    setTempProduct({
        ...tempProduct,
        imagesUrl: newImages
      });
  }
  
  const addImg = () => {
    if(tempProduct.imagesUrl.length < 5 && 
      tempProduct.imagesUrl[tempProduct.imagesUrl.length] !== ''){
        setTempProduct((product) => ({
          ...product,
          imagesUrl: [...product.imagesUrl, ""],
        }));
      } else {
        alert('圖片上限為五張');
      }
  };

  const removeImg = () => {
    if(tempProduct.imagesUrl.length > 1){
      setTempProduct((product) => {
        const newImages = [...product.imagesUrl];
        newImages.pop();
        return { ...product, imagesUrl: newImages };
      });
    } else {
      alert('圖片至少要有一張');
    }
  } 

  // upLoad image
  const controlFileChange = async(e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file-to-upload', file);
    try {
      const res = await axios.post(`${url}/api/${path}/admin/upload`, formData);
      setTempProduct({
        ...tempProduct,
        imageUrl: res.data.imageUrl
      });
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      e.target.value = "";
    }
  }

  // deleteModal
  const deleteRef = useRef(null);
  const deleteModal = (product) => {
    controlModal.current = new bootstrap.Modal(deleteRef.current);
    controlModal.current.show();
    setTempProduct(product);
  }

  const deleteProduct = async () =>{
    try {
      await axios.delete(`${url}/api/${path}/admin/product/${tempProduct.id}`);
      controlModal.current.hide();
      dispatch(createMessage({
        text:'刪除產品成功',
        status:'success'
      }));
      getProducts();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  // close Modal
  const closeModal = () =>{
    controlModal.current.hide();
  }

  return(<>
    <Loading isLoading={isLoading} />
    <div>
      <div className="container">
        <div className="text-start mt-4">
          <button type="button" className="btn btn-blue me-3" onClick={() => openEditModal(products, 'create')}>建立新的產品</button>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>圖片</th>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product)=>{
              return (<tr key={product.id}>
                <td><img src={product.imageUrl} alt="imageUrl" className="object-fit-cover" style={{height:"40px"}}/></td>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td className="text-start">{product.origin_price}</td>
                <td className="text-start">{product.price}</td>
                <td>
                  {product.is_enabled ? (<span className="text-success">啟用</span>) : (<span className="text-danger">未啟用</span>)}
                </td>
                <td>
                  <div className="btn-group">
                    <button type="button" className="btn btn-outline-blue btn-sm" onClick={() => openEditModal(product, 'edit')}>
                      編輯
                    </button>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteModal(product)}>
                      刪除
                    </button>
                  </div>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
        <Pagination pagination={pagination} getProducts={getProducts} products={products}/>
      </div>
    </div>
    <ProductsModal
      editModalRef={editModalRef} 
      closeModal={closeModal} 
      tempProduct={tempProduct} 
      controlModalInput={controlModalInput} 
      editProduct={editProduct}
      controlImgInput={controlImgInput}
      addImg={addImg}
      removeImg={removeImg}
      controlFileChange={controlFileChange}
    />

    <DeleteModal
      deleteRef={deleteRef} 
      closeModal={closeModal} 
      tempProduct={tempProduct} 
      deleteProduct={deleteProduct}
    />

    <MessageToast />
  </>)
}

export default AdminProducts;