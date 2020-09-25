import uniq from 'lodash/uniq';
import ImageFileDisplay from '@components/ImageFileDisplay';
import VideoFileDisplay from '@components/VideoFileDisplay';
import DocFileDisplay from '@components/DocFileDisplay';


export function updateProceduresCountInOem(action, oem, count){
  if(!oem || !count) return {};
  let result = {oems: {}};
  if(action === "delete"){
    oem.procedures_count = oem.procedures_count - count;
  }
  result.oems[oem.id] = oem;
  return result;
}

export function immutableMove(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

export function objectToFormData(obj) {
    let formData = new FormData();
    function appendFormData(data, root) {
          root = root || '';
          if (data instanceof File) {
              formData.append(root, data);
          } else if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                appendFormData(data[i], root + '[]');
            }
          } else if (typeof data === 'object' && data) {
              for (let key in data) {
                  if (data.hasOwnProperty(key)) {
                      if (root === '') {
                          appendFormData(data[key], key);
                      } else {
                          appendFormData(data[key], root + '[' + key + ']');
                      }
                  }
              }
          } else {
              if (data !== null && typeof data !== 'undefined') {
                  formData.append(root, data);
              } else if (data === null) {
                  formData.append(root, null);
              }
          }
    }
    appendFormData(obj);
    return formData;
}

export function immutableRemove(p,o){
  const {[p]:remove,...remaining} = o;
  return remaining
}

export function getUpdatedProperties(newObj = {}, initialObj = {}){
  const updates = {};
  for (var field in newObj) {
    if (newObj.hasOwnProperty(field) && newObj[field] !== initialObj[field]){
      updates[field] = newObj[field]
    }
  }
  return Object.keys(updates).length > 0 ? updates : false;
}

export function readFile(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file)
  })
}

export const combinedPayload = (payload, state) => {
  let val = {};
  Object.keys(payload).forEach(id => {
    if(state[id]) {
      val[id]={...state[id], ...payload[id]}
    } else {
      val[id]= payload[id]}
  });
  return val
}

export const makeName = (root, name) => root ? `${root}${name}` : name;

export const addIds = (state, entityMap) => state ? (
  uniq([...state, ...Object.keys(entityMap)])
) : (
  Object.keys(entityMap)
);
export const makeAction = (values, root) => {
  const visuals = [],
    action = {
      name: values[`${root}name`],
      parameter_value_8_pack: values[`${root}parameter_value_8_pack`],
      time: values[`${root}time`],
      mode: values[`${root}mode`],
    };
  let key = 0;
  while(typeof values[`${root}media[${key}]`] !== "undefined") {
    visuals.push(values[`${root}media[${key}]`]); key++
  }
  if(visuals) action.visuals = visuals;
  return action;
};

export const getNewStepValues = (values) => {
  const title = values['title'],
        steps_in_loop = values['steps_in_loop'],
        enabled_loop = values['enabled_loop'],
        loop_value = values['loop_value'],
        mode = values['mode'],
        time = values['time'],
        location = values['location'],
        step = {};
  if(title) step.title = title;
  step.enabled_loop = enabled_loop;
  if(enabled_loop){
    step.steps_in_loop = steps_in_loop;
    step.loop_value = loop_value;
  }
  if(mode) {
    step.mode = mode;
    if(mode === "continuous" || mode === "manual"){
      step.time = 0
    } else {
      step.time = time || 8;
    }
  }
  if(location) step.location = location;
  return step;
};

export const makeStep = (values, isFormData) => {
  const spoken = values.spoken,
        safety = values.safety,
        visuals = [],
        default_media = values.default_media,
        device_id = values.device_id,
        step = getNewStepValues(values),
        enabled_associated_procedure = values.enabled_associated_procedure,
        associated_procedure_id = values.associated_procedure_id;
  values['visuals'] && values.visuals.forEach(file=>{
    visuals.push(file.hasOwnProperty('visual') ? file.visual : file)
  });
  if(spoken) step.spoken = spoken;
  if(safety) step.safety = safety;
  if(enabled_associated_procedure) step.enabled_associated_procedure = enabled_associated_procedure;
  if(associated_procedure_id) step.associated_procedure_id = associated_procedure_id;
  if(device_id){
    if(isFormData){
      step.device = device_id
    } else {
      step.device_id = device_id
    }
  }
  if(visuals) step.visuals = visuals;
  if(default_media || default_media === 0) step.default_media = default_media;
  if(visuals && visuals.length === 0) step.default_media = -1
  return step;
};

export const typeFile = (file) => {
  if (~file.type.indexOf('video')) return [VideoFileDisplay, 'video', 'video_preview'];
  else if (~file.type.indexOf('image')) return [ImageFileDisplay, 'image', 'image_preview'];
  else if (~file.type.indexOf('application') || ~file.type.indexOf('text')) return [DocFileDisplay, 'application', 'doc_preview'];
};