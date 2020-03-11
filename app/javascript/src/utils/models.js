import { normalize, schema } from 'normalizr';

const action = new schema.Entity("actions");

const device = new schema.Entity("devices", {
  actions: [action]
});
const step = new schema.Entity("steps", {}, {
  processStrategy: (step, procedure) => {
    if(!step.procedure_id && procedure && procedure.id){
      step.procedure_id = procedure.id
    }
    if(!step.time){
      step.time = 8
    }
    if(!step.mode){
      step.mode = "continuous"
    }
    return step
  }
});
step.define({
  procedure_id: procedure,
  //device
})

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

export default {
  device,
  step,
  procedure,
  business,
  oem
}
