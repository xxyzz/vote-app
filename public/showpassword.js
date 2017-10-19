function toggler() {
  if( document.getElementById('show_password').checked ) {
    $('#password').attr('type', 'text');
  } else {
    $('#password').attr('type', 'password');
  }
}
$('#show_password').click(toggler);