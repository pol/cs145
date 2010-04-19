# vertical_text.rb

module VerticalTextHelper
  # call-seq:
  #    vertical_text(text)    => html
  #
  # Create vertical text, just stuff <br /> tags between characters
  #
  def vertical_text(text)
    text.split(//).join('<br />')
  end

end

Webby::Helpers.register(VerticalTextHelper)