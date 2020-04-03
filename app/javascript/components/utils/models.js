import { normalize, schema } from 'normalizr';

const action = new schema.Entity("actions");

const device = new schema.Entity("devices", {
  actions: [action]
});
const step = new schema.Entity("steps", {
  procedure_id: procedure,
  //device
}, {
  processStrategy: (step, procedure) => {
    if(!step.procedure_id && procedure && procedure.id){
      step.procedure_id = procedure.id
    }
    if(!step.mode){
      step.mode = "continuous"
    }
    if(step.device){
      step.device_id = step.device.id;
    }
    return step
  }
});

const procedure = new schema.Entity("procedures", {
  oem_business_id: business,
  steps: [step],
  devices: [device]
}, {
  processStrategy: (procedure, {oem_business_id,id}) => ({oem_business_id: id || oem_business_id, ...procedure})
});

const business = new schema.Entity("businesses", {
  procedures: [procedure]
}, {
  idAttribute: 'oem_business_id',
  processStrategy: (business, {id}) => ({oem_id: id, ...business})
});

const oem = new schema.Entity("oems", {
  businesses: [business]
})

const user = new schema.Entity("users", {
  client: oem,
  categories: [business]
}, {
  processStrategy: ({roleable_type, roleable, name,...user}) => ({roleable: roleable_type || roleable, name: name || user.email,...user})
})

export default {
  device,
  step,
  procedure,
  business,
  oem,
  user
}
