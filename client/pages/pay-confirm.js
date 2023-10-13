import { useRouter } from 'next/router';
import { useAuth } from '@/context/fakeAuthContext';
import {useEffect} from 'react'



function PayConfirm(props) {

  const router = useRouter();

  return (
    <>
      <div className='container my-5 pay-confirm text-center'>
        <img src='/checkout.png'></img>
        <h2 className='mb-4'>已完成付款</h2>
        <div className='d-flex justify-content-center'>       
          <button className="btn btn-confirm" onClick={ () => router.push('/member/order')}>
              查看我的訂單
          </button>
      </div>
      </div>

    </>
  )
}

export default PayConfirm