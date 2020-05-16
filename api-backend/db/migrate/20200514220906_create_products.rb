class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      t.decimal :price, precision: 8, scale: 2
      t.references :department, null: false, foreign_key: true

      t.timestamps
    end
  end
end
