const _toString = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
function juedeIsSame(oldOne, newOne, keysList) {
  let oldType = _toString(oldOne);
  let newType = _toString(newOne);
  if (oldType !== newType) return false;
  if ( oldType === 'undefined' || oldType === 'null' || oldOne === 'function') return true;
  if (oldType === 'array') {
    let len = oldOne.length;
    let len2 = newOne.length;
    if (len !== len2) return false;
    if (len === 0) return true;
    for (let i = 0; i < len; i++){
      let oitem = oldOne[i];
      let nitem = newOne[i];
      let sm = juedeIsSame(oitem, nitem, keysList);
      if (sm === false) return sm;
    }
    return true;
  } else if (oldType === 'object') {
    let ObjkeysList = Object.keys(oldOne);
    let newKeysList = Object.keys(newOne);
    let longerObj = ObjkeysList.length >= newKeysList.length ? {
      klen: ObjkeysList.length,
      obj: ObjkeysList
    } : {
      klen: newKeysList.length,
      obj: newKeysList
    };
    let { klen, obj } = longerObj; 
    if ( klen.length === 0) return true;
    for (let c = 0; c < klen; c++){
      let keyName = obj[c];
      if (typeof keyName === 'undefined') continue;
      if (keysList.includes(keyName)) {
        let oitenv = oldOne[keyName];
        let nitemv = newOne[keyName];
        let csm = juedeIsSame(oitenv, nitemv, keysList);
        if (csm === false) return csm;
      }
    }
    return true;
  } else {
    if (oldType === 'string') {
      return oldOne === newOne;
    }
    let oldStr = oldOne.toString();
    let newStr = newOne.toString();
    return oldStr === newStr;
  }
}
export default juedeIsSame;