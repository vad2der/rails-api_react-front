class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :promotions, :discounted_price

  def promotions
    object.promotions.order(:discount => :desc).map do |p|
      {code: p.code, active: p.active, discount: p.discount}
    end
  end

  def discounted_price
    if object.promotions.where(active: true).size > 0
      object.promotions.where(active: true).order(:discount => :desc)&.first.discount * object.price / 100
    else
      nil
    end
  end

end
