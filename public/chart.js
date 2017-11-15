$(document).ready(function() {
  $('select').select();
  $('.modal').modal();        
  
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(getData);

  function getData() {
    $.getJSON(window.location.href, function(data) {
      var chartData = data.options.map(function(option) {
        return [ option.description, option.votes.length ];
      });
      drawChart(chartData);
    });
  };

  function drawChart(chartData) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Option');
    data.addColumn('number', 'Votes');
    data.addRows(chartData);
    var options = {
      backgroundColor: { fill:'transparent' },
      'sliceVisibilityThreshold': 0
    };
    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
  };
});