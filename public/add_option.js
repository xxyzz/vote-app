function addMoreOption() {
  $(this).parent().before( `<div class="input-field col s12"><input id="options" name="poll[options][]" required="" type="text"><label for="options">Extra Option</label></div>` );
};

$('#add_option_button').on('click', addMoreOption);