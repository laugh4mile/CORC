import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import RequestedStoreList from '../../components/Store/RequestedStoreList';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getAllRequestedStores } from '../../lib/api-store';

import classes from './StoreListPage.module.css';

const RequestedStoresPage = () => {
  const {
    sendRequest,
    status,
    data: loadedStores,
    error,
  } = useHttp(getAllRequestedStores, true);

  useEffect(() => {
    sendRequest();
    console.log(loadedStores);
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

  if (status === 'completed' && (!loadedStores || loadedStores.length === 0)) {
    return <span>가맹점이 없습니다.</span>;
  }
  return (
    <div className="page">
      <span className="title">가맹점 신청 목록</span>
      <section className={classes.section}>
        <Link className="btn" to="/store/register">
          Allow
        </Link>
        <RequestedStoreList stores={loadedStores} />
      </section>
    </div>
  );
};

export default RequestedStoresPage;
