// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$(function() {
    $.ajax({
            url: "includes/json.php?cmd=Top10PCModels",
            dataType: "json",
            success: function(response)
            {

                // Pie Chart Example
                var migrationStatusPieID = document.getElementById("Top10PCModels");
                //console.log(migrationStatusPieID);
                var migrationStatusPie = new Chart(migrationStatusPieID, {
                  type: 'pie',
                  data: {
                    labels: response.labels,
                    datasets: [{
                      data: response.dataPoints,
                      backgroundColor: ['#4e73df', '#826cd8', '#a864cd', '#c55bbd', '#db55aa', '#eb5295', '#f55580', '#f95d6a', '#ff7c43' ,'#ffa600'],
                      //hoverBackgroundColor: ['#2e59d9', '#17a673'],
                      //hoverBorderColor: "rgba(234, 236, 244, 1)",
                    }],
                  },
                  options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    tooltips: {
                      backgroundColor: "rgb(255,255,255)",
                      bodyFontColor: "#858796",
                      borderColor: '#dddfeb',
                      borderWidth: 1,
                      xPadding: 15,
                      yPadding: 15,
                      displayColors: false,
                      caretPadding: 10,
                    },
                    legend: {
                      display: true,
                      position: 'bottom'
                    },
                    cutoutPercentage: 25,
                  },
                });
                //console.log(migrationStatusPie);
            }
    });
});
