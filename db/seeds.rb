# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# rails db:drop db:setup. Delete all data, and repopulate with seeds.rb
# rails db:drop db:create db:migrate db:seed, if there is a change in db(rmb to change code below too)

2.times do
  Oem.create!(name: Faker::Name.first_name)
end

x = 1
while x <= 2
  2.times do
    OemBusiness.create!([{
                             name: Faker::Company.name,
                             oem_id: x
                         }])
  end

  x = x+1
end


# Operator
x = 1
while x <= 3
  oem_business = OemBusiness.find(1)
  operator = Operator.create!(name: Faker::Name.first_name)
  myemail = "operator" + x.to_s + "@jmg.rocks"
  if x == 1
    myemail = "operator@gmail.com"
  end
  user = User.new(email: myemail, password: "password")
  user.confirm
  user.roleable = operator
  user.save
  oem_business.operators << operator
  oem_business.save
  x += 1
end

# Operator
x = 1
while x <= 3
  oem_business = OemBusiness.find(1)
  author = Author.create!(name: Faker::Name.first_name)
  user = User.new(email: "author" + x.to_s + "@jmg.rocks", password: "password")
  user.confirm
  user.roleable = author
  user.save
  oem_business.authors << author
  oem_business.save
  x += 1
end

ParlatyAdmin.create!(name: "james")

user = User.new(email: "padmin@gmail.com", password: "password")
user.confirm
user.roleable = ParlatyAdmin.first
user.save

user = User.new(email: "oem@gmail.com", password: "password")
user.confirm
user.roleable = Oem.first
user.save

user = User.new(email: "oem2@gmail.com", password: "password")
user.confirm
user.roleable = Oem.second
user.save

padmin = ParlatyAdmin.create!(name: "Chet")

user = User.new(email: "chet@parlaty.com", password: "password")
user.confirm
user.roleable = padmin
user.save

padmin = ParlatyAdmin.create!(name: "Pete")

user = User.new(email: "pjo@usa.com", password: "password")
user.confirm
user.roleable = padmin
user.save

padmin = ParlatyAdmin.create!(name: "Tim")

user = User.new(email: "tim@jmg.rocks", password: "password")
user.confirm
user.roleable = padmin
user.save

padmin = ParlatyAdmin.create!(name: "Will")

user = User.new(email: "willwangdev@gmail.com", password: "password")
user.confirm
user.roleable = padmin
user.save

padmin = ParlatyAdmin.create!(name: "Rob")

user = User.new(email: "rob@jmg.rocks", password: "password")
user.confirm
user.roleable = ParlatyAdmin.first
user.save

padmin = ParlatyAdmin.create!(name: "Sam")

user = User.new(email: "sam@jmg.rocks", password: "password")
user.confirm
user.roleable = padmin
user.save

oemBusiness1 = OemBusiness.find(1)
oemBusiness2 = OemBusiness.find(2)
oemBusiness3 = OemBusiness.find(3)
oemBusiness4 = OemBusiness.find(4)

device = Device.new(name: "Crank Handle")
action = Action.create!(name: "Crank Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Crank Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Crank Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
device.save

#oemBusiness1.devices << device
#oemBusiness1.save

device = Device.new(name: "Part with Lock")
action = Action.create!(name: "Part Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Part Action Two", device: device)
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Part Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
device.save

#oemBusiness1.devices << device
#oemBusiness1.save

device = Device.new(name: "Blowtorch")
action = Action.create!(name: "Blowtorch Action One", device: device)
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Blowtorch Action Two", device: device)
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Blowtorch Action Three", device: device)
device.actions << action
device.actions_order.push(action.id)
device.save

#oemBusiness2.devices << device
#oemBusiness2.save

device = Device.new(name: "Pressure Washer")
device.save

#oemBusiness2.devices << device
#oemBusiness2.save

device = Device.new(name: "Wrench")
action = Action.create!(name: "Wrench Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Wrench Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Wrench Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
device.save

#oemBusiness3.devices << device
#oemBusiness3.save

device = Device.new(name: "Radiator (heating)")
action = Action.create!(name: "Radiator Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Radiator Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Radiator Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
device.save

#oemBusiness3.devices << device
#oemBusiness3.save

device = Device.new(name: "Gas Appliance")
action = Action.create!(name: "Gas Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Gas Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Gas Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
device.save

#oemBusiness4.devices << device
#oemBusiness4.save

device = Device.new(name: "Futon Dryer")
action = Action.create!(name: "Futon Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Futon Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
action = Action.create!(name: "Futon Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.actions_order.push(action.id)
device.save

#oemBusiness4.devices << device
#oemBusiness4.save


# Procedures for every oem_business
proc_index = 1
y = 1
while y <= 4
  2.times do
    oem_business = OemBusiness.find(y)
    proc = Procedure.create!(
        name: 'Proc' + proc_index.to_s,
        version: Faker::Number.decimal(1),
        description: Faker::Lorem.sentence,
        category: Faker::Commerce.material,
        author: Faker::Name.name,
        language: Faker::Lorem.word
    )
    oem_business.procedures << proc
    device = Device.find(proc_index)
    proc.devices << device
    proc_index = proc_index + 1
  end
  y = y+1
end

# Steps
step_index = 1
action_instance_index = 1
z = 1
while z <= 6
  order = 1
  while order <= 2
    @step = Step.create!(
        title: 'Step' + step_index.to_s,
        location: Faker::Restaurant.name,
        note: Faker::Lorem.sentence,
        procedure_id: z,
        device_id: z
    )
    @pro = Procedure.find(z)
    @pro.steps_order.push(@step.id)
    @pro.save
    order = order+1
    step_index = step_index + 1
  end
  z = z+1
end


