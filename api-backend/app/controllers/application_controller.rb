class ApplicationController < ActionController::API

  def restrict_access
    header_api_key = request.headers['X-Api-Key']
    @api_key = header_api_key if header_api_key == 'SuperSecret#'
    unless @api_key
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

end
