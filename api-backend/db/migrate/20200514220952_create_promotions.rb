class CreatePromotions < ActiveRecord::Migration[6.0]
  def change
    create_table :promotions do |t|
      t.string :code
      t.boolean :active
      t.integer :discount

      t.timestamps
    end
  end
end
