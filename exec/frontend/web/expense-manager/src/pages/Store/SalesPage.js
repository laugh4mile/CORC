import { useEffect, useState } from 'react';

import PaymentList from '../../components/Payment/PaymentList';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getAllPayment } from '../../lib/api-store';
import Page from '../../components/Pagenation';

import classes from './list.module.css';

const SalesPage = () => {
  const {
    sendRequest,
    status,
    data: loadedPayments,
    error,
  } = useHttp(getAllPayment, true);

  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

  useEffect(() => {
    sendRequest(pageInfo);
  }, [sendRequest, pageInfo]);

  if (status === 'pending') {
    return (
      <div className="page">
        <span className="title">판매 내역</span>
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (
    status === 'completed' &&
    (!loadedPayments.content || loadedPayments.content.length === 0)
  ) {
    return <span>판매 내역이 없습니다.</span>;
  }

  return (
    <div className="page">
      <span className="title">판매 내역</span>
      <section className={classes.section}>
        <PaymentList payments={loadedPayments.content} />
        <Page
          totalElements={loadedPayments.totalElements}
          blockSize={4}
          number={loadedPayments.number}
          size={loadedPayments.size}
          onClick={setPageInfo}
        ></Page>
      </section>
    </div>
  );
};

export default SalesPage;
