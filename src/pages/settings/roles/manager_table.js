
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ComTable from '@components/CommonTable';
const RolesListTable = (props) => {
  const { dataList, callbackFunc } = props;
  const columns = [
    {
      title: '角色',
      dataIndex: 'name'
    },
    {
      title: '角色描述',
      dataIndex: 'description'
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      render: (txt) =>{
        if ( typeof txt === 'undefined') return '-';
        return `${JSON.stringify(txt[0])}`;
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      render: (text, record) => {
        const { id } = record;
        return <Fragment>
          <Link to={ `/credit/verify/item?id=${id}` } onClick={ (e) =>{
            e.preventDefault();
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
              type: 'edit'
            });
          }}>删除</Link>
        </Fragment>;
      }
    }

  ];
  return <ComTable dataList={dataList} columns={columns}/>;
};

export default RolesListTable;