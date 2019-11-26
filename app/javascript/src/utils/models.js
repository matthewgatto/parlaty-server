import { normalize, schema } from 'normalizr';


export const procedureSchema = new schema.Entity("procedures", {
  oem_business_id: businessSchema
});

export const businessSchema = new schema.Entity("businesses", {
  procedures: [procedureSchema]
}, {idAttribute: 'oem_business_id'});

export const oemSchema = new schema.Entity("oems", {
  businesses: [businessSchema]
});

export const adminLandingSchema = new schema.Entity("landing", {
  oems: [oemSchema]
});
