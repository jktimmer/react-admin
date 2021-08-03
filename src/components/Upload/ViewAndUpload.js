import { Fragment, useState } from 'react';
import { Row, Col } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import UploadFile from '@components/Upload/index';
import styles from '@style/view_upload.module.scss';
const ViewAndUpload = (props) =>{
  const { imgList=[], type, onChange, maxCount } = props;
  const [ showIdx, setShowIdx ] = useState(0);
  const dealDiffType = (item,idx) =>{
    if (type === 'view') {
      return <img src={item} alt='tupian' style={{ width: 120, height: 120, borderRadius: 4 }} onClick={() =>{
        if (idx === showIdx) return;
        setShowIdx(idx);
      } }/>;
    }
    return <div className={styles.viewImg }>
      <img src={item} alt='tupian' style={{ width: 120, height: 120, borderRadius: 4 }}/>
      <Row className={ styles.hoverDom } justify='center' align='middle'>
        <EyeOutlined style={{ marginRight: 20, color: '#fff' }} onClick={() =>{
          if (idx === showIdx) return;
          setShowIdx(idx);
        }}/>
        <DeleteOutlined style={{ color: '#fff' }} onClick={()=>{
          let array = imgList.filter(itm => itm !== item);
          onChange && onChange(array);
        }}/>
      </Row>
    </div>;
  };

  const showImgDom = () =>{
    if (imgList.length === 0) {
      return <UploadFile key={~~(Math.random() * 1000 ) + '_no'} maxCount={1} onChange={(v)=>{
        let newArray = [ ...imgList ];
        newArray.push(v);
        onChange && onChange(newArray);
      }}/>;
    }
    return <Col span={24} style={{ marginTop: 20 }} >
      {
        imgList.map((item,idx) =>{
          return <Col key={'sv_' + idx } style={{ cursor: 'pointer', float: 'left', marginLeft: idx === 0 ? 0 : 20 }} >
            {
              dealDiffType(item, idx)
            }
          </Col>;
        })
      }
      {
        maxCount > imgList.length && type !== 'view' ? <div style={{
          marginLeft: 20,
          display: 'inline-block'
        }}>
          <UploadFile key={~~(Math.random() * 1000 ) + '_random'} maxCount={1} onChange={(v)=>{
            console.log(v);
            let newArray = [ ...imgList ];
            newArray.push(v);
            onChange && onChange(newArray);
          }}/>
        </div> : null
      }
    </Col>;
  };
  return <Fragment>
    <Row style={{ width: '100%', height: '100%' }}>
      { 
        imgList.length ===0 ? null 
          : <Col>
            <img src={imgList[showIdx]} alt='tupian' style={{ width: '100%', height: '100%' }}/>
          </Col> 
      }
      {
        showImgDom()
      }
    </Row>
  </Fragment>;
};
export default ViewAndUpload;