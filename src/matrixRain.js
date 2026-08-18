export function matrixRainCode() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890*+-<>".split("");

  // 🌟 LAYER CONFIGURATION (Font size and custom green hues for real 3D depth)
  const layerBackground = { fontSize: 10, color: "#003800" }; // Tiny, dark, far away
  const layerMidground  = { fontSize: 16, color: "#009900" }; // Standard Matrix look
  const layerForeground = { fontSize: 24, color: "#00FF00" }; // Big, ultra-bright neon front

  // Calculate exactly how many columns fit on the screen for each independent layer
  const colsBg = Math.floor(canvas.width / layerBackground.fontSize);
  const colsMd = Math.floor(canvas.width / layerMidground.fontSize);
  const colsFg = Math.floor(canvas.width / layerForeground.fontSize);

  // 🌟 INITIALIZE INDEPENDENT ARRAYS
  // We populate each layer with random starting vertical grid positions (Y rows)
  const dropsBg = Array(colsBg).fill(1).map(() => Math.random() * -100);
  const dropsMd = Array(colsMd).fill(1).map(() => Math.random() * -100);
  const dropsFg = Array(colsFg).fill(1).map(() => Math.random() * -100);

  let lastTime = 0;
  const fps = 30; // 30 FPS for a cinematic digital stream feel
  const frameInterval = 1000 / fps;
  let animationFrameId;

  // Dedicated rendering helper to draw a single independent layer matrix
  function drawLayer(dropsArray, config, isFrontLayer) {
    ctx.font = config.fontSize + "px monospace";

    for (let i = 0; i < dropsArray.length; i++) {
      // Choose a random character from the Katakana/symbol catalog
      const text = chars[Math.floor(Math.random() * chars.length)];
      
      // Calculate fixed X position based on the column index and font size
      const x = i * config.fontSize;
      // Convert the row counter into actual screen pixel height coordinate
      const y = Math.floor(dropsArray[i]) * config.fontSize;

      // 4% chance to make the leading character glow in white (only for mid and foreground)
      if (Math.random() > 0.96 && isFrontLayer) {
        ctx.fillStyle = "#FFFFFF";
      } else {
        ctx.fillStyle = config.color;
      }

      // Render the letter on screen only if it has entered visible vertical bounds
      if (y >= 0 && y <= canvas.height) {
        ctx.fillText(text, x, y);
      }

      // GLITCH MODULE: 1.5% chance to morph an older standing character on this column
      if (Math.random() > 0.985 && y > 0) {
        ctx.fillStyle = config.color;
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        const randomY = Math.floor(Math.random() * Math.floor(dropsArray[i])) * config.fontSize;
        ctx.fillText(randomChar, x, randomY);
      }

      // Progress stream downward. Background moves slow, foreground moves fast
      if (config.fontSize === 10)  dropsArray[i] += 0.35; // Background speed
      if (config.fontSize === 16)  dropsArray[i] += 0.65; // Midground speed
      if (config.fontSize === 24)  dropsArray[i] += 1.10; // Foreground speed

      // Reset column back to the top once it fully clears the bottom of the screen
      if (y > canvas.height && Math.random() > 0.975) {
        dropsArray[i] = Math.random() * -10; // Staggered negative re-entry row
      }
    }
  }

  function draw() {
    // Semi-transparent black overlay to control phosphor trail persistence lengths
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 🌟 RENDER LAYERS IN BACK-TO-FRONT ORDER
    // This strictly ensures big text always paints on top of smaller background text
    drawLayer(dropsBg, layerBackground, false); // Draw background matrix first
    drawLayer(dropsMd, layerMidground,  true);  // Draw standard midground matrix second
    drawLayer(dropsFg, layerForeground, true);  // Draw giant foreground matrix last
  }

  // Hardware synchronized delta-time loop engine
  function animate(time) {
    if (time - lastTime >= frameInterval) {
      draw();            
      lastTime = time;   
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  animate(0);
}