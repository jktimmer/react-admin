import { 
  Upload,
  Modal
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ApiMap from '@/api/index';
import { useState, Fragment, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import juedeIsSame from '@/utils/judeSame';
const UploadFile = (props) =>{
  const { 
    uploadButton, 
    maxCount=1, 
    // initalValue
    fileList=[], 
    progress={
      type: 'line'
    },
    title,
    listType='picture-card',
    accept='.jpg,.png,.jpeg',
    name,
    form,
    onChange
  } = props;
  const [ fileUpList,setFileUpList ] = useState([]);
  const modalDefault = {
    previewVisible: false,
    previewImage: '',
    previewTitle: ''
  };
  useEffect(() =>{
    // if (fileUpList.length > 0 ) return;
    // console.log(formValue, 22);
    if (fileList.length > 0){
      setFileUpList(v =>{
        return fileList.map(item =>{
          let obj = {};
          obj['name'] = item;
          obj['url'] = item;
          obj['thumbUrl'] = item;
          // obj['status'] = 'done';
          return obj;
        });
      });
      return null;
    }
    // const type = typeof formValue;
    // const array = type === 'undefined' ? [ ] : (Array.isArray(formValue) ? formValue : ( type === 'string' ? [ formValue ] : []));
    // if ( array && array.length > 0 ){
    //   setFileUpList(v =>{
    //     return array.map(item =>{
    //       let obj = {};
    //       obj['name'] = item;
    //       obj['url'] = item;
    //       obj['thumbUrl'] = item;
    //       // obj['status'] = 'done';
    //       return obj;
    //     });
    //   });
    // }
    return () => null;
  }, [ fileList ]);
  const removeFile =(file)=>{
    const newArrayList = fileUpList.filter( item => item.uid !== file.uid ) || [];
    setFileUpList(newArrayList);
    setFormFieldsValue(newArrayList);
  };

  const setFormFieldsValue = (newArrayList) => {
    let list = newArrayList.map(item => item.url);
    const value = maxCount === 1 ? (newArrayList[0] ? newArrayList[0].url : null): list.length === 0 ? null : list;
    // const array = [
    //   {
    //     name: name,
    //     validating: value ? true : false,
    //     errors: value ? '' : null, 
    //     value: value,
    //   }
    // ];
    // console.log(array, name, newArrayList);
    let obj = {};
    obj[name] = value;
    try {
      // form.setFields(array);
      onChange && onChange(name ? obj : value);
      form && form.setFieldsValue(obj);
    } catch (error) {
      console.log(error);
    }
  };
  const [ previewObj, setPreviewObj ] = useState(modalDefault);
  const fileUpload = (info) =>{
    const { file } = info;
    const { uid } = file;
    const formData = new FormData();
    formData.append('file', file);
    return ApiMap.fileUpload(formData)
      .then( res => {
        const { data } = res;
        const newArrayList = fileUpList.map((item) =>{
          const id = item.uid;
          if ( id === uid) {
            return {
              uid: id,
              status: 'done',
              type: item.type,
              percent: 100,
              name: item.name,
              url: data,
              thumbUrl: data
            };
          }
          return item;
        });
        // onSuccess(newArrayList.map(item => item.url));
        setFormFieldsValue(newArrayList);
        setFileUpList(newArrayList);
      })
      .catch(err => {
        removeFile(file);
      });
  };
  const defaultUploadButton = uploadButton || (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{ title }</div>
    </div>
  );
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  return (<Fragment>
    <Upload
      accept={ accept }
      maxCount={ maxCount }
      customRequest={ fileUpload }
      fileList={ fileUpList.slice() }
      progress={ progress }
      listType={ listType }
      className='upfile'
      onPreview={ async file =>{
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }

        setPreviewObj({
          previewImage: file.url,
          previewVisible: true,
          previewTitle: file.name
        });
      }}
      onChange={ ({ file, fileList })=>{
        const flist = fileList.map((item =>{
          let { 
            uid, status, 
            type, percent, 
            name, thumbUrl,
            url
          } = item;
          return { 
            uid, status, 
            type, percent, 
            name,
            url,
            thumbUrl
          };
        }));
        setFileUpList(flist);
      }}
      onRemove={(file) =>{
        removeFile(file);
      }}
    >
      {
        fileUpList.length >= maxCount ? null : defaultUploadButton
      }
    </Upload>
    <Modal
      key={previewObj.url}
      width='800px'
      className=''
      visible={previewObj.previewVisible}
      title={previewObj.title}
      footer={null}
      bodyStyle={{
        padding: 40,
        borderRadius: 6
      }}
      closable={true}
      onCancel={() =>{
        setPreviewObj({
          previewVisible: false
        });
      }}
    >
      <img alt={previewObj.title} style={{ width: '100%' }} src={previewObj.previewImage} />
    </Modal>
  </Fragment>);
};
UploadFile.protypes = {
  maxCount: PropTypes.number,
  fileList: PropTypes.array,
  uploadButton: PropTypes.element,
  progress: PropTypes.object,
  title: PropTypes.string,
  listType: PropTypes.string,
  accept: PropTypes.string,
  name: PropTypes.string.isRequired,
  form: PropTypes.object,
};
export default memo(UploadFile,(prevProps, nextProps) =>{
  const { 
    accept, fileList, listType, maxCount, name, progress, title
  } = prevProps;
  const isSameList = juedeIsSame(fileList, nextProps.fileList, []);
  return isSameList && 
  accept === nextProps &&
  listType === nextProps.listType &&
  maxCount === nextProps.maxCount &&
  name === nextProps.name && progress === nextProps.progress && 
  title === nextProps.title;
});