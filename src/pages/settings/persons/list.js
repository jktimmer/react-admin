
import { useEffect, useState } from 'react';
import ApiMap from '@api/index';
import { 
  Form, Input, Button, Modal
} from 'antd';
import PersonsListTable from './manager_table';
import PaginationPage from '@components/Pagination';
import createSettingJson from '../data_json';
import TextAndInput from '@/components/TextAndInput/index';
import { Fragment } from 'react';
const PersonsList = (props) => {
  const { location } = props;
  const [ form ] = Form.useForm();
  const [ form2 ] = Form.useForm();
  const [ dataList, setDataList ] = useState([]);
  const [ totalPageNo, setTotalPageNo ] = useState(0);
  const [ rolesList, setRolesList ] = useState([]);
  const [ showModalObj, setShowModalObj ] = useState({
    visible: false,
    dataInfo: {},
    type: '-',
    Oform: form2,
    roles: rolesList
  });
  const [ pageNo ] = useState(1);
  const subParam = {
    phone: '',
    pageSize: 10,
    pageNo: 1
  };
  var [ subObj, updateSubObj ] = useState(subParam);
  useEffect(() =>{
    ApiMap.getAllRoles()
      .then(res => {
        const { data } = res;
        console.log('dd==>',data);
        setRolesList(data);
      })
      .catch();
  }, [ location.pathname ]);
  useEffect(() => {
    getRemoteValue(subObj);
  },[ subObj ]);
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 }
  };
  const onSub = (values) => {
    var obj = {};
    // totalPageNo > pageNo && setPageNo(v => {
    //   let k = v;
    //   return k += 1;
    // });
    
    for (let item in subObj) {
      obj[item] = values[item];
    }
    updateSubObj(obj);
  };
  const getRemoteValue = (values) => {
    ApiMap.getAdminList(values)
      .then(res => {
        const { data } = res;
        setTotalPageNo(data.totalPageNo || 1);
        setDataList(data.items);
      })
      .catch(err => console.log(err));
  };
  const cancelModel =() =>{
    setShowModalObj({
      visible: false,
      type: '-',
      dataInfo: {},
      Oform: showModalObj.Oform,
      roles: rolesList
    });
    showModalObj.Oform.resetFields([]);
  };
  const dealType = () =>{
    console.log(showModalObj);
    const { type } = showModalObj;
    if (type === 'edit' || type === 'add') {
      const infoClass = createSettingJson({
        showModalObj,
        setShowModalObj
      });
      return <Fragment>
        <TextAndInput info={ infoClass.persionInput() }/>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button style={{ marginRight: 20 }} size='large' onClick={ () =>{
            cancelModel();
          }}>取消</Button>
          <Button type='primary' htmlType='submit' size='large'>确定保存</Button>
        </Form.Item>
      </Fragment>;
    } else if (type === 'del') {
      return <Fragment>
        <h4>是否删除？</h4>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button style={{ marginRight: 20 }} size='large' onClick={ () =>{
            cancelModel();
          }}>取消</Button>
          <Button type='primary' size='large' onClick={ () =>{
            form2Sub({});
          }}>确定</Button>
        </Form.Item>
      </Fragment>;
    } else {
      return null;
    }
  };

  const actionMap = {
    add: 'createAdminInfo',
    edit: 'updateAdminInfo',
    del: 'delAdminInfo'
  };
  const form2Sub = (values) =>{
    const { type,dataInfo } = showModalObj;
    let params = { ...values };
    if (params['isSuper'] === 1) {
      params['roleIds'] = [];
    } else {
      params['roleIds'] = params['roleId'] !== null ? [ params['roleId'] ] : [];
    }
    params['id'] = dataInfo['id'];
    let action = actionMap[type];
    if (action === null) return;
    ApiMap[action](params)
      .then(res => {
        Modal.success({
          content: res.errmsg,
          onOk: () =>{
            cancelModel();
            updateSubObj({ ...subObj });
          }
        });
      })
      .catch(err => console.log(err));
  };
  return (<div className='credit'>
    <Form
      {...formItemLayout}
      form={ form }
      onFinish={ onSub }
      layout='inline'>
      <Form.Item name='phone'>
        <Input 
          size="large"
          placeholder='请输入手机号'/>
      </Form.Item>
      <Form.Item
        style={{
          flex: 1
        }}
        wrapperCol={{
          span: 24
        }}>
        <Button size="large" type="primary" htmlType="submit">查询</Button>
        <Button 
          size='large' 
          type='primary'
          style={{ 
            float: 'right', backgroundColor: '#EDF3FF', borderColor: '#4E7ADE', color: '#4E7ADE',padding: '0 28px'
          }} onClick={() =>{
            setShowModalObj({
              visible: true,
              type: 'add',
              dataInfo: {},
              Oform: showModalObj.Oform,
              roles: rolesList
            });
          }}>创建</Button>
      </Form.Item>
    </Form>
    <div className='table'>
      <PersonsListTable key='1' dataList={dataList} callbackFunc={(v)=>{
        const { type, data } = v;
        showModalObj.Oform.setFieldsValue({ ...data });
        setShowModalObj({
          type: type,
          visible: true,
          dataInfo: { ...data },
          Oform: showModalObj.Oform,
          roles: rolesList
        });
      }}/>  
    </div>
    {
      showModalObj['visible'] ? <Modal
        width={600}
        footer={null}
        key={ `persions_${showModalObj['visible']}` }
        title={ showModalObj['type'] === 'add' ? '添加' : '编辑' }
        onCancel={ cancelModel }
        visible={showModalObj['visible']}>
        <Form
          preserve={ false }
          form={ showModalObj.Oform }
          onFinish={ form2Sub }
          layout='vertical'>
          {
            dealType()
          }
        </Form> 
      </Modal> : null
    }
    <PaginationPage total={ totalPageNo * subParam.pageSize } currentPage={ pageNo } action={(args)=>{
      const { current, pageSize } = args;
      const newSubParam = { ...subObj };
      newSubParam['pageSize'] = pageSize;
      newSubParam['pageNo'] = current;
      updateSubObj(newSubParam);
    }}></PaginationPage>
  </div>);
};

export default PersonsList;