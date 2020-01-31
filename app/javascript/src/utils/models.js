import { normalize, schema } from 'normalizr';

const action = new schema.Entity("actions", {});
action.define({
  device_id: device
})

const device = new schema.Entity("devices", {});
device.define({
  actions: [action]
})
const step = new schema.Entity("steps", {}, {
  processStrategy: (step, procedure) => (!step.procedure_id && procedure && procedure.id) ? ({procedure_id: procedure.id, ...step}) : step
});
step.define({
  procedure_id: procedure,
  device_id: device
})

const procedure = new schema.Entity("procedures", {}, {
  processStrategy: (procedure, {oem_business_id,id}) => ({oem_business_id: id || oem_business_id, ...procedure})
});
procedure.define({
  oem_business_id: business,
  steps: [step]
})

const business = new schema.Entity("businesses", {}, {
  idAttribute: 'oem_business_id',
  processStrategy: (business, {id}) => ({oem_id: id, ...business})
});
business.define({
  procedures: [procedure]
})
const oem = new schema.Entity("oems", {})
oem.define({
  businesses: [business]
})

export default {
  action,
  device,
  step,
  procedure,
  business,
  oem
}
