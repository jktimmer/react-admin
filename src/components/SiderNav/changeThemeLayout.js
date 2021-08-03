import { Switch } from 'antd';
// change theme com
import { BulbOutlined } from '@ant-design/icons';
function ChangeTheme(props) {
  const { theme, change } = props;
  const themeName = (theme) => {
    return <span>{theme === 'dark' ? '暗' : '亮'}</span>;
  };
  return (
    <div style={{ padding: '0 16px', position:'absolute', bottom: 40 }}>
      <span style={ { color: theme === 'dark' ? '#fff' : '#000', marginRight: 10 } }>
        <BulbOutlined />
        &nbsp;
        切换主题
      </span>
      <Switch
        onChange={ () => change() }
        defaultChecked={ theme === 'dark'}
        checkedChildren={ themeName(theme) }
        unCheckedChildren={themeName(theme)}
      />
    </div>
  );
  
}
export default ChangeTheme;