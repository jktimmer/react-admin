
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ComTable from '@components/CommonTable';
const PersonsListTable = (props) => {
  const { dataList, callbackFunc } = props;
  const columns = [
    {
      title: '角色',
      dataIndex: 'roles',
      render: (txt) =>{
        return txt[0] === '*' ? '超级管理员' : (txt[0] || ''); 
      }
    },
    {
      title: '姓名',
      dataIndex: 'username',
    },
    {
      title:  '手机号',
      dataIndex: 'phone',
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate'
    },
    {
      title: '最后登录',
      dataIndex: 'gmtLastLogin'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (txt) =>{
        return txt === 1 ? '激活' : '冻结';
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      render: (text, record) => {
        return <Fragment>
          <Link to='/' onClick={(e)=>{
            e.preventDefault();
            callbackFunc && callbackFunc({
              data: record,
              type: 'edit'
            });
          }}>编辑</Link>
          &nbsp;&nbsp;
          <Link to='/' onClick={ (e) =>{
            e.preventDefault();
            callbackFunc && callbackFunc({
              data: record,
              type: 'del'
            });
          }}>删除</Link>
        </Fragment>;
      }
    }

  ];
  return <ComTable dataList={dataList} columns={columns}/>;
};

export default PersonsListTable;