import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import RequestedStoreList from '../../components/Store/RequestedStoreList';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getAllRequestedStores } from '../../lib/api-store';
import Page from '../../components/Pagenation';

import classes from './StoreListPage.module.css';

const RequestedStoresPage = () => {
  const {
    sendRequest,
    status,
    data: loadedStores,
    error,
  } = useHttp(getAllRequestedStores, true);

  const [pageInfo, setPageInfo] = useState({ page: 0, size: 1 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

  useEffect(() => {
    sendRequest(pageInfo);
  }, [sendRequest, pageInfo]);

  if (status === 'pending') {
    return (
      <div className="page">
        <span className="title">가맹점 신청 목록</span>
        <section className={classes.spinner}>
          <LoadingSpinner />
        </section>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === 'completed' && (!loadedStores || loadedStores.length === 0)) {
    return <span>등록 신청한 가맹점이 없습니다.</span>;
  }
  return (
    <div className="page">
      <span className="title">가맹점 신청 목록</span>
      <section className={classes.section}>
        <Link className="btn" to="/store/register">
          Allow
        </Link>
        <RequestedStoreList stores={loadedStores.content} />
        <Page
          totalElements={loadedStores.totalElements}
          blockSize={4}
          number={loadedStores.number}
          size={loadedStores.size}
          onClick={setPageInfo}
        ></Page>
      </section>
    </div>
  );
};

export default RequestedStoresPage;
