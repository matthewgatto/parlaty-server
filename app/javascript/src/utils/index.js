import uniq from 'lodash/uniq';

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
    var formData = new FormData();
    function appendFormData(data, root) {
          root = root || '';
          if (data instanceof File) {
              formData.append(root, data);
          } else if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                appendFormData(data[i], root + '[]');
            }
          } else if (typeof data === 'object' && data) {
              for (var key in data) {
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
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}


export const makeName = (root, name) => root ? `${root}${name}` : name

export const addIds = (state, entityMap) => state ? (
  uniq([...state, ...Object.keys(entityMap)])
) : (
  Object.keys(entityMap)
)
export const makeAction = (values, root) => {
  const name = values[`${root}name`],
        parameter_name = values[`${root}parameter_name`],
        parameter_value_8_pack = values[`${root}parameter_value_8_pack`],
        action = {};
  if(name) action.name = name
  if(parameter_name) action.parameter_name = parameter_name
  if(parameter_value_8_pack) action.parameter_value_8_pack = parameter_value_8_pack
  return action;
}

export const makeStep = (values, root) => {
  const title = values[`${root}title`],
        spoken = values[`${root}spoken`],
        note = values[`${root}note`],
        number = values[`${root}number`],
        time = values[`${root}time`],
        mode = values[`${root}mode`],
        safety = values[`${root}safety`],
        visual = values[`${root}visual`],
        audio = values[`${root}audio`],
        location = values[`${root}location`],
        device_id = values[`${root}device_id`],
        step = {};
  if(title) step.title = title
  if(spoken) step.spoken = spoken
  if(note) step.note = note
  if(number) step.number = number
  if(time) step.time = time
  if(mode) step.mode = mode
  if(safety) step.safety = safety
  if(location) step.location = location
  if(device_id) step.device_id = device_id
  if(audio) step.audio = audio
  if(visual) step.visual = visual
  return step;
}
