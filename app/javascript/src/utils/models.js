import { normalize, schema } from 'normalizr';

const step = new schema.Entity("steps", {});
step.define({
  procedure_id: procedure
})

const procedure = new schema.Entity("procedures", {}, {
  processStrategy: (procedure, {oem_business_id,id}) => ({oem_business_id: id || oem_business_id, ...procedure}),
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
  step,
  procedure,
  business,
  oem
}
