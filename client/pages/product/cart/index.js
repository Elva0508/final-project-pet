import React,{useState,useEffect} from 'react'
import {RiDeleteBin5Fill} from 'react-icons/Ri';
import useRWD from '@/hooks/useRWD';
import Footer from '@/components/footer';
import axios from "axios";

export default function Cart() {
    const [cart, setCart] = useState([])
    const [isChecked, setIsChecked] = useState(true);
    const [coupon, setCoupon] = useState([])

    const getCart = async() => {
        await axios.get("http://localhost:3005/product/cart")
          .then((response) => {
            const data = response.data.result;
            const newData=data.map((v)=>{
                return  { ...v, buy: true }
            })
            console.log(newData);
            setCart(newData)     
          })
          .catch((error) => {
            console.error("Error:", error);
        });
      }

    useEffect(() => {
        getCart()
      }, [])
    // 判斷是否全選  
      useEffect(() => {
        setIsChecked(allChange(cart,isChecked))   
      }, [cart])

    const toggleSelectedAll=(cart,selected)=>{
        return cart.map((v)=>{
            return {...v,buy:selected}
        })
    }
    const toggleSelected=(cart,selected,id)=>{
        return cart.map((v)=>{
            if(v.cart_id==id) return {...v,buy:selected}
            return {...v}
        })
    }

    const allChange=(cart,isChecked)=>{
        const isAllTrue = cart.find((v)=>v.buy === false)
        const isAllFalse = cart.find((v)=>v.buy === true)
        if(isAllTrue===undefined){
            return true
        }else if(isAllFalse===undefined){
            return false
        }else{
            return isChecked
        }
    }

    const updateQuantity = (cart, id, value) => {
        return cart.map((v) => {
          //展開每個成員時，如果符合條件(v.id === id)則count:v.count+value
          if (v.cart_id === id) return { ...v, quantity: v.quantity + value }
          else return { ...v }
        })
    }
    //刪除
    const deleteCart=async (id) => {     
            try {
              const response = await axios.delete(`http://localhost:3005/product/cart/${id}`);      
              const newCart=cart.filter((v)=>v.cart_id!==id)
              setCart(newCart)   
            } catch (error) {
              console.error("Error:", error);
            }
        } 
    //全選
    const handleToggleSelectedAll=(selected)=>{
        setCart(toggleSelectedAll(cart, selected))
        setIsChecked(selected)
    } 
    //單選
    const handleToggleSelected=(selected,id)=>{
        setCart(toggleSelected(cart, selected,id))
    }
    //+按鈕 
    const handleIncreaseQuantity = (id) => {
        setCart(updateQuantity(cart, id, 1))
      }
    //-按鈕
    const handleDecreaseQuantity = (id) => {
        setCart(updateQuantity(cart, id, -1))
      } 

    let all=0

  return (
    <>
        <div className="cart">
            <div className='container'>
            {/* 步驟 */}
                <div className='d-flex justify-content-center step text-center mb-sm-5 mb-4'>
                    <div className='col-lg-2 col-sm-4 col-5 size-6 step1'>
                        購物車
                    </div>
                    <div className='col-lg-2 col-sm-4 col-5 size-6  step2'>
                        運送&付款
                    </div>
                </div>
            {/* 購物車內商品 */}               
                <div className='d-flex justify-content-center mb-sm-5 mb-4 '>
                    {/* 桌機板 */}
                    <table  className='col-12  d-none d-sm-block cart-d-content'>
                        <thead >
                            <tr className='size-6' >
                                <th className='text-center'><input type="checkbox"  className='size-7' checked={isChecked} onChange={(e)=>{
                                    handleToggleSelectedAll(e.target.checked)
                                }}/></th>
                                <th>商品({cart.length})</th>
                                <th>商品名稱</th>
                                <th  className='text-center'>單價</th>
                                <th  className='text-center'>數量</th>
                                <th  className='text-center'>小計</th>
                                <th  className='text-center'>刪除</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((v)=>{
                                  // 在这里计算每个项目的total
                                    let total=0
                                    if(v.buy){
                                        total = v.newprice * v.quantity;
                                    }
                                    // 累加到总和
                                    all += total;
                                return(
                                <tr className='size-6' key={v.user_id}>
                                <td className='text-center '><input type="checkbox" checked={v.buy} onChange={(e)=>{
                                    handleToggleSelected(e.target.checked,v.cart_id)
                                }}/></td>
                                <td><img src={v.images} /></td>
                                <td>
                                    <p>{v.product_name}</p>
                                    <p className='size-7 type'>{v.type}</p>
                                </td>
                                <td className='text-center'>NT${v.newprice}</td>
                                <td>
                                    <div className="input-group ">
                                        <button type="button" className="btn btn-outline-brown" onClick={() => {
                                            if(v.quantity==1){
                                                deleteCart(v.cart_id)
                                            }else{
                                                handleDecreaseQuantity(v.cart_id)
                                            }                                           
                                        }}>-</button>
                                        <input type="text" className="form-control  text-center  w-25"  value={v.quantity} name="quantity"/>
                                        <button type="button" className="btn btn-outline-brown" onClick={() => {
                                            handleIncreaseQuantity(v.cart_id)
                                        }}>+</button>
                                    </div>
                                </td>
                                <td className='text-center'>NT${v.newprice * v.quantity}</td>
                                <td className='text-center'><button className='delete' 
                                    onClick={() => {deleteCart(v.cart_id) }}
                                    ><RiDeleteBin5Fill /></button></td>
                                </tr>
                                )

                            })}
                            <tr className='size-6'>
                                <td className='text-center'><input type="checkbox" /></td>
                                <td><img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_M3PD150101-e-0.jpg' /></td>
                                <td>
                                    <p>單層開放式防濺貓砂盆</p>
                                    <p className='size-7 type'>藍色</p>
                                </td>
                                <td className='text-center'>$500</td>
                                <td>
                                    <div className="input-group ">
                                        <button type="button" className="btn btn-outline-brown">-</button>
                                        <input type="text" className="form-control  text-center  w-25"  value="12"/>
                                        <button type="button" className="btn btn-outline-brown">+</button>
                                    </div>
                                </td>
                                <td className='text-center'>$1500</td>
                                <td className='text-center'><button className='delete'><RiDeleteBin5Fill /></button></td>
                            </tr>
                        </tbody>
                    </table>
                    {/* 手機板 */}
                    <table className='d-sm-none d-block cart-m-content col-11'>
                        <thead>
                            <tr className='m-size-5'>
                                <th className='text-center'><input type="checkbox" checked={isChecked} onChange={(e)=>{
                                    handleToggleSelectedAll(e.target.checked)
                                }}/></th>
                                <th colspan="4">我的購物車({cart.length})</th>                              
                            </tr>
                        </thead>
                        <tbody>                           
                            {cart.map((v)=>{
                                return(
                            <tr className='m-size-7' key={v.user_id}>
                                <td className='text-center'><input type="checkbox" checked={v.buy} onChange={(e)=>{
                                    handleToggleSelected(e.target.checked,v.cart_id)
                                }}/></td>
                                <td><img src={v.images}></img></td>
                                <td className=''>
                                    <p className='m-0'>{v.product_name}</p>
                                    <p className='m-size-7 type m-0'>{v.type}</p>
                                    <p className='m-0'>NT${v.newprice}</p>
                                    
                                </td>
                                <td>
                                    <div className="input-group input-group-sm ">
                                        <button type="button" className="btn btn-outline-brown" onClick={() => {
                                           if(v.quantity==1){
                                                deleteCart(v.cart_id)
                                            }else{
                                                handleDecreaseQuantity(v.cart_id)
                                            }       
                                        }}>-</button>
                                        <input type="text" className="form-control  text-center "  value={v.quantity}/>
                                        <button type="button" className="btn btn-outline-brown" onClick={() => {
                                            handleIncreaseQuantity(v.cart_id)
                                        }}>+</button>
                                    </div>
                                </td>
                                <td className='text-center'><button className='delete' 
                                        onClick={() => {deleteCart(v.cart_id)}} >
                                        <RiDeleteBin5Fill /></button></td>
                            </tr>
                            )
                        })}

                            <tr className='m-size-7'>
                                <td className='text-center'><input type="checkbox"/></td>
                                <td><img src='https://cdn-front.mao-select.com.tw//upload_files/fonlego-rwd/prodpic/D_M3PD150101-e-0.jpg'></img></td>
                                <td className=''>
                                    <p className='m-0'>單層開放式防濺貓砂盆</p>
                                    <p className='m-size-7 type m-0'>藍色</p>
                                    <p className='m-0'>NT$500</p>
                                    
                                </td>
                                <td>
                                    <div className="input-group input-group-sm ">
                                        <button type="button" className="btn btn-outline-brown">-</button>
                                        <input type="text" className="form-control  text-center  "  value="12"/>
                                        <button type="button" className="btn btn-outline-brown">+</button>
                                    </div>
                                </td>
                                <td className='text-center'><button className='delete'><RiDeleteBin5Fill /></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            {/* 優惠碼+明細 */}
                <div className='d-flex flex-wrap justify-content-around mb-sm-5 mb-4'>
                    <div className='col-lg-3 col-sm-4 col-11 mb-3'>
                        <h6 className="discount size-6">優惠碼</h6>
                        <select className="form-select mb-2" >                           
                            <option selected>請選擇</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <div className='d-grid size-6'>
                            <button type="button" className="btn btn-confirm ">確定使用</button>
                        </div>
                    </div>
                    <div className='col-lg-4 col-sm-7 col-11 detail d-flex justify-content-center p-sm-4 '>
                        <table className='col-sm-11 col-12'>
                            <tbody className=''>
                                <tr>
                                    <td className=''>商品總金額</td>
                                    <td className='text-end'>NT${all}</td>
                                </tr>
                                <tr>
                                    <td>優惠折扣</td>
                                    <td className='text-end'>NT$-30</td>
                                </tr>
                                <tr className='cal'> 
                                    <td className='pb-2'>運費</td>
                                    <td className='text-end'>NT$100</td>
                                </tr>
                                <tr > 
                                    <th className='pt-2'>總計</th>
                                    <th className='text-end'>NT$1070</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* 進度條 */}
            <div className='progress-part size-7'>
                <div className='container py-3 col-11'>
                    <div className='d-flex justify-content-between'>
                        <p>運費</p>
                        <p>再消費NT$300免運</p>
                    </div>
                    <div className="progress" role="progressbar" aria-label="" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar w-75 " ></div>
                    </div>
                </div>
            </div>
            {/* 下一步 */}
            <div className='next py-2 size-7'>
                <div className='container d-flex justify-content-end align-items-center'>
                    <p className='m-0 pe-2'>總計NT$1070</p>
                    <button className='btn btn-brown'>下一步</button>
                </div> 
            </div>
            <Footer />              
        </div>

    </>
  )
}
