require File.dirname(__FILE__) + '/spec_helper'

describe "Lab2 Project" do

  before(:all) do
    @doc = open("lab2/index.html") { |f| Hpricot(f) }
  end

  # Ten Possible Points
  
  # 0 point - The file is named lab2/index.html 
  it "should respond specifically to lab2/index.html" do
    @doc.should_not be_nil
  end

  # * 1 point. At the top of the file is a header 1 element with the content - Piet Mondrian Drawing
  it "should contain h1 with the content 'Piet Mondrian Drawing'" do
    (@doc/'h1').first.inner_html.should == 'Piet Mondrian Drawing'
  end

  describe "contains an approximate Piet Mondrian Drawing" do
    
    # Below the header 1 element is a table that contains a drawing of this Piet Mondrian Drawing
    it "should have a table for the drawing" do
      (@doc/'table').should_not be_empty
    end
    
    it "should have no cellspacing" do
      (@doc/'table').first.attributes['cellspacing'].should == '0'
    end

    # * 1 point. The width of the table is 300 pixels. Don't worry about matching the height of the 
    #           original drawing or the dimensions of the cells in the original drawing.
    it "should have a width of 300 pixels" do
      (@doc/'table').first.attributes['style'].match(/width: 300px/).should_not be_nil
    end
    
    # * 1 point. Notice that there are 7 cells in the diagram.  Each cell should contain a number 
    #           between 1 and 7.  The cells should be numbered in order from top to bottom, left 
    #           to right.  For example, the top left cell (it's white) should contain the number 1.  
    #           The top right cell (it's red) should contain the number 2.  All numbers should be 
    #           centered in their cells.
    it "should contain cells numbered from 1 to 7, in order, read left to right, centered" do
      (1..7).each do |num|
        (@doc/'td')[num-1].inner_html.should == num.to_s
      end
      (@doc/'table').first.attributes['style'].match(/text-align: center/).should_not be_nil
    end
    
    it "should have a second cell which is rowspan 2, colspan 2" do
      (@doc/'td')[1].attributes['colspan'].should == '2'
      (@doc/'td')[1].attributes['rowspan'].should == '2'
    end
    
    it "should have rowspan 2 for cells 4 and 5" do
      (@doc/'td')[3].attributes['rowspan'].should == '2'
      (@doc/'td')[4].attributes['rowspan'].should == '2'
    end
    
    # * 1 point. 
    it "should have borders around the cells optionally matching the widths of the original" do
      (@doc/'td').each do |td|
        td.attributes['style'].match(/border: 5px solid black/).should_not be_nil
      end
    end
    
    # * 2 points.  less than or equal to seven td's
    it "should minimize the number of table cells by using rowspan and colspan" do
      (@doc/'td').length.should <= 7
    end
    
    # COLORS
    it "should have a second cell with the color #FE0000" do
      (@doc/'td')[1].attributes['style'].match(/background-color: #FE0000/).should_not be_nil
    end
    
    it "should have a fourth cell with the color #100FB5" do
      (@doc/'td')[3].attributes['style'].match(/background-color: #100FB5/).should_not be_nil
    end

    it "should have a seventh cell with the color #FDFE00" do
      (@doc/'td')[6].attributes['style'].match(/background-color: #FDFE00/).should_not be_nil
    end

  end

  # 0 points. Below the drawing is a paragraph element with the content - Here is the original drawing
  # make sure you are ignoring newlines
  it "should have a p containing 'Here is the original drawing'" do
    (@doc/'p').first.inner_html.gsub(/\n/,'').match(/Here.*is.*the.*original.*drawing/).should_not be_nil
  end
  
  # 1 point.  Should have a link in the paragraph to the original
  it "should have a link from 'original drawing' to 'http://www.anthroposophie.net/bilder/mondrian_comp_rgb.jpg'" do
    (@doc/'p'/'a').first.attributes['href'].should == 'http://www.anthroposophie.net/bilder/mondrian_comp_rgb.jpg'
    (@doc/'p'/'a').first.inner_html.gsub(/\n/,'').should =~ original.*drawing/
  end
  
  # 1 point
  # this is a little silly, it's just running tidy on the code.
  it "should be indented" do
    @results = `tidy -i -m lab2/index.html 2>&1`
  end

  # 2 points
  it "should validate correctly" do
    @validator = MarkupValidator.new
    results = @validator.validate_file('lab2/index.html')
    results.errors.should be_empty
  end
  
end



