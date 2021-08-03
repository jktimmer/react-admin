import { Skeleton } from 'antd';

function SkeletonLoading(props) {
  const { loading, children } = props;
  return (
    <Skeleton 
      active
      loading={loading || true}
    >
      { children ? '' : children }
    </Skeleton>
  );
}
export default SkeletonLoading;