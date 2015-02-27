class OmdbFetch
  attr_reader :tv_show

  def initialize(tv_show)
    @tv_show = tv_show
  end

  def call
    data["Response"] == "True" ? parse_response : nil
  end

  def parse_response
    description = data["Plot"]
    start_year, end_year = data["Year"].split("–")

    {
      description: description,
      start_year: start_year,
      end_year: end_year
    }
  end

  private
  def omdb_uri
    Addressable::URI.new(
      scheme: "http",
      host: "www.omdbapi.com",
      path: "",
      query_values: {
        t: tv_show.title,
        type: "series",
        plot: "short",
        r: "json"
      }
    ).to_s
  end

  def data
    JSON.parse(RestClient.get(omdb_uri))
  end
end