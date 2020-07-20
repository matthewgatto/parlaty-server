import { normalize, schema } from 'normalizr';

const action = new schema.Entity("actions");

const device = new schema.Entity("devices", {
  actions: [action]
});
const step = new schema.Entity("steps", {
  procedure_id: procedure,
  device
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

const procedure = new schema.Entity("procedures",{},{
  processStrategy: ({procedure_id, id, ...procedure}) => ({id: id || procedure_id,...procedure})
});

const oem_business = new schema.Entity("oem_businesses", {
  procedures: [procedure]
}, {
  idAttribute: 'oem_business_id'
});

procedure.define({
  oem_businesses: [oem_business],
  steps: [step],
  devices: [device]
})


const oem = new schema.Entity("oems", {
  oem_businesses: [oem_business]
})

const user = new schema.Entity("users", {
  oem,
  oem_business_ids: [oem_business]
}, {
  processStrategy: ({roleable_type, categories, client, oem, oem_businesses, businesses, roleable, name, id, user_id,...user}) => {
    var oemProp = client || oem;
    const roleableProp = roleable_type || roleable;
    const businessesProp = categories || oem_businesses || businesses
    if(roleableProp === "ClientAdmin" && oemProp !== null && typeof oemProp === "object"){
      oemProp.oem_businesses = businessesProp
    }
    return({roleable: roleableProp, name: name || user.email, oem_business_ids: businessesProp, oem: oemProp, id: user_id || id, ...user})
  }
})

export default {
  device,
  step,
  procedure,
  oem_business,
  oem,
  user
}
