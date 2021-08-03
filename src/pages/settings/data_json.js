class SettingInputJsonClass {
  constructor(props) {
    this.props = props || {};
  }
  persionInput() {
    const { showModalObj={}, setShowModalObj } = this.props;
    const { dataInfo, type, Oform, roles=[] } = showModalObj;
    let options = roles.map(item => {
      const { label, value } = item;
      return {
        title: label,
        value
      };
    });
    const array = [
      {
        span: 24,
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        },
        children: [
          {
            name: 'realname',
            label: '姓名',
            style: {
              marginLeft: 0,
              display: 'block',
              width: 230
            },
            rules: [ 
              { 
                required: true,
                message: '请填写姓名'
              },
            ],
            initialValue: '',
            input: {
              type: 'normal',
              size: 'large',
              placeholder: '请填写姓名'
            }
          },
          {
            name: 'phone',
            label: '手机号',
            style: {
              marginLeft: 0,
              display: 'block',
              width: 230
            },
            initialValue: '',
            rules: [ 
              { 
                required: true,
                message: '请填写手机号'
              },
              {
                pattern: /^[1][0-9]{10}$/g,
                message: '手机号填写有误'
              }
            ],
            input: {
              type: 'normal',
              size: 'large',
              placeholder: '请填写手机号'
            }
          }
        ]
      },
      {
        span: 24,
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        },
        children: [
          {
            name: 'username',
            label: '用户名',
            style: {
              marginLeft: 0,
              display: 'block',
              width: 230
            },
            rules: [ 
              { 
                required: true,
                message: '请填写用户名'
              },
              {
                min: 6,
                message: '用户名填写有误'
              }
            ],
            initialValue: '',
            input: {
              type: 'normal',
              size: 'large',
              placeholder: '请填写用户名'
            }
          },
          {
            name: 'roleId',
            label: '人员角色',
            style: {
              marginLeft: 0,
              display: 'block',
              width: 230
            },
            initialValue: null,
            rules: [ 
              { 
                required: dataInfo['isSuper'] === 1 ? false : true,
                message: '请选择角色'
              }
            ],
            disabled: dataInfo['isSuper'] === 1 ? true : false ,
            input: {
              type: 'select',
              size: 'large',
              placeholder: '请选择角色',
              items: options
            }
          }   
        ]
      },
      {
        span: 24,
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        },
        children: [
          {
            name: 'password',
            label: '登录密码',
            style: {
              marginLeft: 0,
              display: 'block',
              width: 230
            },
            initialValue: '',
            rules: [ 
              { 
                required: true,
                message: '请填写登录密码'
              },
              {
                min: 6,
                max: 15,
                pattern: /[^\s]+/g,
                message: '登录密码填写有误'
              }
            ],
            input: {
              type: 'password',
              size: 'large',
              placeholder: '请填写登录密码'
            }
          },
          {
            name: 'confirm',
            label: '确认密码',
            style: {
              marginLeft: 0,
              display: 'block',
              width: 230
            },
            rules: [ 
              { 
                required: true,
                message: '请填写确认密码'
              },
              {
                min: 6,
                max: 15,
                pattern: /[^\s]+/g,
                message: '确认密码填写有误'
              },
              {
                validator: (rules, value) =>{
                  let pwd = Oform.getFieldValue('password');
                  if (pwd !== value) {
                    return Promise.reject('两次密码不一致');
                  }
                  return Promise.resolve(value);
                },
              }
            ],
            initialValue: '',
            input: {
              type: 'password',
              size: 'large',
              placeholder: '请填写确认密码'
            }
          }
        ]
      },
      {
        span: 24,
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        },
        children: [
          {
            name: 'isSuper',
            label: '是否作为超级管理员',
            style: {
              marginLeft: 0,
              display: 'block',
              width: 230
            },
            initialValue: null,
            rules: [ 
              { 
                required: true,
                message: '请选择'
              }
            ],
            input: {
              type: 'select',
              size: 'large',
              placeholder: '请选择',
              onChange: (v) =>{
                setShowModalObj({
                  ...showModalObj,
                  dataInfo: { ...dataInfo, ...{ isSuper: v } },
                });
              },
              items: [
                {
                  title: '是',
                  value: 1
                },
                {
                  title: '否',
                  value: 0
                }
              ]
            }
          }
        ]
      }
    ];
    if (type === 'edit') {
      array.splice(2,1);
      return array;
    }
    return array;
  }
  rolesInput() {
    return [
      {
        span: 24,
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        },
        children: [
          {
            name: 'name',
            label: '角色',
            style: {
              marginLeft: 0,
              display: 'block',
              width: 230
            },
            rules: [
              {
                required: true,
                message: '请填写角色信息'
              }
            ],
            input: {
              type: 'normal',
              size: 'large',
              placeholder: '请输入角色'
            }
          },
          {
            name: 'description',
            label: '角色描述',
            style: {
              marginLeft: 0,
              display: 'block',
              width: 230
            },
            rules: [
              {
                required: true,
                message: '请填写角色描述'
              }
            ],
            input: {
              type: 'normal',
              size: 'large',
              placeholder: '请输入角色描述'
            }
          }
        ]
      }
    ];
  }
}

export default function createSettingJson(props) {
  return new SettingInputJsonClass(props);
}