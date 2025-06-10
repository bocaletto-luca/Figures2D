"use strict";
    // TAB NAVIGATION FUNCTION
    function openTab(evt, tabName) {
      let tabcontents = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
        tabcontents[i].classList.remove("active");
      }
      let tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
      }
      document.getElementById(tabName).style.display = "block";
      document.getElementById(tabName).classList.add("active");
      evt.currentTarget.classList.add("active");
    }
    document.getElementById("defaultTab").click();

    /* --------- SQUARE --------- */
    function calcSquare() {
      const side = parseFloat(document.getElementById("squareSide").value);
      const result = document.getElementById("squareResult");
      if (isNaN(side) || side <= 0) {
        result.innerHTML = "<p>Please enter a valid positive number.</p>";
        return;
      }
      const area = side * side;
      const perim = 4 * side;
      result.innerHTML = `<p>Area: ${area.toFixed(2)}</p><p>Perimeter: ${perim.toFixed(2)}</p>`;
      drawSquare(side);
    }
    function drawSquare(side) {
      const canvas = document.getElementById("squareCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Scale such that the square fits within a 250px square
      const scale = (side > 250) ? 250 / side : 1;
      const drawSize = side * scale;
      const x = (canvas.width - drawSize) / 2;
      const y = (canvas.height - drawSize) / 2;
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, drawSize, drawSize);
    }

    /* --------- RECTANGLE --------- */
    function calcRectangle() {
      const length = parseFloat(document.getElementById("rectLength").value);
      const width = parseFloat(document.getElementById("rectWidth").value);
      const result = document.getElementById("rectangleResult");
      if (isNaN(length) || length <= 0 || isNaN(width) || width <= 0) {
        result.innerHTML = "<p>Please enter valid positive numbers.</p>";
        return;
      }
      const area = length * width;
      const perim = 2 * (length + width);
      result.innerHTML = `<p>Area: ${area.toFixed(2)}</p><p>Perimeter: ${perim.toFixed(2)}</p>`;
      drawRectangle(length, width);
    }
    function drawRectangle(length, width) {
      const canvas = document.getElementById("rectangleCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const maxDim = Math.max(length, width);
      const scale = (maxDim > 250) ? 250 / maxDim : 1;
      const drawLength = length * scale;
      const drawWidth = width * scale;
      const x = (canvas.width - drawLength) / 2;
      const y = (canvas.height - drawWidth) / 2;
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, drawLength, drawWidth);
    }

    /* --------- TRIANGLE --------- */
    function calcTriangle() {
      const a = parseFloat(document.getElementById("triA").value);
      const b = parseFloat(document.getElementById("triB").value);
      const c = parseFloat(document.getElementById("triC").value);
      const result = document.getElementById("triangleResult");
      if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
        result.innerHTML = "<p>Please enter valid positive numbers for all sides.</p>";
        return;
      }
      if (a + b <= c || a + c <= b || b + c <= a) {
        result.innerHTML = "<p>The entered values do not form a valid triangle.</p>";
        return;
      }
      const perim = a + b + c;
      const s = perim / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      result.innerHTML = `<p>Area: ${area.toFixed(2)} (Heron's formula)</p><p>Perimeter: ${perim.toFixed(2)}</p>`;
      drawTriangle(a, b, c);
    }
    function drawTriangle(a, b, c) {
      // Place vertex A at (0,0) and vertex B at (a,0). Compute vertex C using law of cosines.
      const canvas = document.getElementById("triangleCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cosA = (a*a + b*b - c*c) / (2*a*b);
      const angle = Math.acos(cosA);
      const Cx = b * Math.cos(angle);
      const Cy = b * Math.sin(angle);
      // Determine bounds to scale and center drawing.
      const xs = [0, a, Cx];
      const ys = [0, 0, Cy];
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const drawWidth = maxX - minX;
      const drawHeight = maxY - minY;
      const scale = Math.min(250 / drawWidth, 250 / drawHeight);
      // Translate points
      const pts = [
        { x: (0 - minX) * scale, y: (0 - minY) * scale },
        { x: (a - minX) * scale, y: (0 - minY) * scale },
        { x: (Cx - minX) * scale, y: (Cy - minY) * scale }
      ];
      // Center the drawing on canvas.
      const offsetX = (canvas.width - (drawWidth * scale)) / 2;
      const offsetY = (canvas.height - (drawHeight * scale)) / 2;
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x + offsetX, pts[0].y + offsetY);
      ctx.lineTo(pts[1].x + offsetX, pts[1].y + offsetY);
      ctx.lineTo(pts[2].x + offsetX, pts[2].y + offsetY);
      ctx.closePath();
      ctx.stroke();
    }

    /* --------- CIRCLE --------- */
    function calcCircle() {
      const r = parseFloat(document.getElementById("circleRadius").value);
      const result = document.getElementById("circleResult");
      if (isNaN(r) || r <= 0) {
        result.innerHTML = "<p>Please enter a valid positive radius.</p>";
        return;
      }
      const area = Math.PI * r * r;
      const circ = 2 * Math.PI * r;
      result.innerHTML = `<p>Area: ${area.toFixed(2)}</p><p>Circumference: ${circ.toFixed(2)}</p>`;
      drawCircle(r);
    }
    function drawCircle(r) {
      const canvas = document.getElementById("circleCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let scale = (r > 100) ? 100 / r : 1;
      const radius = r * scale;
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, radius, 0, Math.PI*2);
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    /* --------- TRAPEZOID --------- */
    function calcTrapezoid() {
      const base1 = parseFloat(document.getElementById("trapBase1").value);
      const base2 = parseFloat(document.getElementById("trapBase2").value);
      const side1 = parseFloat(document.getElementById("trapSide1").value);
      const side2 = parseFloat(document.getElementById("trapSide2").value);
      const height = parseFloat(document.getElementById("trapHeight").value);
      const result = document.getElementById("trapezoidResult");
      if (isNaN(base1) || base1 <= 0 || isNaN(base2) || base2 <= 0 ||
          isNaN(side1) || side1 <= 0 || isNaN(side2) || side2 <= 0 ||
          isNaN(height) || height <= 0) {
        result.innerHTML = "<p>Please enter valid positive numbers for all fields.</p>";
        return;
      }
      const area = ((base1 + base2) * height) / 2;
      const perim = base1 + base2 + side1 + side2;
      result.innerHTML = `<p>Area: ${area.toFixed(2)}</p><p>Perimeter: ${perim.toFixed(2)}</p>`;
      drawTrapezoid(base1, base2, height);
    }
    function drawTrapezoid(base1, base2, height) {
      const canvas = document.getElementById("trapezoidCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Assume an isosceles trapezoid for drawing.
      const offset = (base1 - base2) / 2;
      const pts = [
        { x: 0, y: height },
        { x: base1, y: height },
        { x: base1 - offset, y: 0 },
        { x: offset, y: 0 }
      ];
      // Scale to fit canvas
      const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const scale = Math.min((canvas.width - 20) / (maxX - minX), (canvas.height - 20) / (maxY - minY));
      for (let p of pts) {
        p.x = (p.x - minX) * scale;
        p.y = (p.y - minY) * scale;
      }
      // Center the drawing
      const offsetX = (canvas.width - (maxX - minX) * scale) / 2;
      const offsetY = (canvas.height - (maxY - minY) * scale) / 2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x + offsetX, pts[0].y + offsetY);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x + offsetX, pts[i].y + offsetY);
      }
      ctx.closePath();
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    /* --------- RHOMBUS --------- */
    function calcRhombus() {
      const d1 = parseFloat(document.getElementById("rhombusD1").value);
      const d2 = parseFloat(document.getElementById("rhombusD2").value);
      const result = document.getElementById("rhombusResult");
      if (isNaN(d1) || d1 <= 0 || isNaN(d2) || d2 <= 0) {
        result.innerHTML = "<p>Please enter valid positive values for both diagonals.</p>";
        return;
      }
      const area = (d1 * d2) / 2;
      const side = Math.sqrt(Math.pow(d1 / 2, 2) + Math.pow(d2 / 2, 2));
      const perim = 4 * side;
      result.innerHTML = `<p>Area: ${area.toFixed(2)}</p><p>Perimeter: ${perim.toFixed(2)}</p>`;
      drawRhombus(d1, d2);
    }
    function drawRhombus(d1, d2) {
      const canvas = document.getElementById("rhombusCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Scale writer: ensure d1 and d2 fit the canvas:
      const scale = Math.min((canvas.width - 20) / d1, (canvas.height - 20) / d2);
      const dx = d1 * scale, dy = d2 * scale;
      const cx = canvas.width / 2, cy = canvas.height / 2;
      const pts = [
        { x: cx, y: cy - dy/2 },
        { x: cx + dx/2, y: cy },
        { x: cx, y: cy + dy/2 },
        { x: cx - dx/2, y: cy }
      ];
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    /* --------- PARALLELOGRAM --------- */
    function calcParallelogram() {
      const base = parseFloat(document.getElementById("paraBase").value);
      const side = parseFloat(document.getElementById("paraSide").value);
      const height = parseFloat(document.getElementById("paraHeight").value);
      const result = document.getElementById("parallelogramResult");
      if (isNaN(base) || base <= 0 || isNaN(side) || side <= 0 || isNaN(height) || height <= 0) {
        result.innerHTML = "<p>Please enter valid positive numbers for all fields.</p>";
        return;
      }
      const area = base * height;
      const perim = 2 * (base + side);
      result.innerHTML = `<p>Area: ${area.toFixed(2)}</p><p>Perimeter: ${perim.toFixed(2)}</p>`;
      drawParallelogram(base, side, height);
    }
    function drawParallelogram(base, side, height) {
      const canvas = document.getElementById("parallelogramCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Compute horizontal offset using Pythagoras: offset = sqrt(side^2 - height^2)
      const offset = Math.sqrt(Math.max(0, side*side - height*height));
      const pts = [
        { x: 0, y: height },
        { x: base, y: height },
        { x: base - offset, y: 0 },
        { x: -offset, y: 0 }
      ];
      const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const scale = Math.min((canvas.width - 20) / (maxX - minX), (canvas.height - 20) / (maxY - minY));
      for (let p of pts) {
        p.x = (p.x - minX) * scale;
        p.y = (p.y - minY) * scale;
      }
      const offsetX = (canvas.width - (maxX - minX) * scale) / 2;
      const offsetY = (canvas.height - (maxY - minY) * scale) / 2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x + offsetX, pts[0].y + offsetY);
      pts.slice(1).forEach(p => ctx.lineTo(p.x + offsetX, p.y + offsetY));
      ctx.closePath();
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    /* --------- REGULAR POLYGON --------- */
    function calcRegularPolygon() {
      const n = parseInt(document.getElementById("polySides").value);
      const s = parseFloat(document.getElementById("polySideLength").value);
      const result = document.getElementById("regularPolygonResult");
      if (isNaN(n) || n < 3 || isNaN(s) || s <= 0) {
        result.innerHTML = "<p>Please enter a valid number of sides (≥3) and a positive side length.</p>";
        return;
      }
      const perim = n * s;
      const area = (n * s * s) / (4 * Math.tan(Math.PI / n));
      result.innerHTML = `<p>Area: ${area.toFixed(2)}</p><p>Perimeter: ${perim.toFixed(2)}</p>`;
      drawRegularPolygon(n, s);
    }
    function drawRegularPolygon(n, s) {
      const canvas = document.getElementById("regularPolygonCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Compute circumscribed radius: R = s / (2*sin(pi/n))
      const R = s / (2 * Math.sin(Math.PI / n));
      // To fit drawing into canvas, scale so that 2R fits into 80% of canvas dimension.
      const maxDrawing = Math.min(canvas.width, canvas.height) * 0.8;
      const scale = (R * 2 > maxDrawing) ? maxDrawing / (2 * R) : 1;
      const scaledR = R * scale;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i / n) - Math.PI / 2;
        const x = centerX + scaledR * Math.cos(angle);
        const y = centerY + scaledR * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
