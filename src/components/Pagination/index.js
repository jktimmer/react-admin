import { useState } from 'react';
import { Pagination } from 'antd';

// 分页组件， 
// 初始化参数total =》总页数 
// action =》请求数据借口，接受两个值，当前页数和每页数量
// current =》 当前页数
// textAlign =》 对其方式，默认右对齐
function PaginationPage(props) {
  const { total, action, currentPage, textAlign } = props;
  const [ psize=10, changePageSize ] = useState(props.pageSize || 10);
  const onChange = (current, pageSize) => {
    changePageSize(pageSize);
    action && action({ current, pageSize });
  };
  return (<div style={{ textAlign:textAlign || 'right' }}>
    {
      total ? <Pagination 
        showSizeChanger
        showQuickJumper
        defaultCurrent={currentPage || 1}
        pageSize={psize }
        total={ total }
        onChange={ onChange }/>
        : null
    }
  </div>);
}

export default PaginationPage;