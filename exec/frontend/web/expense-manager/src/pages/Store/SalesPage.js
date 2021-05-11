import { useEffect } from 'react';

import PaymentList from '../../components/Payment/PaymentList';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getAllPayment } from '../../lib/api-store';

import classes from './SalesPage.module.css';

const SalesPage = () => {
  const {
    sendRequest,
    status,
    data: loadedPayments,
    error,
  } = useHttp(getAllPayment, true);

  useEffect(() => {
    sendRequest();
    console.log('lp', loadedPayments);
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (
    status === 'completed' &&
    (!loadedPayments || loadedPayments.length === 0)
  ) {
    return <span>판매 내역이 없습니다.</span>;
  }

  return (
    <div className="page">
      <span className="title">판매 내역</span>
      <section className={classes.section}>
        <PaymentList payments={loadedPayments} />
      </section>
    </div>
  );
};

export default SalesPage;
