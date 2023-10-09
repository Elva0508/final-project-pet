import { useRouter } from 'next/router';


function PayConfirm(props) {
  const router = useRouter();
  
  return (
    <>
      <div className='container my-5'>
        <h2>已完成付款</h2>
        <button className="btn btn-confirm" onClick={ () => router.push('/member/order')}>
            查看我的訂單
        </button>

      </div>

    </>
  )
}

export default PayConfirm