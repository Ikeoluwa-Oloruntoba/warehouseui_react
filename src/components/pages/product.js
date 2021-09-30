import React, { useEffect, useState } from 'react';

import { fetchProduct, fetchProducts } from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../url';

function Product() {
  // const [search, setSearch] = useState('mortal');
  // const [selectedData, setselectedData] = useState({});
  const productDispatch = useDispatch();
  const dataProducts = useSelector((state) => state.products);
  const dataProduct = useSelector((state) => state.product);
  const [pro, setPro] = useState({});
  const [local, setlocal] = useState([]);
  const [from_local, setFrom] = useState([]);
  const [to_local, setTo] = useState([]);
  const [status, setStatus] = useState(['Not moved']);
  const [isFormSubmisitted, setIsFormSubitted] = useState(false);
  const [id, setID] = useState([1]);
  const url = BASE_URL + '/product/' + id;

  useEffect(() => {
    productDispatch(fetchProducts());
    // console.log(dataProducts);
  }, []);

  useEffect(() => {
    productDispatch(fetchProduct(id));
    setPro(dataProduct);
    console.log(pro);
    console.log(dataProduct);
  }, [id]);

  useEffect(() => {
    if (dataProduct?.location !== undefined && dataProduct?.location !== null) {
      const Location = Object.values(dataProduct?.location[0]);
      const moveLocation = Object.values(dataProduct?.movelocation[0]);
      function switchData() {
        switch (moveLocation[4]) {
          case 0:
            return 'Not Moved';
            break;
          case 1:
            return 'Moved';
            break;

          default:
            return 'Not yet';
            break;
        }
      }

      function switchLocation() {
        switch (Location[2]) {
          case null:
            return 'Not set';
            break;

          default:
            return Location[2];
            break;
        }
      }
      setlocal(switchLocation());
      setFrom(moveLocation[2]);
      setTo(moveLocation[3]);
      setStatus(switchData());
      // console.log(local);
      // console.log(moveLocation);
    }
  }, [dataProduct?.location, dataProduct?.movelocation, local]);

  const [data, setData] = useState({
    product_name: dataProduct.product_name,
    product_image: dataProduct.product_image,
    qty_in_stock: dataProduct.qty_in_stock,
    added_by: 1,
    location: [
      {
        locate: local,
      },
    ],
    movelocation: [
      {
        from_location: local,
        qty_to_be_moved: '',
        to_location: '',
        status: '1',
      },
    ],
  });

  function handleInput(e) {
    const newdata = { ...data };
    setIsFormSubitted(false);
    e.target.id === 'locate'
      ? (newdata.location[0][e.target.id] = e.target.value)
      : e.target.id === 'from_location'
      ? (newdata.movelocation[0][e.target.id] = e.target.value)
      : e.target.id === 'to_location'
      ? (newdata.movelocation[0][e.target.id] = e.target.value)
      : e.target.id === 'qty_to_be_moved'
      ? (newdata.movelocation[0][e.target.id] = e.target.value)
      : (newdata[e.target.id] = e.target.value);
    console.log(newdata);

    setData(newdata);
  }

  const closeModel = () => {
    document.querySelector('#modalClose').click();
  };

  function submit(e) {
    console.log(data);

    setIsFormSubitted(true);
    if (data.movelocation[0].to_location === data.location[0].locate) {
      closeModel();
      toast.error('Destination Location should be different');
    } else if (data.movelocation[0].qty_to_be_moved > data.qty_in_stock) {
      closeModel();
      toast.error('Quantity is more than available please reduce');
    } else if (
      data.movelocation[0].to_location !== null &&
      data.movelocation[0].qty_to_be_moved !== null &&
      data.movelocation[0].qty_to_be_moved < data.qty_in_stock
    ) {
      var qty = data.qty_in_stock - data.movelocation[0].qty_to_be_moved;
      axios
        .put(url, {
          product_name: data.product_name,
          product_image: data.product_image,
          qty_in_stock: qty,
          added_by: data.added_by,
          location: [
            {
              locate: data.movelocation[0].to_location,
            },
          ],
          movelocation: data.movelocation,
        })
        .then((res) => {
          setIsFormSubitted(false);
          closeModel();
          toast.success('Product Updated sucessfully');
          console.log(res);
        })
        .catch((error) => {
          setIsFormSubitted(false);
          console.log(error);
          closeModel();
        });
    }
  }

  return (
    <>
      <div class='row my-4'>
        <div class='col-12'>
          <div class='card mb-4'>
            <div class='card-header pb-0'>
              <h6>Products table</h6>
            </div>
            <div class='card-body px-0 pt-0 pb-2'>
              <div class='table-responsive p-0'>
                <table class='table align-items-center mb-0'>
                  <thead>
                    <tr>
                      <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        id
                      </th>
                      <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>
                        Product Name
                      </th>
                      <th class='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Status
                      </th>
                      <th class='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                        Quantity
                      </th>
                      <th class='text-secondary opacity-7'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataProducts?.length === 0 || dataProducts == null ? (
                      <img src={''} alt='' className='image' />
                    ) : (
                      dataProducts?.map((item) => {
                        return (
                          <tr>
                            <td>
                              <div class='d-flex px-2 py-1 '>
                                <div></div>
                                <div class='d-flex flex-column justify-content-center'>
                                  <h6 class='mb-0 text-sm'>
                                    {item?.Product_id}
                                  </h6>
                                  <a
                                    productid={item?.Product_id}
                                    class='text-xs text-secondary mb-0d'
                                    type='button'
                                    href='#product'
                                    onClick={() => setID(item?.Product_id)}
                                  >
                                    view
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p class='text-xs font-weight-bold mb-0'>
                                {item?.product_name}
                              </p>
                            </td>
                            <td class='align-middle text-center text-sm'>
                              <span class='badge badge-sm bg-gradient-success'>
                                loading...
                              </span>
                            </td>
                            <td class='align-middle text-center'>
                              <span class='text-secondary text-xs font-weight-bold'>
                                {item?.qty_in_stock}
                              </span>
                            </td>
                            <td class='align-middle'>
                              <a
                                href='#update'
                                class='text-secondary font-weight-bold text-xs'
                                type='button'
                                onClick={() => setID(item?.Product_id)}
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div id='product' class='modal'>
          <div class='modal__content'>
            <p>Product </p>
            <div class='card-body'>
              <div class='col-12 '>
                <div class='card h-100'>
                  <div class='card-header pb-0 p-3'>
                    <div class='row'>
                      <div class='col-md-8 d-flex align-items-center'>
                        <h6 class='mb-0'>Product Information</h6>
                      </div>
                      <div class='col-md-4 text-end'>
                        <a href='javascript:;'>
                          <i
                            class='fas fa-user-edit text-secondary text-sm'
                            data-bs-toggle='tooltip'
                            data-bs-placement='top'
                            title='Edit Profile'
                          ></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class='card-body p-3'>
                    {/* <p class='text-sm'>
                      Hi, I’m Alec Thompson, Decisions: If you can’t decide, the
                      answer is no. If two equally difficult paths, choose the
                      one more painful in the short term (pain avoidance is
                      creating an illusion of equality).
                    </p> */}
                    <hr class='horizontal gray-light my-4' />
                    <ul class='list-group'>
                      <li class='list-group-item border-0 ps-0 pt-0 text-sm'>
                        <strong class='text-dark'>Name:</strong> &nbsp;
                        {dataProduct.product_name}
                      </li>
                      <li class='list-group-item border-0 ps-0 text-sm'>
                        <strong class='text-dark'>location:</strong>
                        {local}
                      </li>
                      <li class='list-group-item border-0 ps-0 text-sm'>
                        <strong class='text-dark'>Moved from: </strong> &nbsp;
                        {from_local}
                      </li>
                      <li class='list-group-item border-0 ps-0 text-sm'>
                        <strong class='text-dark'>To: </strong>

                        {to_local}
                      </li>
                      <li class='list-group-item border-0 ps-0 text-sm'>
                        <strong class='text-dark'>Status: </strong>

                        {status}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <a href='#' class='modal__close' id='modalClose'>
                &times;
              </a>
            </div>
          </div>
        </div>
        <div id='update' class='modal'>
          <div class='modal__content'>
            <p>Edit Product </p>
            <div class='card-body'>
              <form role='form' onSubmit={(e) => submit(e)}>
                <label>Product Name</label>
                <div class='mb-3'>
                  <input
                    type='text'
                    class='form-control'
                    required
                    placeholder='Product Name'
                    aria-label='name'
                    id='product_name'
                    value={dataProduct.product_name || data.product_name}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div class='mb-3'>
                  <input
                    type='text'
                    class='form-control'
                    id='product_image'
                    value={dataProduct.product_image || data.product_image}
                    onChange={(e) => handleInput(e)}
                    placeholder='Please enter any text for image'
                    aria-label='name'
                  />
                </div>
                <label>Product Quantity</label>
                <div class='mb-3'>
                  <input
                    type='text'
                    class='form-control'
                    id='qty_in_stock'
                    value={data.qty_in_stock || dataProduct.qty_in_stock}
                    onChange={(e) => handleInput(e)}
                    placeholder='Quantity'
                    aria-label='name'
                  />
                </div>
                <label>Product Warehouse Location</label>
                <div class='mb-3'>
                  <input
                    type='text'
                    class='form-control'
                    value={local}
                    onChange={(e) => handleInput(e)}
                    id='locate'
                    placeholder='location'
                    aria-label='name'
                  />
                </div>
                <label>Move From</label>
                <div class='mb-3'>
                  <input
                    type='text'
                    class='form-control'
                    value={local}
                    onChange={(e) => handleInput(e)}
                    id='from_location'
                    placeholder='location'
                    aria-label='name'
                  />
                </div>

                <div class='mb-3'>
                  <input
                    type='text'
                    class='form-control'
                    value={data.movelocation[0].qty_to_be_moved}
                    onChange={(e) => handleInput(e)}
                    id='qty_to_be_moved'
                    placeholder='Quantity to be moved'
                    aria-label='name'
                  />
                </div>

                <div class='mb-3'>
                  <input
                    type='text'
                    class='form-control'
                    value={data.movelocation[0].to_location}
                    onChange={(e) => handleInput(e)}
                    id='to_location'
                    placeholder=' To location e.g Lagos'
                    aria-label='name'
                  />
                </div>
                <div class='text-center'>
                  <button
                    type='submit'
                    class='btn bg-gradient-info w-100 mt-4 mb-0'
                    disabled={isFormSubmisitted}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>

            <div class='modal__footer'>
              Made with <i class='fa fa-heart'></i>, by{' '}
              <a href='https://twitter.com/denicmarko' target='_blank'>
                @oloruntobaikeoluwa
              </a>
            </div>

            <a href='#' class='modal__close' id='modalClose'>
              &times;
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
