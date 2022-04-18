import { normalize, schema } from 'normalizr';

const action = new schema.Entity("actions");

const language = new schema.Entity("languages");

const comment = new schema.Entity("comments");

const device = new schema.Entity("devices", {
  actions: [action]
});
const step = new schema.Entity("steps", {
  comments: [comment],
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
  }, {
  idAttribute: 'id'
})

const user = new schema.Entity("users", {
  oem,
  oem_business_ids: [oem_business]
}, {
  processStrategy: ({roleable_type, client, oem, oem_businesses, roleable, name, id, user_id,...user}) => {
    let oemProp = oem || client;
    const roleableProp = roleable_type || roleable;
    if(roleableProp === "ClientAdmin" && oemProp !== null && typeof oemProp === "object"){
      oemProp.oem_businesses = oem_businesses
      console.log(oemProp);
    }
    return({roleable: roleableProp, name: name || user.email, oem_business_ids: oem_businesses, client:oem, oem: oemProp, id: user_id || id, ...user})
  }
})

const setup_intent = new schema.Entity("setup_intent");

export default {
  comment,
  language,
  device,
  step,
  procedure,
  oem_business,
  oem,
  user
}
