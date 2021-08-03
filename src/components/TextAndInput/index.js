import { 
  Row, Col, 
  Form, Input, 
  Select,
  DatePicker, Checkbox
} from 'antd';
import UploadFile from '@components/Upload/index';
import PropTypes from 'prop-types';
import { memo } from 'react';
import juedeIsSame from '@utils/judeSame';
import React from 'react';
// import { useEffect, useState } from 'react';
const TextAndInputComponent = (props) =>{
  const { 
    styles={}, info, justify, title, Itype='input' 
  } = props;
  

  // when Itype is input, use info data return diffrent reactDom
  // 当Intype 是input时， 根据info中数据的不同返回对应的reactDom
  const judgeType = (type, citem, inputInfo) =>{
    let { render } = citem;
    if (typeof render === 'function') {
      return render(inputInfo);
    }
    switch (type) {
    case 'select':
      return <Select
        disabled={ citem.disabled }
        value={ citem.initialValue }
        placeholder={ inputInfo.placeholder }
        style={{ width: 230, borderRadius: 4 }}
        onChange={(info) =>{
          inputInfo.onChange && inputInfo.onChange(info);
        }}
        size={ inputInfo.size }>
        {
          inputInfo.items.map((icm, icx)=>{
            return <Select.Option
              key={`{icx}_s-${icm.value}`}
              value={ typeof icm.value === 'undefined' ? '' : icm.value}
            >{icm.title}</Select.Option>;
          })
        }
      </Select>;
    case 'date':
      let dchange = typeof inputInfo.onChange === 'function' ? (date, dateString ) =>{
        inputInfo.onChange(citem.name, { date, dateString });
      } : null;
      return <DatePicker
        style = { inputInfo.style || { width: 230 }}
        format={ inputInfo.format } 
        size={ inputInfo.size }
        mode= {inputInfo.mode }
        className={inputInfo.className}
        disabled={inputInfo.disabled}
        onChange={ dchange }
        placeholder={ inputInfo.placeholder }/>;
    case 'rangerDate':
      let change = typeof inputInfo.onChange === 'function' ? (dates, dateStrings ) =>{
        let extraName = inputInfo.extraName || [] ;
        inputInfo.onChange(extraName ,{ dates, dateStrings });
      } : null;
      return <DatePicker.RangePicker
        style = { inputInfo.style || { width: 400 }}
        format={ inputInfo.format } 
        size={ inputInfo.size }
        mode= {inputInfo.mode }
        disabled={inputInfo.disabled}
        className={inputInfo.className}
        onChange={ change }
        placeholder={ inputInfo.placeholder }/>;
    case 'checkbox':
      let childs = inputInfo.items;
      if (!childs || childs.length === 0) {
        return null;
      }
      return <div style={Object.assign({ width: 100 },inputInfo.style )}>{
        
        childs.map((ctm, ctx)=>{
          let onchange = typeof ctm.onChange === 'function' ? ctm.onChange : ( typeof inputInfo.onChange === 'function' ? inputInfo.onChange : ()=>{console.log('no onchange func');});
          return <Checkbox 
            key={`ctm_${ctx}_${ctm.value}`}
            defaultChecked={ctm.value}
            disabled={ctm.disabled || inputInfo.disabled}
            onChange={
              (e)=>{
                try {
                  onchange(e);
                } catch (e){
                  console.log(e);
                }
              }
            }>{ ctm.title }</Checkbox>;
        })
      }</div>;
    case 'textarea':
      return <Input.TextArea
        style={ inputInfo.style }
        placeholder={ inputInfo.placeholder }
        autoSize={ inputInfo.autoSize }
      />;
    case 'upload':
      return <UploadFile
        title={ inputInfo.title }
        name={ citem.name }
        form={ inputInfo.form }
        maxCount={ inputInfo.maxCount }
        listType={ inputInfo.listType }
        uploadButton={ inputInfo.uploadButton }
        fileList={ inputInfo.fileList }
        accept={ inputInfo.accept }
        progress={ inputInfo.progress }
      />;
    default :
      return <Input
        disabled={ citem.disabled }
        placeholder={ inputInfo.placeholder }
        className={inputInfo.className}
        type={ type }
        size={ inputInfo.size }/>;
    }
  };

  const dealItype = (citem) => {
    if (Itype === 'input') {
      let inputInfo = citem.input || {};
      let labelCol = citem.labelCol || {};
      let wrapperCol = citem.wrapperCol || {};
      let type = inputInfo.type || 'normal';
      let disabled = inputInfo.disabled || null;
      let rules = citem.rules || [];
      rules = rules.map(item =>{
        let tl = { ...item };
        if (disabled === true) {
          tl.required = !disabled;
        }
        return tl;
      });
      return <Form.Item
        name={ citem.name }
        label={ citem.label }
        labelCol={ labelCol }
        wrapperCol={ wrapperCol }
        initialValue={citem.initialValue}
        validateFirst={ citem.validateFirst }
        style={ citem.formItemStyle }
        rules={ rules }>
        {
          judgeType(type, citem, inputInfo)
        }
      </Form.Item>;
    }
    let { 
      text='-', spanStyle, className, label='-', render ,labelStyle,
      labelClassName=''
    } = citem;
    return <span style={ { ...{ fontSize: 14 }, ...spanStyle } } className={className}>
      <span style={ { 
        ...{ marginRight: 20, color: 'grey' }, ...labelStyle
      } } className={labelClassName }>{ label }</span>
      {
        typeof render === 'function' ? render(text) : text
      }
    </span>;
  };
  return <Row justify={ justify || 'center'} className={styles.row}>
    <Col span={24} className={styles.title}>{ title }</Col>
    {
      info.map((item, idx) =>{
        const { 
          span, offset, children, style, className
        } = item;
        if (!children || children.length === 0) {
          return null;
        }
        return <Col
          span={ span }
          key={idx} 
          style={ Object.assign({ marginTop: 10 }, style) } 
          offset={ typeof offset === 'function' ? offset(idx) : offset }
          className={ className }>
          {
            children.map((citem, cidx) => {
              const key = `c_${idx}_${cidx}`;
              // let inputInfo = citem.input || {};
              // let labelCol = citem.labelCol || {};
              // let wrapperCol = citem.wrapperCol || {};
              // let type = inputInfo.type || 'normal';
              let settingStyle = typeof(citem.style) === 'function' ? citem.style(cidx,key,citem.label || '') : citem.style;
              let style = Object.assign({ display: 'inline-flex', marginLeft: 20 }, settingStyle );
              let coffset = citem.offset;
              /*
              let disabled = inputInfo.disabled || null;
              let rules = citem.rules || [];
              rules = rules.map(item =>{
                let tl = { ...item };
                if (disabled === true) {
                  tl.required = !disabled;
                }
                return tl;
              });
              */
              return <Col 
                style={ style }
                className={key + ` ${ citem.className || styles.setInput}`}
                offset={typeof coffset === 'function' ? coffset(cidx,key, citem.label || '') : coffset}
                key={cidx}
                span={(typeof citem.span === 'undefined') ? 0 : citem.span }>
                {
                  dealItype(citem)
                }
              </Col>;
            })
          }
        </Col>;
      })
    }
  </Row>;
};
TextAndInputComponent.protypes = {
  info: PropTypes.array.isRequired,
  styles: PropTypes.object,
  justify: PropTypes.string,
  title: PropTypes.string,
  Itype: PropTypes.string.isRequired
};


// 这里设置遍历 key，减少递归次数,去除react domObj，antobj, 包含父级keyName
var list = [ 'children', 'input', 'text', 'rules', 'items' ,'required', 'value', 'disabled', 'fileList' ];

function areEqual(prevProps, nextProps) {
  // console.log(prevProps);
  // console.log(nextProps);
  let preInfo = prevProps.info;
  let newInfo = nextProps.info;
  const isSame = juedeIsSame(preInfo, newInfo, list);
  return isSame && 
  prevProps.title === nextProps.title && 
  prevProps.justify === nextProps.justify && 
  prevProps.Itype === nextProps.Itype;
}
export default memo(TextAndInputComponent,areEqual);
// export default TextAndInputComponent;