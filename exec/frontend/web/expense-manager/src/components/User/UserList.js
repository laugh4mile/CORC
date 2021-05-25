import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import { userStatus, modifyCardLimit, resetBalance } from "../../lib/api-user";
import UserItem from "./UserItem";
import useHttp from "../../hooks/use-http";

import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import CardLimit from "../UI/CardLimit/CardLimit";
import classes from "./List.module.css";

const sortUsers = (users, ascending) => {
  return users.sort((userA, userB) => {
    if (ascending) {
      return userA.id - userB.id;
    } else {
      return userB.id - userA.id;
    }
  });
};

const UserList = (props) => {
  const { sendRequest: sendStatus, status: userStatusStatus } =
    useHttp(userStatus);
  const { sendRequest: sendCardLimit, status: cardLimitStatus } =
    useHttp(modifyCardLimit);
  const { sendRequest: resetRequest, status: resetStatus } =
    useHttp(resetBalance);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkItems, setCheckItems] = useState([]);
  const [userIdx, setUserIdx] = useState([]);
  const [users, setUsers] = useState(props.users);

  const showModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSingleCheck = (checked, id, index) => {
    if (checked) {
      setCheckItems([...checkItems, id]);

      const findIdx = userIdx.indexOf(index);

      if (findIdx > -1) userIdx.splice(findIdx, 1);
      else userIdx.push(index);

      setUserIdx(userIdx);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((el) => el !== id));
      setUserIdx(userIdx.filter((el) => el !== index));
    }
  };

  const handleAllCheck = (checked, index) => {
    if (checked) {
      const idArray = [];
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      props.users.forEach((el, index) => {
        idArray.push(el.userId);
        userIdx.push(index);
      });

      setCheckItems(idArray);
      setUserIdx([...new Set(userIdx)]);
    }
    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckItems([]);
      setUserIdx([]);
    }
  };

  const addUserHandler = (userStatus, userIds) => {
    sendStatus({ userStatus, userIds });
  };

  const submitHandler = (event) => {
    addUserHandler(event.target.value, checkItems);
    setUsers(users);
    setUserIdx([]);
    window.location.reload();
  };

  const cardLimitHandler = (limit, userIds) => {
    sendCardLimit({ limit, userIds });
  };

  const submitCardLimitHandler = (event) => {
    cardLimitHandler(event.target.value, checkItems);

    setUsers(users);
    setUserIdx([]);
    window.location.reload();
  };

  const resetHandler = (userIds) => {
    resetRequest(userIds);
  };

  const submitResetHandler = (event) => {
    resetHandler(checkItems);
    setUsers(users);
    setUserIdx([]);
    window.location.reload();
  };

  return (
    <Fragment>
      <Modal show={modalIsOpen} closed={closeModal}>
        <CardLimit checkItems={checkItems} />
      </Modal>
      {modalIsOpen ? <Backdrop show={modalIsOpen} closed={closeModal} /> : null}
      <div className={classes.section}>
        <Button small sub fit name="allow" value="1" onClick={submitHandler}>
          활성
        </Button>
        <Button small sub fit name="deny" value="2" onClick={submitHandler}>
          정지
        </Button>
        <Button small sub fit name="deny" value="0" onClick={submitHandler}>
          삭제
        </Button>
        <Button small sub fit name="allow" value="3" onClick={showModal}>
          한도 수정
        </Button>
        <Button
          small
          sub
          fit
          name="allow"
          value=""
          onClick={submitResetHandler}
        >
          잔액 초기화
        </Button>
        <article style={{ marginLeft: "0.5rem", width: "fit-content" }}>
          <Link className={classes.linkBtn} to="/user/register">
            사용자 등록
          </Link>
        </article>
      </div>
      <Card type="nofit">
        <table>
          <thead>
            <tr className={classes.tr}>
              <th style={{ width: "30%", fontSize: "0.875rem" }}>상태</th>
              <th style={{ width: "15%" }}>
                <input
                  type="checkbox"
                  name="status"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  // checkItems의 개수와 불러오는 데이터가 같을 때, 전체 선택을 활성화
                  // 하나라도 빼면 체크 박스 해제
                  checked={
                    props.page === 0
                      ? false
                      : checkItems.length === props.page
                      ? true
                      : false
                  }
                />
              </th>
              <th>사번</th>
              <th>이름</th>
              <th>부서</th>
              <th>직급</th>
              <th>잔액</th>
              <th>한도</th>
              <th>상태</th>
              <th>마지막 접속일</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserItem
                key={user.userId}
                {...user}
                index={index}
                handleSingleCheck={handleSingleCheck}
                checkItems={checkItems}
              />
            ))}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default UserList;
