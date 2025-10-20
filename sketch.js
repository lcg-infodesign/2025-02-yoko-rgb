function preload() {
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {

  let outerPadding = 20;
  let padding = 10;
  let itemSize = 30;

  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));

  let rows = ceil(table.getRowCount() / cols);

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;

  createCanvas(windowWidth, totalHeight);

  colorMode(HSB, 360, 100, 100);

  console.log("cols: ", cols, " rows: ", rows);

  // Define min/max for 'column1' outside the loop for efficiency
  let allInnerValues = table.getColumn("column1");
  let minInnerValue = min(allInnerValues);
  let maxInnerValue = max(allInnerValues);
    
  let allValues = table.getColumn("column0");
  let minValue = min(allValues);
  let maxValue = max(allValues);

  let colCount = 0;
  let rowCount = 0;
  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {
    //carico dati della riga
    let data = table.getRow(rowNumber).obj;

    // prendo valore per dimensione
    let myValue = data["column0"];

    //calcolo min e massimo
    let allValues = table.getColumn("column0");
    let minValue = min(allValues);
    let maxValue = max(allValues);
    let scaledValue = map(myValue, minValue, maxValue, 1, itemSize);

    //seconda variabile per il colore
    let value2 = data["column2"];
    let allValues2 = table.getColumn("column2");
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let value2Mapped = map(value2, minValue2, maxValue2, 0, 1);

    let c1 = color("red");
    let c2 = color("blue");

    let mappedColor = lerpColor(c1, c2, value2Mapped);

    // Dimensioni cerchio interno (column1)
    let innerValue = data["column1"];
    // Mapped to be smaller than the itemSize, say up to 70% of itemSize
    let scaledInnerValue = map(innerValue, minInnerValue, maxInnerValue, 1, itemSize * 0.7);

    fill(mappedColor);

    noStroke();

    let xPos = outerPadding + colCount * (itemSize + padding);

    let yPos = outerPadding + rowCount * (itemSize + padding);

    ellipse (xPos, yPos, scaledValue, scaledValue);

    // Disegno del cerchio interno 
    fill(255); // White with some transparency (alpha 150)
    noStroke(0); // Black border
    strokeWeight(1);
    ellipse (xPos, yPos, scaledInnerValue, scaledInnerValue);

    // aumento colcount
    colCount++;

    // controllo se siamo a fine riga
    if (colCount == cols) {
      colCount = 0;
      rowCount++;
    }
  }
}

function draw() {
  // put drawing code here

 
}

function draw() {
// Darker background

ellipse()
}
