$(document).ready(function () {
    $(window).on('resize', function () {
        if ($(window).width() < 768) {
            $("#pc-wrap").css({'margin': '30px'});
            $("#hide").click(function () {
                $("#sec-srch-filter").hide();
                //$("#pc-wrap").css({'margin': 'inherit 30px'});
                $("#srch-filter-panel").css({'display': 'block'});
            });
            $("#show").click(function () {
                $("#sec-srch-filter").show();
                //$("#pc-wrap").css({'margin': 'inherit 30px'});
                if  ($("#sec-srch-filter").is(":visible")) {
                    $("#srch-filter-panel").hide();
                }
            });
        }
        else {

            $("#pc-wrap").css({'margin-left': '85px'});
            $("#hide").click(function () {
                $("#sec-srch-filter").hide();
                //$("#pc-wrap").css({'margin-left': '85px'});
            });
            $("#show").click(function () {
                $("#sec-srch-filter").show();

                //$("#pc-wrap").css({'margin-left': '190px'});
            });
            //$("body").mouseup(function(e)
            //{
            //    var subject = $("#sec-srch-filter");

            //    if(e.target.id != subject.attr('id') && !subject.has(e.target).length)
            //    {
            //        subject.hide();
            //    }
            //});
        }
    });

});


