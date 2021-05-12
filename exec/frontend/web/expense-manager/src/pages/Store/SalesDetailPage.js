import { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import StoreInfo from '../../components/Store/StoreInfo';
import StoreSales from '../../components/Store/StoreSales';
import Card from '../../components/UI/Card/Card';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getSingleStore, getStorePayment } from '../../lib/api-store';
import Page from '../../components/Pagenation';

import classes from './SalesDetailPage.module.css';

const SalesDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const [pageInfo, setPageInfo] = useState({ page: 0, size: 1 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

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
    sendStorePayment(storeId, pageInfo);
  }, [sendSingleStore, sendStorePayment, storeId, pageInfo]);

  if (paymentStatus === 'pending' && storeStatus === 'pending') {
    return (
      <div className="page">
        <span className="title">가맹점 결제 내역 목록</span>
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
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
  // console.log('loadedPayment', typeof loadedPayment.totalElements);

  console.log('loadedPayment', loadedPayment);

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
        {logStyle && <StoreSales logs={loadedPayment.content} />}
        {logStyle && (
          <Page
            totalElements={loadedPayment.totalElements}
            blockSize={4}
            number={loadedPayment.number}
            size={loadedPayment.size}
            onClick={setPageInfo}
          />
        )}
      </Card>
    </section>
  );
};

export default SalesDetailPage;
