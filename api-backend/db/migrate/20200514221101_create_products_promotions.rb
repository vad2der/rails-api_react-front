class CreateProductsPromotions < ActiveRecord::Migration[6.0]
  def change
    create_table :products_promotions do |t|
      t.references :product, null: false, foreign_key: true
      t.references :promotion, null: false, foreign_key: true

      t.timestamps
    end
  end
end
