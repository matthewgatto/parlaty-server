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

# Operator Admin
3.times do
	OperatorAdmin.create!(oem_business_id: 1, name: Faker::Name.first_name)
end

# Operator
x = 1
while x <= 3
	Operator.create!(oem_business_id: 1, name: Faker::Name.first_name)
	x += 1
end

=begin JDT

# Procedures for every oem_business
y = 1
while y <= 4
	2.times do
		Procedure.create!(
			name: Faker::Company.name,
			version: Faker::Number.decimal(1),
			description: Faker::Lorem.sentence,
			category: Faker::Commerce.material,
			author: Faker::Name.name,
			language: Faker::Lorem.word,
			oem_business_id: y
		)
	end
	y = y+1
end

# According to the code above, we have 3 Operators, 8 Procedures
def rand_in_range(from, to)
  rand * (to - from) + from
end

def rand_time(from, to=Time.now)
  Time.at(rand_in_range(from.to_f, to.to_f))
end

Operation.create!(procedure_id: 1,operator_id: 1, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 2,operator_id: 1, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 3,operator_id: 1, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 4,operator_id: 1, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 5,operator_id: 1, last_used: rand_time(3.days.ago))

Operation.create!(procedure_id: 6,operator_id: 2, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 7,operator_id: 2, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 8,operator_id: 2, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 1,operator_id: 2, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 2,operator_id: 2, last_used: rand_time(3.days.ago))

Operation.create!(procedure_id: 3,operator_id: 3, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 4,operator_id: 3, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 5,operator_id: 3, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 6,operator_id: 3, last_used: rand_time(3.days.ago))
Operation.create!(procedure_id: 7,operator_id: 3, last_used: rand_time(3.days.ago))


# Steps
z = 1
while z <= 6
	order = 1
	while order <= 2
		@step = Step.create!(
			title: Faker::Name.name,
			device: Faker::Appliance.equipment,
			location: Faker::Restaurant.name,
			note: Faker::Lorem.sentence,
			procedure_id: z
		)
		@pro = Procedure.find(z)
		@pro.steps_order.push(@step.id)
		@pro.save
		order = order+1
	end
	z = z+1
end

=end

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

user = User.new(email: "operator@gmail.com", password: "password")
user.confirm
user.roleable = Operator.first
user.save

user = User.new(email: "oadmin@gmail.com", password: "password")
user.confirm
user.roleable = OperatorAdmin.first
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

oemBusiness1 = OemBusiness.find(1)
oemBusiness2 = OemBusiness.find(2)
oemBusiness3 = OemBusiness.find(3)
oemBusiness4 = OemBusiness.find(4)

device = Device.new(name: "Crank Handle")
action = Action.create!(name: "Crank Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Crank Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Crank Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.save

oemBusiness1.devices << device
oemBusiness1.save

device = Device.new(name: "Part with Lock")
action = Action.create!(name: "Part Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Part Action Two", device: device)
device.actions << action
action = Action.create!(name: "Part Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.save
  
oemBusiness1.devices << device
oemBusiness1.save

device = Device.new(name: "Blowtorch")
action = Action.create!(name: "Blowtorch Action One", device: device)
device.actions << action
action = Action.create!(name: "Blowtorch Action Two", device: device)
device.actions << action
action = Action.create!(name: "Blowtorch Action Three", device: device)
device.actions << action
device.save

oemBusiness2.devices << device
oemBusiness2.save

device = Device.new(name: "Pressure Washer")
=begin
action = Action.create!(name: "Pressure Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Pressure Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Pressure Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
=end
device.save

oemBusiness2.devices << device
oemBusiness2.save

device = Device.new(name: "Wrench")
action = Action.create!(name: "Wrench Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Wrench Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Wrench Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.save

oemBusiness3.devices << device
oemBusiness3.save

device = Device.new(name: "Radiator (heating)")
action = Action.create!(name: "Radiator Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Radiator Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Radiator Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.save

oemBusiness3.devices << device
oemBusiness3.save

device = Device.new(name: "Gas Appliance")
action = Action.create!(name: "Gas Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Gas Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Gas Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.save

oemBusiness4.devices << device
oemBusiness4.save

device = Device.new(name: "Futon Dryer")
action = Action.create!(name: "Futon Action One", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Futon Action Two", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
action = Action.create!(name: "Futon Action Three", device: device, parameter_name: 'parm', parameter_value_8_pack: 'parmval')
device.actions << action
device.save

oemBusiness4.devices << device
oemBusiness4.save

=begin

device = Device.new(name: "Domestic Robot")
action = Action.create!(name: "Domestic Action One", device: device)
device.actions << action
action = Action.create!(name: "Domestic Action Two", device: device)
device.actions << action
action = Action.create!(name: "Domestic Action Three", device: device)
device.actions << action
device.save

device = Device.new(name: "Electric Water Boiler")
action = Action.create!(name: "Electric Action One", device: device)
device.actions << action
action = Action.create!(name: "Electric Action Two", device: device)
device.actions << action
action = Action.create!(name: "Electric Action Three", device: device)
device.actions << action
device.save

device = Device.new(name: "Hob (hearth)")
action = Action.create!(name: "Hob Action One", device: device)
device.actions << action
action = Action.create!(name: "Hob Action Two", device: device)
device.actions << action
action = Action.create!(name: "Hob Action Three", device: device)
device.actions << action
device.save

device = Device.new(name: "Dish Draining Closet")
action = Action.create!(name: "Dish Action One", device: device)
device.actions << action
action = Action.create!(name: "Dish Action Two", device: device)
device.actions << action
action = Action.create!(name: "Dish Action Three", device: device)
device.actions << action
device.save

device = Device.new(name: "Micathermic Heater")
action = Action.create!(name: "Micathermic Action One", device: device)
device.actions << action
action = Action.create!(name: "Micathermic Action Two", device: device)
device.actions << action
action = Action.create!(name: "Micathermic Action Three", device: device)
device.actions << action
device.save

device = Device.new(name: "Oven")
action = Action.create!(name: "Oven Action One", device: device)
device.actions << action
action = Action.create!(name: "Oven Action Two", device: device)
device.actions << action
action = Action.create!(name: "Oven Action Three", device: device)
device.actions << action
device.save

device = Device.new(name: "HVAC")
action = Action.create!(name: "HVAC Action One", device: device)
device.actions << action
action = Action.create!(name: "HVAC Action Two", device: device)
device.actions << action
action = Action.create!(name: "HVAC Action Three", device: device)
device.actions << action
device.save

device = Device.new(name: "Mangle (machine)")
action = Action.create!(name: "Mangle Action One", device: device)
device.actions << action
action = Action.create!(name: "Mangle Action Two", device: device)
device.actions << action
action = Action.create!(name: "Mangle Action Three", device: device)
device.actions << action
device.save

=end

# Procedures for every oem_business
proc_index = 1
y = 1
while y <= 4
	2.times do
		proc = Procedure.create!(
			name: 'Proc' + proc_index.to_s,
			version: Faker::Number.decimal(1),
			description: Faker::Lorem.sentence,
			category: Faker::Commerce.material,
			author: Faker::Name.name,
			language: Faker::Lorem.word,
			oem_business_id: y
		)
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
=begin
		mydevice = Device.find(@step.device_id)

		mydevice.actions.each do |myaction|
			ActionInstance.create!(
				step_id: @step.id,
				action_id: myaction.id,
				parameter_name: 'parmname' + action_instance_index.to_s,
				parameter_value_8_pack: 'parmvalue' + action_instance_index.to_s)
			action_instance_index = action_instance_index + 1
		end
=end
        step_index = step_index + 1
	end
	z = z+1
end


