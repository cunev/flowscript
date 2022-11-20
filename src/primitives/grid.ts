import { Camera } from "./camera";
import { p } from "./p5";

export function drawGrid() {
  p.push();
  p.stroke(200);
  const xRate = p.windowWidth / 30;
  for (let i = 0; i < xRate; i++) {
    p.line(
      i * 30 + (Camera.position.x % 30),
      0,
      i * 30 + (Camera.position.x % 30),
      p.windowHeight
    );
  }

  const yRate = p.windowHeight / 30;
  for (let i = 0; i < yRate; i++) {
    p.line(
      0,
      i * 30 + (Camera.position.y % 30),
      p.windowWidth,
      i * 30 + (Camera.position.y % 30)
    );
  }
  p.pop();
}
