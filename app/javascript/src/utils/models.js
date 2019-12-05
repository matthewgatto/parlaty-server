import { normalize, schema } from 'normalizr';

export const stepSchema = new schema.Entity("steps", {}, {
  processStrategy: (value, parent) => {
    if(!value.procedure_id && parent && parent.id){
      value.procedure_id = parent.id
    }
    return value
  }
});
stepSchema.define({
  procedure_id: procedureSchema
})

export const procedureSchema = new schema.Entity("procedures", {});
procedureSchema.define({
  oem_business_id: businessSchema,
  steps: [stepSchema]
})

export const businessSchema = new schema.Entity("businesses", {}, {idAttribute: 'oem_business_id'});
businessSchema.define({
  procedures: [procedureSchema]
})
export const oemSchema = new schema.Entity("oems", {})
oemSchema.define({
  businesses: [businessSchema]
})
