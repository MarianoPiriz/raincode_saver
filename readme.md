# 3D Matrix Digital Rain 

A high-density, high-performance, and visually accurate replication of the iconic **Matrix Digital Rain** effect, using Vanilla JavaScript and HTML5 Canvas.

## 🚀 Features
* **True 3D Depth:** Three completely independent rendering layers (Background, Midground, Foreground) with scaled font sizes, custom opacities, falling speeds, and proper depth sorting.
* **Massive Density:** Independent horizontal grids prevent column alignment locking, creating a dense, organic stream overflow with no unnatural black corridors.
* **Dynamic Glitch Engine:** Randomized character morphing occurs in real-time on active columns before they fade, emulating heavy data stream transfers.
* **Battery & Hardware Efficient:** Driven by `requestAnimationFrame` paired with delta-time throttling, ensuring stable frame rates while dramatically reducing CPU usage when the Mac screen sleeps.

---

## 💻 Code Walkthrough (Line-by-Line Explanation)

Below is the exhaustive, line-by-line breakdown of the core modularized JavaScript animation logic (`matrix.js`):

### 1. Canvas Setup & Responsiveness

```javascript
export function matrixRainCode() {
```
* Declares and exports the main function so it can be cleanly imported and initialized inside your main entry point script (`main.js`).

```javascript
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
```
* Queries the HTML DOM to find the `<canvas>` element using its unique ID. If the element is missing, it safely exits the function to prevent script runtime crashes.

```javascript
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
```
* Initializes the 2D rendering context on the canvas which unlocks the drawing APIs. If the browser or environment fails to load it, execution safely halts.

```javascript
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
```
* Defines an internal utility function that stretches the canvas dimensions to match 100% of the Mac's screen width (`innerWidth`) and height (`innerHeight`).

```javascript
  window.addEventListener('resize', resize);
  resize();
```
* Registers a global event listener so that if the screen resolution changes, the canvas resizes instantly. It then invokes `resize()` immediately once to set up the startup layout size.

```javascript
  const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890*+-<>".split("");
```
* Takes a raw string containing the classic ciberpunk half-width Japanese Katakana characters, numbers, and mathematical symbols, and splits it into a highly accessible index array of individual letters.

---

### 2. Multi-Layer 3D Architecture

```javascript
  const layerBackground = { fontSize: 10, color: "#003800" };
  const layerMidground  = { fontSize: 16, color: "#009900" };
  const layerForeground = { fontSize: 24, color: "#00FF00" };
```
* Configures three deep structural configuration schemas. Each layer features hardcoded variations in font sizing and green hex values (dark green for distance, neon green for close proximity) to trick the human brain into registering organic 3D depth perception.

```javascript
  const colsBg = Math.floor(canvas.width / layerBackground.fontSize);
  const colsMd = Math.floor(canvas.width / layerMidground.fontSize);
  const colsFg = Math.floor(canvas.width / layerForeground.fontSize);
```
* Mathematical column division. Because the background layer uses tiny text (`10px`), it calculates a massive volume of columns (`colsBg`) compared to the foreground layer (`24px`), successfully saturating pitch-black areas of the monitor.

```javascript
  const dropsBg = Array(colsBg).fill(1).map(() => Math.random() * -100);
  const dropsMd = Array(colsMd).fill(1).map(() => Math.random() * -100);
  const dropsFg = Array(colsFg).fill(1).map(() => Math.random() * -100);
```
* Instantiates three separate numerical timeline tracking arrays. Every index represents the current active row (Y-axis coordinate) for that column. Initializing them with negative randomized bounds forces rain streams to start far above the viewport ceiling, creating a highly natural staggered stream entrance instead of falling down all at once.

```javascript
  let lastTime = 0;
  const fps = 30; 
  const frameInterval = 1000 / fps;
  let animationFrameId;
```
* Declares chronological animation anchors. The `frameInterval` establishes that exactly ~33.3ms must elapse between rendering triggers, capping runtime execution to a highly cinematic, ultra-stable 30 frames per second.

---

### ⚙️ 3. Layer Matrix Rendering Engine

```javascript
  function drawLayer(dropsArray, config, isFrontLayer) {
    ctx.font = config.fontSize + "px monospace";
```
* A highly optimized rendering function capable of drawing a whole independent depth layout layer. It begins by updating the active canvas text brush with the target font size specifications.

```javascript
    for (let i = 0; i < dropsArray.length; i++) {
```
* Standard loop iteration cycling through every single independent column entry belonging to the designated layer array.

```javascript
      const text = chars[Math.floor(Math.random() * chars.length)];
```
* Performs high-speed pseudo-random calculations to pick one individual code character from the pre-defined glyph library.

```javascript
      const x = i * config.fontSize;
      const y = Math.floor(dropsArray[i]) * config.fontSize;
```
* Precise hardware grid placement math:
  * `x`: Multiplies the current index by the layer's specific font size to draw perfectly straight parallel lines down the viewport.
  * `y`: Floors the decimal floating row value into an absolute integer before scaling it by the font size. This prevents characters from rendering blurred or overlapping horizontally.

```javascript
      if (Math.random() > 0.96 && isFrontLayer) {
        ctx.fillStyle = "#FFFFFF";
      } else {
        ctx.fillStyle = config.color;
      }
```
* Head glow logic condition. If a stream is operating in the Mid or Foreground layouts (`isFrontLayer`) and clears a 4% probability dice roll, the active brush transforms into crisp **solid white** (`#FFFFFF`). Otherwise, it defaults back to its assigned layer hue.

```javascript
      if (y >= 0 && y <= canvas.height) {
        ctx.fillText(text, x, y);
      }
```
* Draws the character string physically on the canvas layout frame, executing the command **only if** the text has crossed below the top ceiling (Y >= 0) and has not exited beyond the screen's bottom resolution floor.

```javascript
      if (Math.random() > 0.985 && y > 0) {
        ctx.fillStyle = config.color;
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        const randomY = Math.floor(Math.random() * Math.floor(dropsArray[i])) * config.fontSize;
        ctx.fillText(randomChar, x, randomY);
      }
```
* **The Glitch/Mutation Module:** Features a 1.5% activation rate per column per frame. It selects a random character and draws it over a historical vertical coordinate row (`randomY`) previously mapped by the stream head. This creates the flickering data morphing behavior seen in the films.

```javascript
      if (config.fontSize === 10)  dropsArray[i] += 0.35;
      if (config.fontSize === 16)  dropsArray[i] += 0.65;
      if (config.fontSize === 24)  dropsArray[i] += 1.10;
```
* Distance speed physics throttling. In each frame, it moves the stream head downward by adding floating-point increments to its row index. Background layers crawl forward slowly (`0.35`), standard midgrounds run at average speed (`0.65`), while the foreground elements dive fast across the view frame (`1.10`).

```javascript
      if (y > canvas.height && Math.random() > 0.975) {
        dropsArray[i] = Math.random() * -10;
      }
    }
  }
```
* Boundary overflow safety reset. Once a column's head pixel height fully clears the monitor screen baseline (`canvas.height`) and clears a 2.5% random chance, its tracker resets back to a negative space above the screen roof to loop smoothly indefinitely.

---

### 🎞️ 4. The Unified Draw Loop & Clock

```javascript
  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
```
* Phosphor green decay mechanism. At the start of every frame, it draws a solid black rectangle with a **6% alpha opacity** across the screen. This slowly masks older characters frame-by-frame instead of erasing them outright, leaving the glowing trail decay signature.

```javascript
    drawLayer(dropsBg, layerBackground, false);
    drawLayer(dropsMd, layerMidground,  true);
    drawLayer(dropsFg, layerForeground, true);
  }
```
* Triggers the drawing modules enforcing strict **Back-to-Front painter's algorithm sorting**. Rendering the dark background first, midground second, and bright foreground last mathematically guarantees that giant letters always pass seamlessly in front of smaller distant text.

```javascript
  function animate(time) {
    if (time - lastTime >= frameInterval) {
      draw();            
      lastTime = time;   
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  animate(0);
}
```
* Delta-time frame loop clock. Evaluates incoming system millisecond timestamps (`time`). If the required time window has elapsed, it refreshes `draw()` and updates the reference clock anchor. Finally, it enqueues the next hardware refresh step via `requestAnimationFrame` for a tear-free user experience.
