class Api::V1::ProductsController < ApplicationController

  before_action :restrict_access
  before_action :get_params, only: [:index]

  def index
    products = if @department && !@promotion && !@search
      Product.where(department_id: @department.id)
             .offset((@page - 1) * @size)
             .limit(@size)
    elsif @department && @promotion
      @promotion.products.where(department_id: @department.id)
                .offset((@page - 1) * @size)
                .limit(@size)
    elsif @promotion && !department
      @promotion.products.offset((@page - 1) * @size).limit(@size)
    elsif !@department && @search
      Product.where('((name LIKE ?) OR (name LIKE ?) OR (name LIKE ?) OR (name LIKE ?))', @search, '%' + @search, @search + '%', '%' + @search + '%')
             .offset((@page - 1) * @size)
             .limit(@size)
    elsif @department && @search
      Product.where(department_id: @department.id)
      .where('((name LIKE ?) OR (name LIKE ?) OR (name LIKE ?) OR (name LIKE ?))', @search, '%' + @search, @search + '%', '%' + @search + '%')
             .offset((@page - 1) * @size).limit(@size)
    else
      Product.all.offset((@page - 1) * @size).limit(@size)
    end

    render json: products, each_serializer: ProductSerializer
  end

  private
  def restrict_access
    super
  end

  def get_params
    @size = params[:size] ? params[:size].to_i : 20
    @size = 20 if (!@size.is_a?(Integer) || @size == 0) # check for the proper value & data type

    @page = params[:page] ? params[:page].to_i : 1
    @page = 1 if (!@page.is_a?(Integer) || @page == 0) # check for the proper datatype

    @department = params[:department] ? params[:department].capitalize : nil
    @department = Department.where(name: @department)&.first rescue nil

    promocode = params[:promocode] ? params[:promocode].upcase : nil
    @promotion = promocode ? Promotion.where(code: promocode)&.first : nil

    @search = params[:search] ? params[:search].strip : nil
  end
end
