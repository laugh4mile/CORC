import { useParams, useLocation } from "react-router-dom";

const PaymentDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const { userName } = location.state;

  console.log("params", params);
  console.log("state", location.state);

  return (
    <section className="page">
      <span className="title">
        {`${userName} (${params.employeeNum})`}의 결제 내역
      </span>
    </section>
  );
};

export default PaymentDetailPage;
