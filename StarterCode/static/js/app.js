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
        buildPlot(sampleIDNames[0]);
        console.log(data);  
        buildDemographic(data.metadata, +sampleIDNames[0]);
    })

}
init();
//event when option is changed
function optionChanged(newSample) {
    //buildplot function
        buildPlot(newSample);
        buildDemographic(newSample);
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
            
        //Buble chart
        // Use otu_ids for the x values.
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
                // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)',
                //         'rgb(255, 0, 0)', 'rgb(204, 153, 255)', 'rgb(204, 255, 255)', 'rgb(255, 128, 0)',
                //         'rgb(0, 0, 255)', 'rgb(255, 51, 153)', 'rgb(0, 255, 0)'],

                // opacity: [1, 0.8, 0.6, 0.4, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6]
            }
        };
        var data2 = [trace2];
        var layout2 = {
            title: " ",
            showlegend: false,
            xaxis: { title: "OTU ID" },
            height: 500,
            width: 900
        };
        Plotly.newPlot("bubble", data2, layout2);
        })        
    };


//let metadata = samples.json[2]
//"metadata":[{"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, 
//"location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}
function buildDemographic(metadata, id) {
// d3.json("samples.json").then((metadata) => {
    // var metadata = data.metadata
    var filteredMetaData = metadata.filter(m => m.id === id)[0]; 
    let panelBody = d3.select("#sample-metadata");
    console.log(panelBody);
    panelBody.html("");
    Object.entries(filteredMetaData).forEach(([key, value]) => {
        var cell = panelBody.append("div");
        cell.text(value);
      });
    //loop through the data and console.log each metadata object
    //https://www.w3schools.com/bootstrap/bootstrap_panels.asp
    // metadata.forEach(function (bbMetaData) {
    //     console.log(bbMetaData);
    //     panelBody.append("div").text(bbMetaData.id)
    //     panelBody.append("div").text(bbMetaData.ethnicity)
    //     panelBody.append("div").text(bbMetaData.gender)
    //     panelBody.append("div").text(bbMetaData.age)
    //     panelBody.append("div").text(bbMetaData.location)
    //     panelBody.append("div").text(bbMetaData.bbtype)
    //     panelBody.append("div").text(bbMetaData.wfreq)
    // });
// })
};




