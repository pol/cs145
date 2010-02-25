require File.dirname(__FILE__) + '/spec_helper'

describe "Lab3 Project" do
  
  before(:all) do
    @css_file = File.open("lab6/css/lab6.css").read
    @css = CssParser::Parser.new
    @css.add_block!(@css_file)
  end
  
  # Create a file named lab6.css in a subdirectory entitled css of your lab6 directory.
  it "should have a css file named css/lab6.css " do
    File.exists?('lab6/css/lab6.css').should be_true    
  end
  
  # Create a file named index.html in your lab6 directory. Copy and paste the html source code 
  # from this file into the index.html document. Do not modify this document.
  # http://www.cs.montana.edu/paxton/classes/fall-2009/145/index.html
  it "should have a lab6/index.html which matches http://www.cs.montana.edu/paxton/classes/fall-2009/145/index.html" do
    File.exists?('lab6/index.html').should be_true    
    original = open("http://www.cs.montana.edu/paxton/classes/fall-2009/145/index.html").read
    local = open('lab6/index.html').read
    local.should == original
  end

  # 1 point.  Table headers elements (<th>) have black text and #999999 background.
  it "should have table headers (th) with black text and #999999 background color" do
    @th = @css.find_by_selector('th').join(' ')
    @th.should include("color: black")
    @th.should include("background-color: #999999")
  end

  # 1 point.  Header 1 elements (<h1>) have a solid border that is 2 pixels wide, 
  # have a width of 440 pixels, a background color of #ffff99, a line height of 100 pixels and 
  # left padding of 10 pixels.
  describe "header 1 elements (h1)" do
    before(:all) do
      @h1 = @css.find_by_selector('h1').join(' ')
    end

    it "should have a 2 pixel solid border" do
      @h1.should include('border: 2px solid')
    end
    
    it "should have a width of 440 pixels" do
      @h1.should include('width: 440px')
    end
    
    it "should have a background color of #ffff99" do
      @h1.should include('background-color')
    end
    
    it "should have a line height of 100 pixels" do
      @h1.should include('line-height: 100px')
    end
    
    it "should have a left padding of 10 pixels" do
      @h1.should include('padding-left: 10px')
    end  
  end

  # 1 point.  Any element of the standingsleft class has a width of 200 pixels, is aligned to the 
  # left, has a left padding of 10 pixels and a height of 50 pixels.
  describe  "the .standingsleft class" do
    before(:all) do
      @sl = @css.find_by_selector('.standingsleft').join(' ')
    end
    
    it "should have a width of 200pixels" do
      @sl.should include('width: 200px')
    end
    
    it "should be aligned to the left" do
      @sl.should include('text-align: left')
    end
    
    it "has a left padding of 10 pixels" do
      @sl.should include('padding-left: 10px')
    end
    
    it "should have a height of 50 pixels" do
      @sl.should include('height: 50px')
    end
  end
  
  # 1 point.  Any element of the standingsright class has a width of 50 pixels, is aligned to the 
  # right and has a right padding of 10 pixels.
  describe "the .standingsright class" do
    before(:all) do
      @sr = @css.find_by_selector('.standingsright').join(' ')
    end
    
    it "should have a width of 50 pixels" do
      @sr.should include('width: 50px')
    end
    
    it "should be right aligned" do
      @sr.should include('text-align: right')
    end
    
    it "should have a right padding of 10 pixels" do
      @sr.should include('padding-right: 10px')
    end
    
  end
  
  # 2 points.  Any element that has an id of box1 has a dotted border that is 2 pixels wide, has 
  # padding of 10 pixels on all four sides, has a top margin of 20 pixels, 
  # has a width of 440 pixels, has a background color of #ffff99, is aligned to the left 
  # and has a bold font weight.
  describe "the #box1 element" do
    before(:all) do
      @box1 = @css.find_by_selector('#box1').join(' ')
    end
    
    it "should have a dotted border that is 2 pixels wide" do
      @box1.should include('border: 2px dotted')
    end
    
    it "shoud have a padding of 10 pixels on all four sides" do
      @box1.should include('border: 2px dotted')
    end
    
    it "should have a top margin of 20 pixels" do
      @box1.should include('margin-top: 20px')
    end
    
    it "should have a width of 440 pixels" do
      @box1.should include('width: 440px')
      
    end
    
    it "should have a background color of #ffff99" do
      @box1.should include('background-color: #ffff99')
      
    end
    
    it "should be left alignted" do
      @box1.should include('text-align: left')
      
    end
    
    it "should be bolded" do
      @box1.should include('font-weight: bold')
      
    end
    
  end
  
  # 1 point.  Anchor elements (<a>) have black text.
  it "should color anchor elements with black text" do
    @css.find_by_selector('a').join(' ').should include('color: black')
  end
  
  # 1 point.  Any element of the bar class has 8 pixel padding to both the left and right.
  it "should give 8 pixels of horizontal padding to the bar class" do
    @css.find_by_selector('.bar').join(' ').should include('padding-right: 8px')
    @css.find_by_selector('.bar').join(' ').should include('padding-left: 8px')
  end

  # 1 point. The lab6.css file validates.
  it "should validate through the css validator" do
    @validator = CSSValidator.new
    result = @validator.validate_text(@css_file)
    result.errors.should be_empty
  end

  # 1 point. The expected directory structure is correct.
  it "should have a proper directory structure" do
    File.exists?('lab6/index.html').should be_true
    File.exists?('lab6/css/lab6.css').should be_true
  end
end