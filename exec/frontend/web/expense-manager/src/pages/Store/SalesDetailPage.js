import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import StoreInfo from '../../components/Store/StoreInfo';
import StoreSales from '../../components/Store/StoreSales';
import Card from '../../components/UI/Card/Card';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getSingleStore, getStorePayment } from '../../lib/api-store';

import classes from './SalesDetailPage.module.css';

const SalesDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const storeName = location.state.storeName;
  const storeCrNum = location.state.storeCrNum;
  const storeId = location.state.storeId;
  const [infoStyle, setInfoStyle] = useState(true);
  const [logStyle, setLogStyle] = useState(false);

  const infoClickHandler = () => {
    setInfoStyle(true);
    setLogStyle(false);
  };

  const logClickHandler = () => {
    setInfoStyle(false);
    setLogStyle(true);
  };

  const goBackHandler = () => history.goBack();

  const infoActiveStyle = () => (infoStyle ? classes.active : '');
  const logActiveStyle = () => (logStyle ? classes.active : '');

  const {
    sendRequest: sendSingleStore,
    status: storeStatus,
    data: loadedStore,
    error: storeError,
  } = useHttp(getSingleStore, true);

  const {
    sendRequest: sendStorePayment,
    status: paymentStatus,
    data: loadedPayment,
    error: paymentError,
  } = useHttp(getStorePayment, true);

  useEffect(() => {
    sendSingleStore(storeId);
    sendStorePayment(storeId);
    console.log(loadedStore);
  }, [sendSingleStore, sendStorePayment, storeId]);

  if (paymentStatus === 'pending' && storeStatus === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (paymentError) {
    return <p className="centered focused">{paymentError}</p>;
  }

  if (storeError) {
    return <p className="centered focused">{storeError}</p>;
  }

  if (
    storeError === 'completed' &&
    (!loadedStore || loadedStore.length === 0)
  ) {
    return <span>가맹점이 없습니다.</span>;
  }

  if (
    paymentError === 'completed' &&
    (!loadedPayment || loadedPayment.length === 0)
  ) {
    return <span>가맹점 결제 내역이 없습니다.</span>;
  }

  return (
    <section className="page">
      <span className="title">{`${storeName} (${storeCrNum})`}</span>
      <span className="btn" onClick={goBackHandler}>
        목록으로
      </span>
      <article className={classes.tabs}>
        <span
          className={`${classes.tab} ${infoActiveStyle()}`}
          onClick={infoClickHandler}
        >
          가맹점 정보
        </span>
        <span
          className={`${classes.tab} ${logActiveStyle()}`}
          onClick={logClickHandler}
        >
          {storeName}의 판매 내역
        </span>
      </article>
      <Card type={'nofit'}>
        {infoStyle && <StoreInfo {...loadedStore} />}
        {logStyle && <StoreSales logs={loadedPayment} />}
      </Card>
    </section>
  );
};

export default SalesDetailPage;
