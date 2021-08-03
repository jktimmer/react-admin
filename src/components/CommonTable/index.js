import { Table } from 'antd';
const ComTable = (props) => {
  const { columns, dataList, pagination, scroll } = props;
  return (<Table columns={columns} dataSource={ dataList.map((item, idx) => {
    let obj = { ...item };
    obj.key = item.key || idx;
    return obj;
  }) } scroll={ scroll || { x: true } } pagination={pagination || false}/>);
};
export default ComTable;