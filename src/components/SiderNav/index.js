import styles from '@style/sider_nav.module.scss';
import ContentMenu from './content_menu';
function SiderNavBar(props) {
  return (
    <div className={styles.index}>
      <div className={ styles.logo } style={{
        color: props.theme === 'dark' ? '#fff' : '#000'
      }}>
        管理后台
      </div>
      <ContentMenu {...props }/>
    </div>
  );
}

export default SiderNavBar;