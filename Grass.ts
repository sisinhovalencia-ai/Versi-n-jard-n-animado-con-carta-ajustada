export class Grass {
  container: HTMLElement;
  leaves: { el: HTMLElement; x: number }[] = [];

  constructor(elementId: string, numberOfLeaves: number = 80) {
    const app = document.getElementById(elementId);
    if (!app) throw new Error("No encontré el jardín (div app)");

    this.container = document.createElement("div");
    this.container.classList.add("long-g");
    app.appendChild(this.container);

    // Rayos de luz
    this.createLightRays(app);

    // Interacción mouse optimizada
    let ticking = false;

    window.addEventListener("mousemove", (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const cursorX = e.clientX / window.innerWidth;

          this.leaves.forEach((l) => {
            l.el.style.setProperty("--cursor-x", cursorX.toString());
          });

          ticking = false;
        });
        ticking = true;
      }
    });

    // Ajustar posiciones en resize
    window.addEventListener("resize", () => {
      this.leaves.forEach((l) => {
        const percent = parseFloat(l.el.style.left);
        l.x = (percent / 100) * window.innerWidth;
      });
    });

    this.plant(numberOfLeaves);
    this.addFireflies(20);
  }

  private createLightRays(app: HTMLElement) {
    const lightContainer = document.createElement("div");
    lightContainer.classList.add("lights");
    app.appendChild(lightContainer);

    const rayColors = ["#39ff14", "#662f56", "#00e5ff"];

    for (let i = 0; i < 3; i++) {
      const ray = document.createElement("div");
      ray.classList.add("light-ray");

      const positionX = i * 40 - 20;
      ray.style.setProperty("--l", `${positionX}%`);
      ray.style.setProperty("--gas-color", rayColors[i]);
      ray.style.animationDelay = `${i * -5}s`;

      lightContainer.appendChild(ray);
    }
  }

  private plant(count: number) {
    for (let i = 0; i < count; i++) {
      this.createLeaf();
    }
  }

  private createLeaf() {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf--2");

    const gases = ["#39ff14", "#662f56", "#00e5ff", "#ff007f", "#ffff33"];
    const randomGas = gases[Math.floor(Math.random() * gases.length)];
    leaf.style.setProperty("--gas-color", randomGas);

    const depth = Math.random();
    const posX = Math.random();

    leaf.style.left = `${posX * 100}%`;
    leaf.style.setProperty("--leaf-x", posX.toString());

    // Inicialización estable
    leaf.style.setProperty("--cursor-x", "0.5");

    this.leaves.push({
      el: leaf,
      x: posX * window.innerWidth,
    });

    const baseSize = 6 + depth * 8;
    leaf.style.setProperty("--w", `${baseSize}vmin`);

    leaf.style.zIndex = (Math.floor(depth * 100) + 10).toString();

    const brightness = 40 + depth * 60;
    leaf.style.filter = `brightness(${brightness}%)`;

    const growthDelay = Math.random() * 2;
    const swayDuration = 3 + Math.random() * 2;

    leaf.style.animationDuration = `1s, ${swayDuration}s`;
    leaf.style.animationDelay = `${growthDelay}s, -${Math.random() * 5}s`;

    this.container.appendChild(leaf);
  }

  private addFireflies(count: number) {
    const app = document.getElementById("app");

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      const isDust = Math.random() > 0.5;

      p.className = isDust ? "firefly dust" : "firefly";
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;

      const colors = ["#39ff14", "#662f56", "#00e5ff", "#ff007f"];
      p.style.setProperty(
        "--gas-color",
        colors[Math.floor(Math.random() * colors.length)]
      );

      p.style.animationDuration = isDust
        ? `${15 + Math.random() * 10}s`
        : `${5 + Math.random() * 5}s`;

      p.style.animationDelay = `${Math.random() * -20}s`;

      app?.appendChild(p);
    }
  }
}
