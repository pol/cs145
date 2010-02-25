require File.dirname(__FILE__) + '/spec_helper'

describe "Lab3 Project" do
  
  before(:all) do
    @css_file = File.open("lab3/css/lab3.css").read
    @css = CssParser::Parser.new
    @css.add_block!(@css_file)
  end
  
  # 1 point. All level 1 header text, <h1>, should appear as sans-serif text that is 50 pixels high,
  # have a background color of rgb(255,255,150) and be centered.
  describe "header 1 text" do
    before(:all) do
      @h1 = @css.find_by_selector('h1').join(' ')
    end
    it "should be san-serif text" do
      @h1.should include('font-family: sans-serif')
    end
    it "should be 50 pixels high" do
      @h1.should include('font-size: 50px')
    end

    it "should have a background color of rgb(255, 255, 150)" do
      @h1.should include('background-color: rgb(255, 255, 150)')
    end
    
    it "should have centered text" do
      @h1.should include('text-align: center')
    end
  end

  # 2 points. All level 2 header text, <h2>, should appear as serif text that is 25 pixels high, 
  # have a background color of #0000ff, be italicized, be in the small-caps font variant and have a 
  # 5 pixel spacing between each character.
  describe "header 2 text" do
    before(:all) do
      @h2 = @css.find_by_selector('h2').join(' ')
    end
    
    it "should appear as serif text" do
      @h2.should include('font-family: serif')
    end
    
    it "should be 25 pixels high" do
      @h2.should include('font-size: 25px')
    end
    
    it "should have a background color of #0000ff" do
      @h2.should include('background-color: #0000ff')
    end
    
    it "should be italicized" do
      @h2.should include('font-style: italic')      
    end
    
    it "should be small-caps font variant" do
      @h2.should include('font-variant: small-caps')      
    end
    
    it "should have a 5 pixel spacing between each character" do
      @h2.should include('letter-spacing: 5px')      
    end
  end

  # 1 point. The background image takes up the whole page and is a repeated version of the pattern 
  # listed in the Useful Resources section below. The background image is found in a subdirectory 
  # entitled images of the main directory entitled lab3.
  describe "the body background image" do
    before(:all) do
      @body = @css.find_by_selector('body').join(' ')
    end
    
    it "should exist as images/pattern_096.gif" do
      File.exists?('lab3/images/pattern_096.gif').should be_true
    end
    
    it "should be repeated (tiled)" do
      @body.should include('background-image: url(\'../images/pattern_096.gif\')')
    end
  end

  # 1 point. The spacing between each word that appears after a bullet in a list is 5 pixels.
  it "should have a 5 pixel space between words that are list items" do
    @css.find_by_selector('li').join(' ').should include('word-spacing: 5px')
  end

  # 1 point. All paragraph text, <p>, has a line above it and a font weight of 900.
  describe "paragraph text" do
    
    before(:all) do
      @p = @css.find_by_selector('p').join(' ')
    end
    
    it "should have a line above it" do
      @p.should include('text-decoration: overline')
    end
    
    it "should have a font weight of 900" do
      @p.should include('font-weight: 900')
    end
    
  end

  # 1 point. When the cursor is placed above a hypertext link, the text of the link should turn red, 
  # be in all uppercase letters, not be underlined, and have a background color of rgb(255,255,150).
  describe "anchor hover" do
  
    before(:all) do
      @a = @css.find_by_selector('a:hover').join(' ')
    end
    
    it "should have a red color" do
      @a.should include("color: red")
    end
    
    it "should be all uppercase" do
      @a.should include("text-transform: uppercase")
    end
    
    it "should not be underlined" do
      @a.should include("text-decoration: none")      
    end
    
    it "should have a background color of rgb(255, 255, 250)" do
      @a.should include("background-color: rgb(255, 255, 250)")
    end
  end

  # 1 point. Any text that is bold, <b>, in the original html document should be blue in color.
  it "should color bold text blue" do
    @css.find_by_selector('b').join(' ').should include('color: blue')
  end

  # 1 point. The lab3.css file validates.
  it "should validate through the css validator" do
    @validator = CSSValidator.new
    result = @validator.validate_text(@css_file)
    result.errors.should be_empty
  end

  # 1 point. The expected directory structure is correct.
  # NOTE: this is inconsistent with the lab submission instructions
  it "should have a proper directory structure"
end