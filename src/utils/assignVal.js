const assignVal = (dataList, remoteData) =>{
  if (typeof dataList === 'undefined' || dataList.length === 0) return {};
  return dataList.map(item => {
    let citem = { ...item };
    let { children } = citem;
    citem.children = children.map(pitem =>{
      let { name } = pitem;
      let nitem = { ...pitem };
      name && (nitem['text'] = remoteData[name]|| '');
      return nitem;
    });
    return citem;
  });
};

export default assignVal;