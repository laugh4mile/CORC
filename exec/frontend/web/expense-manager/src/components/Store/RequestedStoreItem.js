import { useHistory } from 'react-router-dom';

import classes from './Item.module.css';

const RequestedStoreItem = (props) => {
  const history = useHistory();

  const classificationName = (classificationName) => {
    if (classificationName === '01') return '농업, 임업 및 어업';
    else if (classificationName === '02') return '광업';
    else if (classificationName === '03') return '제조업';
    else if (classificationName === '04')
      return '전기, 가스, 증기 및 공기 조절 공급업';
    else if (classificationName === '05')
      return '수도, 하수 및 폐기물 처리, 원료 재생업';
    else if (classificationName === '06') return '건설업';
    else if (classificationName === '07') return '도매 및 소매업';
    else if (classificationName === '08') return '운수 및 창고업';
    else if (classificationName === '09') return '숙박 및 음식점업';
    else if (classificationName === '10') return '정보통신업';
    else if (classificationName === '11') return '금융 및 보험업';
    else if (classificationName === '12') return '부동산업';
    else if (classificationName === '13') return '전문, 과학 및 기술 서비스업';
    else if (classificationName === '14')
      return '사업시설 관리, 사업 지원 및 임대 서비스업';
    else if (classificationName === '15')
      return '공공 행정, 국방 및 사회보장 행정';
    else if (classificationName === '16') return '교육 서비스업';
    else if (classificationName === '17') return '보건업 및 사회복지 서비스업';
    else if (classificationName === '18')
      return '예술, 스포츠 및 여가관련 서비스업';
    else if (classificationName === '19')
      return '현회 및 단체, 수리 및 기타 개인 서비스업';
    else if (classificationName === '20')
      return '가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동';
    else if (classificationName === '21') return '국제 및 외국기관';
  };

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + '원';

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
        <td className={`${classes.td} ${classes.checkbox}`}>
          <input
            type="checkbox"
            value={props.storeId}
            name="storeId"
            onChange={(e) =>
              props.handleSingleCheck(e.target.checked, props.storeId)
            }
            // checkItems에 data.id가 있으면 체크 아니면 체크 해제
            checked={props.checkItems.includes(props.storeId) ? true : false}
          />
        </td>
        <td
          className={`${classes.td} ${classes.link}`}
          onClick={trClickHandler}
        >
          {props.crNum}
        </td>
        <td className={`${classes.td}`}>{props.storeName}</td>
        <td className={`${classes.td}`}>
          {props.sido.sidoName} {props.gugun.gugunName}
        </td>
        <td className={`${classes.td}`}>
          {classificationName(props.category.categoryClassification)}
        </td>
        <td className={`${classes.td} ${classes['text-sm']} ${classes.date}`}>
          {props.requestDate.slice(0, 10)}
        </td>
      </tr>
    </tbody>
  );
};

export default RequestedStoreItem;
