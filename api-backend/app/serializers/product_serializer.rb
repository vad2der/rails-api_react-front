class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :promotions, :discounted_price

  def promotions
    if object.promotions.where(active: true).size > 0
      # last updated active discount
      object.promotions.where(active: true).order(:discount => :desc).map do |p|
        # {code: p.code, active: p.active, discount: p.discount}
        p.code
      end
    else
      []
    end
  end

  def discounted_price
    if object.promotions.where(active: true).size > 0
      # last updated active discount
      (object.promotions.where(active: true).order(:updated_at => :desc)&.first.discount * object.price / 100).round(2)
    else
      nil
    end
  end

end
