import {
  Row, 
  Col,
  Checkbox
} from 'antd';
import { Fragment, useState } from 'react';
import styles from '@style/step_select.module.scss';
const StepSelect = (props) =>{
  const { 
    justify, 
    titleJustify, 
    title,
    titleClassName='',
    contentBoxClassName='',
    leftClassName='',
    midClassName='',
    showIndx=0,
    rightClassName='',
    leftItemClassName='',
    rightItemClassName='',
    dataInfo=[],
    checkedInfo={},
    callBackFunc,
  } = props;
  const [ dataList ] = useState(dataInfo);
  const [ leftSelectIdx, setLeftSelectIdx ] = useState(showIndx);
  const [ checkObjList, setCheckObjList ] = useState(checkedInfo);
  const setCheckObjListFunc = (val) =>{
    let parent = dataList[leftSelectIdx]['path'];
    let obj = {};
    obj[parent] = val || [] ;
    let newObj = { ...checkObjList, ...obj };
    setCheckObjList(newObj);
    runCallbackFunc(newObj);
  };
  const getCheckItemList = () =>{
    let key = dataList[leftSelectIdx]['path'];
    let list = checkObjList[key] || [];
    return list.slice();
  };
  const rightItemFunc =() =>{
    if (dataList.length === 0) return '无数据';
    const { children } = dataList[leftSelectIdx];
    if (typeof children === 'undefined' || children.length === 0) {
      return '-';
    }
    let newArray = [ { name: '全选', path: '*' } ].concat(children);
    let isShowAllDom = getCheckItemList().includes('*');
    if (isShowAllDom) {
      return <Checkbox checked={isShowAllDom}
        onChange={(e)=>{
          let v = e.target.checked;
          if (v === true) return;
          setCheckObjListFunc([]);
        }}>{ newArray[0]['name']}</Checkbox>;
    }
    return newArray.map( (item, idx) =>{
      let { path, name } = item;
      return <div key={idx} className={ `${styles.rightItem } ${rightItemClassName}` }>
        <Checkbox onChange={(e)=>{
          let v = e.target.checked;
          if (path === '*' && v) {
            setCheckObjListFunc([ '*' ]);
            // runCallbackFunc();
            return;
          }
          if (v) {
            let list = getCheckItemList();
            let newList = list.slice().concat([ path ]);
            !list.includes(path) && setCheckObjListFunc(newList);
            return;
          }
          let array = getCheckItemList().filter(item => item !== path);
          setCheckObjListFunc(array);
        }} checked={ getCheckItemList().includes(path) }>{ name }</Checkbox>
      </div>;
    } );
  };
  const runCallbackFunc = (obj) =>{
    callBackFunc && callBackFunc(obj);
  };
  return <Fragment>
    <Row justify={ titleJustify || 'flex-start'} className={ `${styles.title} ${titleClassName}` }>
      <Col>{title}</Col>
    </Row>
    <Row justify={ justify || 'space-between' } className={`${styles.contentBox} ${contentBoxClassName}`}>
      <Col className={ `${styles.leftCol} ${leftClassName}` }>
        <Fragment >
          {
            dataList.length === 0 ? '无数据' : dataList.map( (item, idx) =>{
              let { path, name } = item;
              return <div key={idx} className={`${styles.leftItem} ${leftItemClassName} ${idx === leftSelectIdx ? `${styles.leftItemActive} active` : ''}`} onClick={() =>{
                if (idx === leftSelectIdx) return;
                setLeftSelectIdx(idx);
              }}>{ name }</div>;
            })
          }
        </Fragment>
      </Col>
      <Col className={`${styles.midCol} ${midClassName}`}>{ '>' }</Col>
      <Col className={`${styles.rightCol} ${rightClassName}`}>{
        rightItemFunc()
      }</Col>
    </Row>
  </Fragment>;
};

export default StepSelect;