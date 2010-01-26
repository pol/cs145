require File.dirname(__FILE__) + '/spec_helper'

describe "Lab2 Project" do

  before(:all) do
    @doc = open("../lab2/index.html") { |f| Hpricot(f) }
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

  # Below the header 1 element is a table that contains a drawing of this Piet Mondrian Drawing
  describe "contains an approximate Piet Mondrian Drawing" do
    
    # * 1 point. The width of the table is 300 pixels. Don't worry about matching the height of the 
    #           original drawing or the dimensions of the cells in the original drawing.
    it "should have a width of 300 pixels"
    
    # * 1 point. Notice that there are 7 cells in the diagram.  Each cell should contain a number 
    #           between 1 and 7.  The cells should be numbered in order from top to bottom, left 
    #           to right.  For example, the top left cell (it's white) should contain the number 1.  
    #           The top right cell (it's red) should contain the number 2.  All numbers should be 
    #           centered in their cells.
    it "should contain cells numbered from 1 to 7, in order, read left to right, centered"
    
    # * 1 point. 
    it "should have borders around the cells optionally matching the widths of the original"
    
    # * 2 points.
    describe "minimize the number of table cells by using rowspan and colspan" do
    
    end
    
  end

  # 0 points. Below the drawing is a paragraph element with the content - Here is the original drawing
  it "should have a p containing 'Here is the original drawing'"
  
  # 1 point
  it "should have a link from 'original drawing' to 'http://www.anthroposophie.net/bilder/mondrian_comp_rgb.jpg'"
  
  # 2 points
  it "should validate correctly"
  
  # 1 point
  it "should be indented"
  
end



