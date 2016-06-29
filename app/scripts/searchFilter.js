$(document).ready(function () {
    $(window).on('resize', function () {
        if ($(window).width() <= 768) {
            $("#hide").click(function () {
                $("#sec-srch-filter").hide();
                $("#pc-wrap").css({'margin': 'inherit 30px'});
                $("#srch-filter-panel").css({'display': 'block'});
            });
            $("#show").click(function () {
                $("#sec-srch-filter").show();
                $("#pc-wrap").css({'margin': 'inherit 30px'});
                $("#srch-filter-panel").css({'display': 'none'});
            });
        } else {
            $("#hide").click(function () {
                $("#sec-srch-filter").hide();
                $("#pc-wrap").css({'margin-left': '85px'});
            });
            $("#show").click(function () {
                $("#sec-srch-filter").show();
                $("#pc-wrap").css({'margin-left': '190px'});
            });
        }
    });
});
