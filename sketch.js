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
  background(255, 248, 220); 
  colorMode(RGB, 255);

  noStroke();

  rectMode(CENTER);
  angleMode(DEGREES);

  console.log("cols: ", cols, " rows: ", rows);

  // Definizione di min/max per la 'column1' 
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

    // Prima variabile 
    let myValue = data["column0"];
    let scaledValue = map(myValue, minValue, maxValue, 10, itemSize);

    // Seconda variabile per il colore
    let value2 = data["column2"];
    let allValues2 = table.getColumn("column2");
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let value2Mapped = map(value2, minValue2, maxValue2, 0, 1);

    let c1 = color("red");
    let c2 = color("purple");

    let mappedColor = lerpColor(c1, c2, value2Mapped);

    // Dimensioni cerchio interno (column1)
    let innerValue = data["column1"];
    // Più piccolo del itemSize 
    let scaledInnerValue = map(innerValue, minInnerValue, maxInnerValue, 1, itemSize * 0.7);

    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);

    ellipse (xPos, yPos, scaledValue, scaledValue);

    // Disegno del glow alone colorato esterno
    fill(25); //bianco con trasparenza 
    noStroke(0);
    drawingContext.shadowBlur = 80; // applicazione blur
    drawingContext.shadowColor = color(128, 0, 128, 80); // Glow violaceo usando alpha
    fill(128, 0, 128, 50); ; // Glow rosso con trasparenz
    ellipse(xPos, yPos, scaledValue, scaledValue);
    ellipse (xPos, yPos, scaledInnerValue, scaledInnerValue);

    //1. Disegno cerchio solido --> Uso della mappedColor per riempire il cerchio esterno alla gliffo della stella 
    noStroke
    fill(mappedColor);
    ellipse (xPos, yPos, scaledValue, scaledValue);
    
    // 2. Disegno del Star Glyphs (column1) 
    noStroke(); 
    fill(255, 150); // bianco/semi-trasparente 
    
    // richiamo della funzione
    drawStar(xPos, yPos, scaledInnerValue);

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
//niente 
 }

 function drawStar(x, y, size) {
  push(); 
  translate(x, y); //Muovo l'origine della stella è al centro del cerchio 
  
  let armLength = size; 
  let armWidth = size / 7; //spessore delle punte della stella 

  // Ho disegnato 3 rettangoli arrotondati per formare una stella a 6 punte 
  for (let i = 0; i < 3; i++) {
      let angle = i * 60; // Ho ruotato di 60 gradi le tre croci così da formare un angolo di 180 
      
      push();
      rotate(angle); // Rutato le cordinate 
      
      // disgno delle braccia della stella come un rettangolo arrotondato 
      rect(0, 0, armWidth, armLength, armWidth / 2); 
      
      pop();
  }
  
  pop(); 
}

