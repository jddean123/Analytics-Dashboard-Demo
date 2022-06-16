$(function() {
        //Total PCs on Windows 10
    $.ajax({
            url: "includes/json.php?cmd=BasicCount&metric=Windows10",
            dataType: "json",
            success: function(response)
            {
                var Percentage = Math.round(response.dataPoints.Percentage);
                $("#Windows10Progress").width( Percentage + "%" );
                $('#Windows10ProgressPercentage').html(Percentage + "%").removeClass("text-gray-300").addClass("text-gray-800");
                
            }
    });
        // Windows 10 PCs not up to 1909
    $.ajax({
            url: "includes/json.php?cmd=BasicCount&metric=Windows10Version&operator=dne",
            dataType: "json",
            success: function(response)
            {
                var Percentage = Math.round(response.dataPoints.Percentage);
                $("#OutdatedWindowsProgress").width( Percentage + "%" );
                $('#OutdatedWindowsProgressPercentage').html(Percentage + "%").removeClass("text-gray-300").addClass("text-gray-800");
                $('#OutdatedWindowsCount').html(response.dataPoints.Count + " / " + response.dataPoints.Total).removeClass("text-gray-300").addClass("text-gray-800");
                
            }
    });
        // Migrated Count
    $.ajax({
            url: "includes/json.php?cmd=BasicCount&metric=Migrated",
            dataType: "json",
            success: function(response)
            {
                var Percentage = Math.round(response.dataPoints.Percentage);
                $("#MigratedProgress").width( Percentage + "%" );
                $('#MigratedProgressPercentage').html(Percentage + "%").removeClass("text-gray-300").addClass("text-gray-800");
                
            }
    });
    
        // Spare PCs
    $.ajax({
            url: "includes/json.php?cmd=BasicCount&metric=Spares&operator=LIKE",
            dataType: "json",
            success: function(response)
            {
                $('#TotalSpares').html(response.dataPoints.Count).removeClass("text-gray-300").addClass("text-gray-800");
            }
    });
        // Low RAM
    $.ajax({
            url: "includes/json.php?cmd=BasicCount&metric=RAM16&operator=lt",
            dataType: "json",
            success: function(response)
            {
                $('#LowRAM').html(response.dataPoints.Count).removeClass("text-gray-300").addClass("text-gray-800");
            }
    });
    
    //Pages
    function Dashboard(state) {
        if (state == "show") {
            $('#pageTitle').html("Dashboard").show();
            $('#dashboardLink').addClass("active");
            $('#chartsLink').removeClass("active");
            $('#tablesLink').removeClass("active");
            
            $('.dashboardWidgets').each(function() {
                $(this).show();
            });
            
            $.getScript( "js/chart-PCsbyLocation.js", function( data, textStatus, jqxhr ) {});
            $.getScript( "js/chart-migrationStatusPie.js", function( data, textStatus, jqxhr ) {});
            $.getScript( "js/chart-PCsWindows10Version.js", function( data, textStatus, jqxhr ) {});
        } else {
            $('#dashboardLink').removeClass("active");
            $('.dashboardWidgets').each(function() {
                $(this).hide();
            });
        }
    }
    
    function Charts(state) {
        if (state == "show") {
            $('#pageTitle').html("Charts").show();
            $('#dashboardLink').removeClass("active");
            $('#chartsLink').addClass("active");
            $('#tablesLink').removeClass("active");
            $('.ChartsWidgets').each(function() {
                $(this).show();
            });
            
            $.getScript( "js/chart-Top10PCModels.js", function( data, textStatus, jqxhr ) {});
            $.getScript( "js/chart-PCsbyLocation.2.js", function( data, textStatus, jqxhr ) {});
            $.getScript( "js/chart-PCsbyOS.js", function( data, textStatus, jqxhr ) {});
            $.getScript( "js/chart-Department.js", function( data, textStatus, jqxhr ) {});
            
        } else {
            $('#chartsLink').removeClass("active");
            $('.ChartsWidgets').each(function() {
                $(this).hide();
            });
        }
    }
    
    function Tables(state) {
        if (state == "show") {
            $('#pageTitle').html("Tables").show();
            $('#dashboardLink').removeClass("active");
            $('#chartsLink').removeClass("active");
            $('#tablesLink').addClass("active");
            $('.tableWidgets').each(function() {
                $(this).show();
            });
            
            $("head").append("<link>");
            var css = $("head").children(":last");
            css.attr({
                  rel:  "stylesheet",
                  type: "text/css",
                  href: "vendor/datatables/dataTables.bootstrap4.min.css"
            });
            
            $("head").append("<link>");
            var css = $("head").children(":last");
            css.attr({
                  rel:  "stylesheet",
                  type: "text/css",
                  href: "vendor/yadcf/jquery.dataTables.yadcf.css"
            });
            
            //$.getScript( "vendor/datatables/jquery.dataTables.min.js", function( data, textStatus, jqxhr ) {});
            //$.getScript( "vendor/datatables/dataTables.bootstrap4.min.js", function( data, textStatus, jqxhr ) {});
            //$.ajax({
            //    url: "includes/json.php?cmd=dataTables&metric=columns",
            //    dataType: "json",
            //    success: function(data)
            //    {
            //        console.log(data.columns);
            
            if ( ! $.fn.DataTable.isDataTable( '#dataTable' ) ) {
                    var RWdataTable = $('#dataTable').DataTable({
                        
                       /** "ajax": {
                            "url": "includes/json.php",
                            
                            //"contentType": "application/json",
                            //"contentType": "application/json",
                            //"type": "POST"
                        }, **/

                        //columns: data.columns,
                        autofill: true,
                        select: true,
                        responsive: true,
                        buttons: true,
                        length: 10,
                        "processing": true,
                        "serverSide": true,
                        aaSorting:[],
                        
                      "ajax": "includes/json.php",
                      //"aoColumns": data.columns
                  });
                RWdataTable.order([0,'asc']).draw();
                
                    yadcf.init(RWdataTable,
                        [
                            {
                                column_number : 14
                            }, 
                            {
                                column_number: 6,
                                filter_type: "auto_complete",
                                text_data_delimiter: ","
                            },
                            {
                                column_number : 5
                            }
                        ],
                        {
                            cumulative_filtering: true
                        }
                    );
            };
                //}
            //});
            
            $('#dataTablesReset').click(function() {
                RWdataTable.search('').draw();
                RWdataTable.order([0,'asc']).draw();
                RWdataTable.page.len(10).draw();
                yadcf.exResetAllFilters(RWdataTable);
            });
            
        } else {
            $('#tablesLink').removeClass("active");
            $('.tableWidgets').each(function() {
                $(this).hide();
            });
        }
    }
    
    function getCurrPage() {
        var currURL = window.location.hash;
        function getHashFromUrl(url){
            return $("<a />").attr("href", url)[0].hash.replace(/^#/, "");
        }
        return getHashFromUrl(currURL);
    }
    
    pageUpdater(getCurrPage());
    
    function pageUpdater(currPage) {
        if (currPage == "charts") {
            Dashboard("hide");
            Charts("show");
            Tables("hide");
        } else if (currPage == "tables") {
            Dashboard("hide");
            Charts("hide");
            Tables("show");
        } else {
            Dashboard("show");
            Charts("hide");
            Tables("hide");
        }
    }
    
    $(window).on('hashchange', function(e){
        var currPage = getCurrPage();
        pageUpdater(currPage);
    });
    
});