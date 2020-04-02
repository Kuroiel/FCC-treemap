d3.select("#everything").attr("align", "center");
let width = d3.select("svg").attr("width");
let height = d3.select("svg").attr("height");

let colors = [
  "red",
  "#b3ecff",
  "#ffccff",
  "green",
  "#86661a",
  "#62edc9",
  "#e26f91",
  "#0f86f3",
  "#f23785",
  "#f6f372",
  "#fe3620",
  "#c0b4c5",
  "#07d2c4",
  "#5ca6aa",
  "#fc743a",
  "#d8991f",
  "#fe3a64",
  "#a8947b"
];

d3.json(
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
).then(function (data) {
  let colorPick = function (category) {
    if (category == "Wii") {
      return colors[0];
    } else if (category == "NES") {
      return colors[1];
    } else if (category == "GB") {
      return colors[2];
    } else if (category == "DS") {
      return colors[3];
    } else if (category == "X360") {
      return colors[4];
    } else if (category == "PS3") {
      return colors[5];
    } else if (category == "PS2") {
      return colors[6];
    } else if (category == "SNES") {
      return colors[7];
    } else if (category == "GBA") {
      return colors[8];
    } else if (category == "PS4") {
      return colors[9];
    } else if (category == "3DS") {
      return colors[10];
    } else if (category == "N64") {
      return colors[11];
    } else if (category == "PS") {
      return colors[12];
    } else if (category == "XB") {
      return colors[13];
    } else if (category == "PC") {
      return colors[14];
    } else if (category == "PSP") {
      return colors[15];
    } else if (category == "XOne") {
      return colors[16];
    } else if (category == "2600") {
      return colors[17];
    } else {
      console.log("oops");
    }
  };
  let hierarchyed = d3.hierarchy(data);

  let treemap = d3.treemap().size([width, height]).padding(2);

  let root = treemap(
    hierarchyed
      .sum(function (d) {
        return d.value;
      })
      .sort(function (a, b) {
        return b.value - a.value;
      })
  );

  let cell = d3
    .select("svg")
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return `translate(${d.x0}, ${d.y0})`;
    });

  cell
    .append("rect")
    .attr("class", "tile")
    .attr("id", function (d) {
      return d.data.id;
    })
    .attr("fill", function (d) {
      return colorPick(d.data.category);
    })
    .style("opacity", 0.6)
    .attr("width", function (d) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d) {
      return d.y1 - d.y0;
    })
    .attr("data-name", function (d) {
      return d.data.name;
    })
    .attr("data-category", function (d) {
      return d.data.category;
    })
    .attr("data-value", function (d) {
      return d.data.value;
    })
    .on("mouseover", function (d, i) {
      d3.select("#tooltip")
        .style("opacity", 0.8)
        .attr("data-value", d.data.value)
        .html(
          "Console: " +
            d.data.category +
            "<br>" +
            "Name: " +
            d.data.name +
            "<br>" +
            "Value: " +
            d.data.value
        );
    })
    .on("mouseout", function (d, i) {
      d3.select("#tooltip").style("opacity", 0);
    });

  cell
    .selectAll("text")
    .data(function (d) {
      return d.data.name.split("/").join(",").split(": ").join(",").split(",");
    })
    .enter()
    .append("text")
    .text(function (d, i) {
      return d;
    })    .attr("x", function (d) {
      return 5;
    })
    .attr("y", function (d, i) {
      return 14 + i * 20;
    })
    .style("font-size", "10")
    .attr("opacity", 0);

  d3.select("body")
    .append("svg")
    .attr("id", "legend")
    .attr("width", 500)
    .attr("height", 100);

  d3.select("#legend")
    .selectAll("rect")
    .data(colors)
    .enter()
    .append("rect")
    .attr("class", "legend-item")
    .style("padding", 6)
    .attr("x", function (d, i) {
      return 70 * i;
    })
    .attr("y", function (d, i) {
      return 0;
    })
    .attr("height", 25)
    .attr("width", 70)
    .style("fill", function (d, i) {
      return colors[i];
    });
});
