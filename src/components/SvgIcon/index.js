import PropTypes from 'prop-types';
import svgStyle from '@style/svg.module.css';
function SvgIcon(props) {
  const { svgClass, svgName, style } = props;
  return <svg 
    className={`${svgStyle['svg-common']} ${svgClass}`}
    style={ style }
    aria-hidden="true">
    <use xlinkHref={ `#svg-${svgName}` } />
  </svg>;
}

SvgIcon.propTypes = {
  svgClass: PropTypes.string,
  style: PropTypes.object,
  svgName: PropTypes.string.isRequired
};
export default SvgIcon;