import { useParams } from "react-router-dom";

const PaymentDetailPage = () => {
  const params = useParams();

  return (
    <section>
      <h1>{params.userId}의 결제 내역</h1>
    </section>
  );
};

export default PaymentDetailPage;
