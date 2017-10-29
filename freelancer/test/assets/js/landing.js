/**
 * Created by Manu on 10/28/2017.
 */

new WOW().init();



dataColouredBarsChart = {
    labels: ['\'06', '\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
    series: [
        {name:"Short",data:[187, 285, 340, 454, 586, 620, 580, 452, 300, 573, 510, 700, 780]},
        {name:"Long",data:[67, 152, 143, 287, 280, 240, 380, 350, 542, 644, 600, 700, 620]}
    ]
};

optionsColouredBarsChart = {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0.4
    }),
    axisY: {
        showGrid: true,
        offset: 40
    },
    axisX: {
        showGrid: false
    },
    low: 0,
    high: 1000,
    showPoint: false,
    height: '400px',
    plugins : [
        Chartist.plugins.tooltip({
            anchorToPoint: false,
            appendToBody : true
        })
    ]
};


var exampleTrade = new Chartist.Line('#exampleTrade', dataColouredBarsChart, optionsColouredBarsChart);

// Listen for draw events on the bar chart
exampleTrade.on('draw', function(data) {
    // If this draw event is of type bar we can use the data to create additional content

    if(data.type === 'line') {
        console.log(data)
        // We use the group element of the current series to append a simple circle with the bar peek coordinates and a circle radius that is depending on the value
//         data.group.append(new Chartist.Svg('circle', {
//             cx: 238,
//             cy: 148,
//             r: 10
//         }, 'short-circle animated fadeInDown'));
//         data.group.append(new Chartist.Svg('circle', {
//             cx: 238,
//             cy: 281,
//             r: 10
//         }, 'long-circle animated fadeInUp'));
        

        var x = data.path.pathElements[5].x;
        var y = data.path.pathElements[5].y;
        if(x&&y&&data.series.name=="Short"){
            var shortTooltip = document.getElementById("short-tooltip");

            shortTooltip.style.left=x+"px";
            shortTooltip.style.top=y+"px";
            shortTooltip.classList.add("fadeInLeft");
        }else if(x&&y&&data.series.name=="Long"){

            var longTooltip = document.getElementById("long-tooltip");
            longTooltip.style.left=x+"px";
            longTooltip.style.top=y+"px";
            longTooltip.classList.add("fadeInRight");
        }
    }
});