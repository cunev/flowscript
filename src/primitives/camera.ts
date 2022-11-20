import { Vector } from "./math";
import { p } from "./p5";

export class Camera {
  static position: Vector = { x: 100, y: 0 };
  private static acceleration: Vector = { x: 0, y: 0 };

  static update() {
    if (!(this.acceleration.x || this.acceleration.y)) return;
    this.position.x += this.acceleration.x / 2;
    this.position.y += this.acceleration.y / 2;
  }

  static get mouseX() {
    return p.mouseX - Camera.position.x;
  }

  static get mouseY() {
    return p.mouseY - Camera.position.y;
  }

  static translateXBy(delta: number) {
    Camera.acceleration.x += delta;
  }

  static translateYBy(delta: number) {
    Camera.acceleration.y += delta;
  }
}
