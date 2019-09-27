require 'test_helper'

class ShellControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get shell_index_url
    assert_response :success
  end

end
