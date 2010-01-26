require File.dirname(__FILE__) + '/spec_helper'

describe "Lab1 Project" do
  include Rack::Test::Methods

  def app
    @app ||= Sinatra::Application
  end
  
  before(:all) do
    get '/index.html'
    @response = last_response
    @body = Hpricot.parse(@response.body)
  end

  # Ten Possible Points
  
  # 1 point - The file is named index.html
  it "should respond specifically to index.html" do
    @response.should be_ok
  end

  # * 1 point - the two flags appear with the appropriate labels
  # - assuming that the labels are in <p> tags
  it "should contain two flags with the appropriate lables" do
    (@body/'p').map(&:inner_html).select{|i| i =~ /Original Flag/}.should_not be_empty
    (@body/'img').first.attributes['src'].should == 'images/columbia_flag.gif'

    # # should have table with label
    (@body/'p').map(&:inner_html).select{|i| i =~ /Kompozer Flag/}.should_not be_empty
    (@body/'table').should_not be_empty
  end

  # * 1 point - the top rectangle is the correct color
  it "should contain a table whose top rectangle is the correct color" do
    # either the table or the top tr or top tr td have the color
    table_color = (@body/'table')[0].attributes['style'].match(/background-color:.*\#FFFF00/i)
    tr_color = (@body/'tr')[0].attributes['style'].match(/background-color:.*\#FFFF00/i)
    td_color = (@body/'td')[0].attributes['style'].match(/background-color:.*\#FFFF00/i)
    [table_color,tr_color,td_color].compact.flatten.should_not be_empty
  end
  
  # * 1 point - the middle rectangle is the correct color
  it "should contain a table whose middle rectangle is the correct color" do
    # either the table or the second tr or second tr td have the color
    table_color = (@body/'table')[0].attributes['style'].match(/background-color:.*\#584EA7/i)
    tr_color = (@body/'tr')[1].attributes['style'].match(/background-color:.*\#584EA7/i)
    td_color = (@body/'td')[1].attributes['style'].match(/background-color:.*\#584EA7/i)
    [table_color,tr_color,td_color].compact.flatten.should_not be_empty
  end

  # * 1 point - the bottom rectangle is the correct color
  it "should contain a table whose bottom rectangle is the correct color" do
    # either the table or the third tr or third tr td have the color
    table_color = (@body/'table')[0].attributes['style'].match(/background-color:.*\#EE2900/i)
    tr_color = (@body/'tr')[2].attributes['style'].match(/background-color:.*\#EE2900/i)
    td_color = (@body/'td')[2].attributes['style'].match(/background-color:.*\#EE2900/i)
    [table_color,tr_color,td_color].compact.should_not be_empty
  end

  # * 1 point - the flag is the correct width
  it "should be the correct width" do
    (@body/'table').first.attributes['style'].match(/width:.*226px/).should_not be_nil
    # should check to see if any of the tr or td is constraining the width of the table
  end
  
  # * 1 point - the top rectangle is the correct height
  it "should be the correct height" do
    (@body/'table').first.attributes['style'].match(/height:.*151px/).should_not be_nil
    # should check to see if any of the tr or td is constraining the height of the table
  end

  # * 1 point - the middle rectangle is the correct height
  it "should have a middle rectangle that is the correct height" do
    # check for percentages
    tr_pc = (@body/'tr')[1].attributes['style'].match(/height:.*25%/i)
    td_pc = (@body/'td')[1].attributes['style'].match(/height:.*25%/i)
    # check for pixels
    tr_px = (@body/'tr')[1].attributes['style'].match(/height:.*38px/i)
    td_px = (@body/'td')[1].attributes['style'].match(/height:.*38px/i)
    [tr_pc,td_pc,tr_px,td_px].compact.should_not be_empty
  end

  # * 1 point - the bottom rectangle is the correct height
  it "should have a bottom rectangle that is the correct height" do
    # check for percentages
    tr_pc = (@body/'tr')[2].attributes['style'].match(/height:.*25%/i)
    td_pc = (@body/'td')[2].attributes['style'].match(/height:.*25%/i)
    # check for pixels
    tr_px = (@body/'tr')[2].attributes['style'].match(/height:.*38px/i)
    td_px = (@body/'td')[2].attributes['style'].match(/height:.*38px/i)
    [tr_pc,td_pc,tr_px,td_px].compact.should_not be_empty
  end

  # * 1 point - the index.html file accesses an image named columbia_flag.gif 
  #             and this image is located in a subdirectory named images. 
  #  - we already tested for the html code that referenced the image, so this
  #  just checks to see if the image is actually there.
  it "should have an image at images/columbia_flag.gif" do
    get '/images/columbia_flag.gif'
    last_response.should be_ok
  end
  # XHTML 1.1 specs
end



