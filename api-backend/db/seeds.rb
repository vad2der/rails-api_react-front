# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

[ {name: 'Household'}, {name: 'Deli'}, {name: 'Apparel'}].each {|d| Department.where(name: d[:name]).first_or_create}

houshold_dep_id = Department.where(name: 'Household').first.id
deli_dep_id = Department.where(name: 'Deli').first.id
apparel_dep_id = Department.where(name: 'Apparel').first.id

[
  {name: 'napkins', price: 2.50, department_id: houshold_dep_id},
  {name: 'mop', price: 15.99, department_id: houshold_dep_id},
  {name: 'bleach', price: 7.42, department_id: houshold_dep_id},
  {name: 'brush', price: 3.50, department_id: houshold_dep_id},
  {name: 'bucket', price: 3.99, department_id: houshold_dep_id},
  {name: 'mouse trap', price: 15.65, department_id: houshold_dep_id},

  {name: 'sausage', price: 7.80, department_id: deli_dep_id},
  {name: 'cesar salad', price: 1.87, department_id: deli_dep_id},
  {name: 'italian salad', price: 4.15, department_id: deli_dep_id},
  {name: 'montreal smoked beef', price: 2.31, department_id: deli_dep_id},
  {name: 'roasted beef', price: 2.24, department_id: deli_dep_id},
  {name: 'hot dog', price: 0.99, department_id: deli_dep_id},

  {name: 'socks', price: 5.99, department_id: apparel_dep_id},
  {name: 't-shirt', price: 20.00, department_id: apparel_dep_id},
  {name: 'slippers', price: 12.10, department_id: apparel_dep_id},
  {name: 'rubber boots', price: 12.30, department_id: apparel_dep_id},
  {name: 'rain coat', price: 22.00, department_id: apparel_dep_id},
  {name: 'hat', price: 32.10, department_id: apparel_dep_id},
].each {|p| Product.where(name: p[:name], price: p[:price], department_id: p[:department_id]).first_or_create}

[
  {code: 'FREESTUFF', active: false, discount: 100},
  {code: 'DISCOUNTCODE15', active: true, discount: 15}
].each {|pr| Promotion.where(code: pr[:code], active: pr[:active], discount: pr[:discount]).first_or_create}

Product.where(name: 'napkins').first.promotions << Promotion.first
Product.where(name: 'sausage').first.promotions << Promotion.first
Product.where(name: 'cesar salad').first.promotions << Promotion.last
Product.where(name: 'slippers').first.promotions << Promotion.last