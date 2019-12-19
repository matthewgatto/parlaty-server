import { normalize, schema } from 'normalizr';

const step = new schema.Entity("steps", {}, {
  processStrategy: ({visual, procedure_id, ...step}, procedure) => {
    if(!procedure_id && procedure && procedure.id){
      step.procedure_id = procedure.id
    }
    if(visual){
      step.image = visual;
    }
    return step
  }
});
step.define({
  procedure_id: procedure
})

const procedure = new schema.Entity("procedures", {}, {
  mergeStrategy: (a, b) => {
    return {
      ...a,
      ...b
    }
  }
});
procedure.define({
  oem_business_id: business,
  steps: [step]
})

const business = new schema.Entity("businesses", {}, {idAttribute: 'oem_business_id'});
business.define({
  procedures: [procedure]
})
const oem = new schema.Entity("oems", {})
oem.define({
  businesses: [business]
})

export default {
  step,
  procedure,
  business,
  oem
}
