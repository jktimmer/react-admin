import service from '@configs/axios.config';
import { SkeletonLoading } from '@pages/loading/index';
import React from 'react';
import QueryString from 'qs';

// function LoadingHelper(props) {
//   const { history, location, match, Component } = props;
//   const { isLoading, setLoading } = useState(true);
//   console.log(isLoading);
//   useEffect(() => {
//     console.log(setLoading);
//   }, [ isLoading ]);
//   return (
//     <React.Fragment>
//       {/* { isLoading ? <Loading /> : <Component { ...{
//         location, history, match, request, setLoading
//       }} /> } */}
//       <Loading />
//     </React.Fragment>
//   );
// }
class LoadingHelper extends React.Component {
  constructor(props) {
    const { location } = props;
    super(props);
    this.state = {
      loading: true,
      urlParamObj: QueryString.parse(location.search.slice(1))
    };
  }
  componentDidMount(){
    (!service.setLoading) && (service.setLoading = this.setLoading.bind(this));
  }
  componentWillUnmount(){
    (service.setLoading) && (service.setLoading = null );
  }
  setLoading() {
    if (this.state.loading === false) return;
    this.setState({
      loading: false
    });
  }
  render() {
    const { loading, urlParamObj } = this.state;
    const { history, match, Component } = this.props;
    let { location } = this.props;
    location.urlParamObj = urlParamObj;
    return (
      <React.Fragment>
        <div style={ loading ? styles.show : styles.hide }>
          <SkeletonLoading />
        </div>
        <div className={ !loading ? 'router-animated' : ''} style={!loading ? styles.show : styles.hide}>
          <Component { ...{
            location, history, match
          }} 
          setLoading={() => this.setLoading()}
          />
        </div>
      </React.Fragment>
    );
  }
}
const styles = {
  show: {
    display: 'block',
    visibility: 'visible'
  },
  hide: {
    display: 'none',
    visibility: 'hidden'
  }
};
export default LoadingHelper;