function optionChanged(id) {
    buildMetaData(id);
    buildBarChart(id);
    buildBubbleChart(id);
    buildGaugeChart(id);
};

function buildBarChart(id) {
    d3.json("samples.json").then((sample) => {
        var sel_sampleData = sample.samples;
        var result = sel_sampleData.filter((smdata) => smdata.id.toString() === id)[0];

        var sampleValues =  result.sample_values.slice(0, 10).reverse();

        var otu = (result.otu_ids.slice(0, 10)).reverse();
        var otu_id = otu.map((id) => `OTU  ${id}`);

        var labels =  result.otu_labels.slice(0, 10).reverse();

        var trace = {
            x: sampleValues,
            y: otu_id,
            text: labels,
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h",
        };
        var data = [trace];

        var layout = {
            title: `${id} Top ${otu_id.length} OTU`,
            yaxis:{
                tickmode: "linear",
            }
        };
        Plotly.newPlot("bar", data, layout);
    });
};


function buildBubbleChart(id) {
    d3.json("samples.json").then((sample) => {
        var sel_sampleData = sample.samples
        var result = sel_sampleData.filter((smdata) => smdata.id.toString() === id)[0];

        var sampleValues =  result.sample_values;

        var otu = result.otu_ids;
        var otu_id = otu.map((id) => `OTU  ${id}`);
        var otu_ids = otu.map((id) => id);
       
        var trace = {
            x: otu_ids,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otu_ids,
                colorscale: "Earth",
                type: "heatmap"
            },
            text: otu_id
        };
        var data = [trace];

        var layout = {
            xaxis: {title: `OTU ${id}`},
            margin: { t: 0},
            hovermode: "closest"
        };
        Plotly.newPlot("bubble", data, layout);
    });
};

function buildMetaData(id) {
    d3.json("samples.json").then((sample) => {
        var sel_metaData = sample.metadata;

        var result = sel_metaData.filter((smdata) => smdata.id.toString() === id)[0];
        var sel_metaData_id = d3.select("#sample-metadata");
        
        sel_metaData_id.html("");

        Object.entries(result).forEach((item) => {
            sel_metaData_id.append("h5").text(item[0].toUpperCase() + ": " + item[1] + "\n");
        });    
    });
};

function init() {
    var dropdown = d3.select("#selDataset");
    
    d3.json("samples.json").then((selectedData) => {
        
        selectedData.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        buildMetaData(selectedData.names[0]);
        buildBarChart(selectedData.names[0]);
        buildBubbleChart(selectedData.names[0]);
    });
};

init();