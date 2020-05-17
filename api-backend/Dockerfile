
FROM ruby:2.7.0
RUN apt-get update -qq && apt-get install -y --no-install-recommends build-essential libpq-dev
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN gem install bundler

RUN mkdir /api-backend
WORKDIR /api-backend

RUN echo "gem: --no-rdoc --no-ri" > /etc/gemrc
RUN ls
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 20 --retry 5

COPY . /api-backend
# RUN rails db:create
# RUN rails db:migrate
# RUN rails db:seed
EXPOSE 3000

CMD ["rails", "s", "-p", "3000", "-b", "0.0.0.0"]