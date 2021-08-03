
import { useEffect, useState } from 'react';
import ApiMap from '@api/index';
import { 
  Form, Input, Button, Modal
} from 'antd';
import RolesListTable from './manager_table';
import PaginationPage from '@components/Pagination';
import TextAndInput from '@/components/TextAndInput/index';
import createSettingJson from '../data_json';
import StepSelect from '@/components/StepSelect/index';
import { RouterInfoJson } from '@routes/index';
import { Fragment } from 'react';
const RolesList = (props) => {
  const { history } = props;
  const [ form ] = Form.useForm();
  const [ dataList, setDataList ] = useState([]);
  const [ totalPageNo, setTotalPageNo ] = useState(0);
  const [ formModal ] = Form.useForm();
  const [ showModalObj, setShowModalObj ] = useState({
    visible: false,
    dataInfo: {},
    type: '-'
  });
  const [ pageNo ] = useState(1);
  const subParam = {
    phone: '',
    pageSize: 10,
    pageNo: 1
  };
  var [ subObj, updateSubObj ] = useState(subParam);
  useEffect(() => {
    getRemoteValue(subObj);
    return () => null;
  },[ subObj ]);
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 }
  };
  const onSub = (values) => {
    var obj = {};
    for (let item in subObj) {
      obj[item] = values[item];
    }
    updateSubObj(obj);
  };
  const getRemoteValue = (values) => {
    ApiMap.getAdminRolesList(values)
      .then(res => {
        const { data } = res;
        console.log(data);
        setTotalPageNo(data.totalPageNo || 1);
        setDataList(data);
      })
      .catch(err => console.log(err));
  };
  const cancelModel =() =>{
    setShowModalObj({
      visible: false,
      type: '-',
      dataInfo: {},
    });
    formModal.resetFields([]);
  };
  const showInputTop = () =>{
    let buildJsonCls = createSettingJson();
    return <TextAndInput info={ buildJsonCls.rolesInput() }/>;
  };
  const buildRolesSelectListData = () =>{
    let array = [];
    RouterInfoJson.forEach(item=>{
      const { path, children } = item;
      if (path !== '/' && Array.isArray(children)) {
        array.push(item);
      }
    });
    return array;
  };
  const formModalTypeMap = {
    add: 'createRole',
    edit: 'updateRole',
    del: 'delRole'
  };
  const formModalSub = (values) =>{
    const { dataInfo, type } = showModalObj;
    const params = { ...values };
    params['id'] = dataInfo['id'];
    let action = formModalTypeMap[type];
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

  const showDiffTypeDom = () =>{
    const { type, dataInfo } = showModalObj;
    let { permissions=[] } = dataInfo;
    let checkedInfo = permissions.length === 0 ? {} : permissions[0];
    console.log(dataInfo, 0);
    if (type === 'del') {
      return <Fragment>
        <h4>是否删除？</h4>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button style={{ marginRight: 20 }} size='large' onClick={ () =>{
            cancelModel();
          }}>取消</Button>
          <Button type='primary' size='large' onClick={ () =>{
            formModalSub({});
          }}>确定</Button>
        </Form.Item>
      </Fragment>;
    }
    return <Fragment>
      {
        showInputTop()
      }
      <StepSelect
        key='2'
        title='权限配置'
        dataInfo={ buildRolesSelectListData() }
        checkedInfo={checkedInfo}
        callBackFunc={ (v) =>{
          formModal.setFieldsValue({
            permissions: [ v ]
          });
        }}/>
      <Form.Item
        name='permissions'
        initialValue={[]}
        style={{ display: 'none' }}>
        <Input type='hidden'/>
      </Form.Item>
      <Form.Item style={{ textAlign: 'center', marginTop: 20 }}>
        <Button style={{ marginRight: 20 }} size='large' onClick={ () =>{
          cancelModel();
        }}>取消</Button>
        <Button type='primary' size='large' htmlType='submit'>确定</Button>
      </Form.Item>
    </Fragment>;
  };
  const buildTableList = () =>{
    // let newArray = dataList.map(item => {
    //   let obj = { ...item };
    //   let { permissions=[] } = obj;
    //   let infoZ = permissions[0] || {};
    //   let newPermissionsArray = [];
    //   for (var ckey in infoZ) {
    //     let citem = infoZ[ckey] || [];
    //     newPermissionsArray.push(`${ckey}: [ ${citem.toString()} ]`);
    //   }
    //   obj['permissions'] = newPermissionsArray.join(';');
    //   return obj;
    // });
    return dataList;
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
          placeholder='请输入角色名称'/>
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
              dataInfo: {},
              type: 'add'
            });
          }}>创建</Button>
      </Form.Item>
    </Form>
    <div className='table'>
      <RolesListTable dataList={ buildTableList() } key={22} callbackFunc={ (v) =>{
        const { type, data } = v;
        formModal.setFieldsValue({ ...data });
        setShowModalObj({
          type: type,
          dataInfo: { ...data },
          visible: true
        });
      }}/>  
    </div>
    {
      showModalObj['visible'] ? <Modal
        visible={ true }
        footer={null}
        onCancel={ cancelModel }
        key={`roles_${showModalObj['visible']}_k`}
        width={600}>
        <Form
          preserve={ false }
          form={ formModal }
          onFinish={ formModalSub }
          layout='vertical'>
          { showDiffTypeDom() }
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

export default RolesList;