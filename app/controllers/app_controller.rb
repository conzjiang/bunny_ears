class AppController < ApplicationController
  def index

  end

  def admin
    category = "on_the_air"
    @mark = { category: category, counter: counter(category) }
  end

  private
  def counter(category)
    MarkReader.new[category]
  end
end