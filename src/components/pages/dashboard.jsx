import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./modal.css"
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchProducts } from "../../store/actions/actions";
import { BASE_URL } from "../../url";

function Home(){
  const url = BASE_URL+"/products/";
  const [locate, setLocate] = useState("");
  const productDispatch = useDispatch();
  const dataProducts = useSelector((state) => state.products);
  const [isFormSubmisitted, setIsFormSubitted] = useState(false);
  

  const number_products = dataProducts.length;
  const [data, setData] = useState({
    product_name: "",
    product_image: "",
    added_by: 1,
    location: [
        {
          locate: "", 
        }],
    movelocation: [
        {
            
        }
    ]
})
useEffect(()=>{
  console.log(data);
},[locate])

useEffect(() => {
  productDispatch(fetchProducts());
}, []);

function handleSubmit(e){
    const newdata = {...data}
    e.target.id === "locate" ?  newdata.location[0][e.target.id] = e.target.value :  newdata[e.target.id] = e.target.value 
    setData(newdata)
}

const closeModel = () => {
  document.querySelector("#modalClose").click();
}

function submit(e){
  console.log(data);
  setIsFormSubitted(true);
   axios.post(url,{
     product_name:data.product_name,
     product_image:data.product_image,
     added_by:data.added_by,
     location: data.location,
     movelocation:data.movelocation
}).then(res => {
  setIsFormSubitted(false)
  closeModel()
  toast.success("Product added sucessfully")
  console.log(res);
   }).catch((error)=>{
     setIsFormSubitted(false)
     console.log(error)
     closeModel()
  })
}

    
    return(
        <div class='row'>
        <div class='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
          <div class='card'>
            <div class='card-body p-3'>
              <div class='row'>
                <div class='col-8'>
                  <div class='numbers'>
                    <a class='text-sm mb-0 text-capitalize font-weight-bold' href="#demo-modal">
                      Add Product
                    </a>
                    <h5 class='font-weight-bolder mb-0'>
                      Add Product
                      
                    </h5>
                  </div>
                </div>
                <div class='col-4 text-end'>
                  <div class='icon icon-shape bg-gradient-primary shadow text-center border-radius-md'>
                    <i
                      class='ni ni-money-coins text-lg opacity-10'
                      aria-hidden='true'
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
          <div class='card'>
            <div class='card-body p-3'>
              <div class='row'>
                <div class='col-8'>
                  <div class='numbers'>
                    <p class='text-sm mb-0 text-capitalize font-weight-bold'>
                      Number of Products
                    </p>
                    <h5 class='font-weight-bolder mb-0'>
                      {number_products}
                      
                    </h5>
                  </div>
                </div>
                <div class='col-4 text-end'>
                  <div class='icon icon-shape bg-gradient-primary shadow text-center border-radius-md'>
                    <i
                      class='ni ni-world text-lg opacity-10'
                      aria-hidden='true'
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="wrapper">
    
</div>

<div id="demo-modal" class="modal">
    <div class="modal__content">
        
        
        <p>Add Product </p>	    	
				  <div class="card-body">
                  <form role="form" onSubmit={(e)=>submit(e)} >
                    <label>Product Name</label>
                    <div class="mb-3">
                      <input type="text" class="form-control" required placeholder="Product Name" aria-label="name" id="product_name" value={data.product_name} onChange={(e)=>handleSubmit(e)} />
                    </div>
                    <label>Product Image</label>
                    <div class="mb-3">
                      <input type="text" class="form-control" id="product_image" value={data.product_image} onChange={(e)=>handleSubmit(e)} placeholder="name" aria-label="name"/>
                    </div>
                    <label>Product Warehouse Location</label>
                    <div class="mb-3">
                      <input type="text" class="form-control"  value={data.location[0].locate} onChange={(e)=>handleSubmit(e)} id="locate" placeholder="location" aria-label="name"/>
                    </div>
                  
                    <div class="text-center">
                      <button type="submit" class="btn bg-gradient-info w-100 mt-4 mb-0" disabled={isFormSubmisitted}>Add</button>
                    </div>
                  </form>
                </div>

        <div class="modal__footer">
            Made with <i class="fa fa-heart"></i>, by <a href="https://twitter.com/denicmarko" target="_blank">@denicmarko</a>
        </div>

        <a href="#" class="modal__close" id="modalClose">&times;</a>
    </div>
</div>
        
      </div>
    )

}


export default Home;