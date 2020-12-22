function buildGaugeChart(id) {
  d3.json("samples.json").then((sample) => {
    var sel_metaData = sample.metadata;
    var result = sel_metaData.filter((smdata) => smdata.id.toString() === id)[0];
    var data = [
        {
          type: "indicator",
          mode: "gauge+number+delta",
          value: Math.max(parseInt(result.wfreq)),
          title: { text: "Belly Button Washing Frequency <br> Scrubs per Week", font: { size: 24 } },
          // delta: { reference: 10, increasing: { color: "RebeccaPurple" } },
          gauge: {
            axis: { range: [null, 10], tickwidth: 10, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "black",
            borderwidth: 2,
            bordercolor: "lightblue",
            steps: [
              { range: [0, 1], color: "rgb(111,600,399)" },
              { range: [1, 2], color: "rgb(000,400,399)" },
              { range: [2, 3], color: "rgb(000,400,399)" },
              { range: [3, 4], color: "rgb(000,400,499)" },
              { range: [4, 5], color: "rgb(000,400,499)" },
              { range: [5, 6], color: "rgb(000,400,499)" },
              { range: [6, 7], color: "rgb(000,400,499)" },
              { range: [7, 8], color: "rgb(000,400,499)" },
              { range: [8, 9], color: "rgb(000,400,499)" },
              { range: [9, 10], color: "rgb(000,400,599)" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 490
            }
          }
        }
      ];
      
      var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        font: { color: "darkblue", family: "Arial" }
      };
      
      Plotly.newPlot('gauge', data, layout);
    })
  };
    
function init() {
  var dropdown = d3.select("#selDataset");
  
  d3.json("samples.json").then((selectedData) => {
      selectedData.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });
      buildGaugeChart(selectedData.names[0]);
  });
};

init();