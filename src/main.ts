import './style.scss';
import { Grass } from './logic/Grass';

// Inicializamos el jardín
// 'app' es el ID del div, y 60 es el número de hojas.
// ¡Prueba cambiando el 60 por 100 o 200 si quieres más densidad!
const myGarden = new Grass('app', 100);

console.log('Jardín plantado 🌿');