import axios from 'axios'
import { useState ,useEffect} from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useRouter } from 'next/router';


function Pay(props) {
  const router = useRouter();

  const [orderPrice, setOrderPrice] = useState(0)
  const [orderNumber, setOrderNumber] = useState(0)

  useEffect(() => {
    
    setOrderPrice(parseInt(localStorage.getItem('totalPrice')))
    setOrderNumber(localStorage.getItem('orderNumber'))

}, [router.isReady]);


  const handleLinePay = () => {
    confirmAlert({
      title: '確認付款',
      message: '確認要導向至LINE Pay進行付款？',
      buttons: [
        {
          label: '確定',
          onClick: () => {

            // 在本window直接導至node付款(reverse)url，之後會導向至line pay
            window.location.href =
            'http://localhost:3005/api/pay/reserve'  +
              '?orderId=' +
              orderNumber
          },
        },
        {
          label: '取消',
          onClick: () => {},
        },
      ],
    })
    localStorage.removeItem("orderNumber");
    localStorage.removeItem("totalPrice");

  }


  return (
    <>
      <div className='container my-5'>
        <h2>訂單明細</h2>
        <p>訂單編號: {orderNumber}</p>
        <p>總金額: {orderPrice}元</p>


        <button
            className='btn btn-confirm'
            onClick={handleLinePay}
            // 限制有orderId產生後才能點按
            disabled={!orderNumber}
        >
            前往付款
        </button>
      </div>

    </>
  )
}

export default Pay