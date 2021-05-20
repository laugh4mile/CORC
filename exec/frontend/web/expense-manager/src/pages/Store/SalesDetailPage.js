import { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import StoreInfo from "../../components/Store/StoreInfo";
import StoreSales from "../../components/Store/StoreSales";
import Card from "../../components/UI/Card/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { getSingleStore, getStorePayment, modifyStore } from "../../lib/api-store";
import Page from "../../components/Pagenation/Page";

import classes from "./SalesDetailPage.module.css";

const SalesDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10 }); // page: 현재 페이지, size: 한 페이지에 출력되는 데이터 갯수

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

  const infoActiveStyle = () => (infoStyle ? classes.active : "");
  const logActiveStyle = () => (logStyle ? classes.active : "");

  const { sendRequest: sendModifyStore, status: modifyStatus } = useHttp(modifyStore);

  const { sendRequest: sendSingleStore, status: storeStatus, data: loadedStore, error: storeError } = useHttp(getSingleStore, true);

  const { sendRequest: sendStorePayment, status: paymentStatus, data: loadedPayment, error: paymentError } = useHttp(getStorePayment, true);

  useEffect(() => {
    sendSingleStore(storeId);
    sendStorePayment({ storeId, pageInfo });
  }, [sendSingleStore, sendStorePayment, storeId, pageInfo]);

  useEffect(() => {
    if (modifyStatus === "completed") {
      history.goBack();
    }
  }, [modifyStatus, history]);

  if (paymentStatus === "pending" && storeStatus === "pending") {
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
    return (
      <div className="page">
        <span className="title">가맹점 목록</span>
        <span className={classes.inform}>{paymentError}</span>
      </div>
    );
  }

  if (storeError) {
    return (
      <div className="page">
        <span className="title">가맹점 목록</span>
        <span className={classes.inform}>{storeError}</span>
      </div>
    );
  }

  if (storeError === "completed" && (!loadedStore || loadedStore.length === 0)) {
    return (
      <div className="page">
        <span className="title">가맹점 목록</span>
        <span className={classes.inform}>가맹점이 없습니다.</span>
      </div>
    );
  }

  if (!loadedPayment) {
    return <div className="page"></div>;
  }

  if (paymentError === "completed" && (!loadedPayment.content || loadedPayment.content.length === 0)) {
    return (
      <div className="page">
        <span className="title">가맹점 목록</span>
        <span className={classes.inform}>가맹점 결제 내역이 없습니다.</span>
      </div>
    );
  }

  const addUserHandler = (storeData) => {
    sendModifyStore(storeData);
  };

  return (
    <section className="page">
      <span className="title">{`${storeName} (${storeCrNum})`}</span>
      <span className="btn" onClick={goBackHandler}>
        목록으로
      </span>
      <article className={classes.tabs}>
        <span className={`${classes.tab} ${infoActiveStyle()}`} onClick={infoClickHandler}>
          가맹점 정보
        </span>
        <span className={`${classes.tab} ${logActiveStyle()}`} onClick={logClickHandler}>
          {storeName}의 판매 내역
        </span>
      </article>
      <Card type={"nofit"}>
        {infoStyle && <StoreInfo {...loadedStore} onModifyStore={addUserHandler} />}
        {logStyle && <StoreSales logs={loadedPayment.content} />}
        {logStyle && loadedPayment.content.length !== 0 && (
          <Page
            totalElements={loadedPayment.totalElements}
            blockSize={5}
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
