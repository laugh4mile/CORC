import { useParams } from "react-router-dom";

const SalesDetailPage = () => {
  const params = useParams();

  return (
    <div>
      <h1>{params.storeId}의 판매 내역</h1>
    </div>
  );
};

export default SalesDetailPage;
