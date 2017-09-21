function addOption() {
    $(this).parent().before(`<div class="input-field col s12 extra-option"><input class="extra-input" id="options" name="poll[options][]" required="" type="text"><label for="options">Extra Option</label><i class="material-icons remove_option">close</i></div>`);
};

function removeOption() {
    $(this).closest('.extra-option').remove();
}
$('#add_option_button').click(addOption);
$('.form').on('click', '.remove_option', removeOption);