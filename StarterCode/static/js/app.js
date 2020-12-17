//1. Use the D3 library to read in samples.json.
//Fetch JSON data and console.log it
// d3.json("samples.json").then(function(data) {
//     console.log(data);
// });
// const dataPromise = d3.json("samples.json");
// console.log("Data Promise: ", dataPromise)
// function unpack(rows, index) {
//     return rows.map(function(row) {
//         return row[index];
//     });
// }

//(#selDataset)
//Create init 
function init() {
    var selector = d3.select("#selDataset");
    //Grab values from samples.json 
    d3.json("samples.json").then((data) => {
        var sampleIDNames = data.names;
        console.log("IDs ", sampleIDNames);
        sampleIDNames.forEach((sample) => {
            selector.append("option").text(sample).property("value");
        })
        //build chart with first id name
        buildPlot(sampleIDNames[0]);
        
    })
   
}
//update demographic metadata
let panelBody = d3.select("#sample-metadata");
console.log(panelBody);
//loop through the data and console.log each metadata object
//https://www.w3schools.com/bootstrap/bootstrap_panels.asp
metadata.forEach(function (bbMetaData) {
    console.log(bbMetaData);
    let  = panel-body.append("panel-body")
    panel-body.append("panel-body").text(bbMetaData.id)
    panel-body.append("panel-body").text(bbMetaData.ethnicity)
    panel-body.append("panel-body").text(bbMetaData.gender)
    panel-body.append("panel-body").text(bbMetaData.age)
    panel-body.append("panel-body").text(bbMetaData.location)
    panel-body.append("panel-body").text(bbMetaData.bbtype)
    panel-body.append("panel-body").text(bbMetaData.wfreq)
});


//event when option is changed
function optionChanged(newSample) {
    //buildplot function
        buildPlot(newSample);
    };
    //create bar chart
    function buildPlot(sample) {
        d3.json("samples.json").then((data) => {
            var samples = data.samples 
            var filteredData = samples.filter(sampleID => sampleID.id === sample)[0]
            //sample values
            var sample_values = filteredData.sample_values;
            var sample_values = sample_values.slice(0,10).reverse();
            //otu_ids
            var otu_ids = filteredData.otu_ids;
            var otu_ids = otu_ids.slice(0,10).reverse();
            //otu_labels 
            var otu_labels = filteredData.otu_labels;
            var otu_labels = otu_labels.slice(0,10).reverse();
            //console.log(sample_values);
            //console.log(otu_ids);
            //console.log(otu_labels);
            
            let trace1 = {
                x: sample_values,
                y: otu_ids.map(data=>`otu_ids ${data}`),
                text: otu_labels,
                type: "bar",
                orientation: "h"
            };

            let data1 = [trace1];

            let layout = {
                xaxis: { title: "Sample Values" },
                yaxis: { title: "OTU IDs" }
            };
            Plotly.newPlot("bar",data1, layout);
        }) 
    };

    init();
