# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Department.create([
  {name: 'Houshold'}, {name: 'Deli'}, {name: 'Apparel'}
])

houshold_dep_id = Department.where(name: 'Houshold').first.id
deli_dep_id = Department.where(name: 'Deli').first.id
apparel_dep_id = Department.where(name: 'Apparel').first.id

Product.create([
  {name: 'napkins', price: 2.50, department_id: houshold_dep_id},
  {name: 'mop', price: 15.99, department_id: houshold_dep_id},
  {name: 'bleach', price: 7.42, department_id: houshold_dep_id},

  {name: 'sausage', price: 7.80, department_id: deli_dep_id},
  {name: 'cesar Salad', price: 1.87, department_id: deli_dep_id},
  {name: 'bleach', price: 4.15, department_id: deli_dep_id},

  {name: 'socks', price: 5.99, department_id: apparel_dep_id},
  {name: 't-shirt', price: 20.00, department_id: apparel_dep_id},
  {name: 'slippers', price: 12.10, department_id: apparel_dep_id},
])

Promotion.create([
  {code: 'FREESTUFF', active: false, discount: 100},
  {code: 'DISCOUNTCODE15', active: true, discount: 15}
])

Product.where(name: 'napkins').first.promotions << Promotion.first
Product.where(name: 'sausage').first.promotions << Promotion.first
Product.where(name: 'sesar Salad').first.promotions << Promotion.last
Product.where(name: 'slippers').first.promotions << Promotion.last