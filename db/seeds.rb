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
	Oem.create!()
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
3.times do
	Operator.create!()
end

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


