import { useHistory } from "react-router-dom";

import classes from "./Item.module.css";

const RequestedStoreItem = (props) => {
  const history = useHistory();

  const storeCategory = [
    "농업, 임업 및 어업",
    "광업",
    "제조업",
    "전기, 가스, 증기 및 공기 조절 공급업",
    "수도, 하수 및 폐기물 처리, 원료 재생업",
    "건설업",
    "도매 및 소매업",
    "운수 및 창고업",
    "숙박 및 음식점업",
    "정보통신업",
    "금융 및 보험업",
    "부동산업",
    "전문, 과학 및 기술 서비스업",
    "사업시설 관리, 사업 지원 및 임대 서비스업",
    "공공 행정, 국방 및 사회보장 행정",
    "교육 서비스업",
    "보건업 및 사회복지 서비스업",
    "예술, 스포츠 및 여가관련 서비스업",
    "현회 및 단체, 수리 및 기타 개인 서비스업",
    "가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동",
    "국제 및 외국기관",
  ];

  const classificationName = (code) => storeCategory[+code - 1];

  const trClickHandler = () =>
    history.push({
      pathname: `/store/sales/${props.storeId}`,
      state: {
        storeName: `${props.storeName}`,
        storeId: `${props.storeId}`,
        storeCrNum: `${props.crNum}`,
      },
    });

  return (
    <tbody>
      <tr className={classes.tr}>
        <td style={{ width: "10%" }} className={classes.td}>
          <input
            type="checkbox"
            value={props.storeId}
            name="storeId"
            onChange={(e) =>
              props.handleSingleCheck(
                e.target.checked,
                props.storeId,
                props.index
              )
            }
            // checkItems에 data.id가 있으면 체크 아니면 체크 해제
            checked={props.checkItems.includes(props.storeId) ? true : false}
          />
        </td>
        <td
          style={{ width: "60%" }}
          className={`${classes.td} ${classes["text-center"]} ${classes.link}`}
          onClick={trClickHandler}
        >
          {props.crNum}
        </td>
        <td className={`${classes.td} ${classes["text-center"]} `}>
          {props.storeName}
        </td>
        <td style={{ width: "60%" }} className={classes.td}>
          {props.sido.sidoName} {props.gugun.gugunName}
        </td>
        <td
          style={{ width: "80%" }}
          className={`${classes.td} ${classes["text-center"]}`}
        >
          {classificationName(props.category.categoryClassification)}
        </td>
        <td
          style={{ width: "40%" }}
          className={`${classes.td} ${classes["text-sm"]} ${classes.date}`}
        >
          {props.requestDate.slice(0, 10)}
        </td>
      </tr>
    </tbody>
  );
};

export default RequestedStoreItem;
