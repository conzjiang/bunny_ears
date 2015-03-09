class MarkReader
  if Rails.env.production?
    FILE_PATH = "#{Rails.root}/bookmarks.txt"
  else
    FILE_PATH = "#{Rails.root}/public/bookmarks.txt"
  end

  attr_reader :marks

  def initialize
    @marks = parse_file
  end

  def [](category)
    marks[category]
  end

  def update!(new_mark)
    marks.merge!(new_mark)
    write_changes_to_file
  end

  private
  def parse_file
    return {} unless File.file?(FILE_PATH)

    marks = File.readlines(FILE_PATH).map(&:chomp)
    marks.each_with_object({}) do |unparsed_line, state|
      category, mark = unparsed_line.split(" ")
      state[category] = mark.to_i
    end
  end

  def write_changes_to_file
    File.open(FILE_PATH, "w") do |f|
      marks.each do |category, counter|
        f.puts "#{category} #{counter}"
      end
    end

    nil
  end
end