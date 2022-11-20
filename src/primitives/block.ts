import { Camera } from "./camera";
import { Vector } from "./math";
import { p } from "./p5";
import { Key } from "ts-keycode-enum";

export type BlockOutput = (number | boolean | string)[];

export abstract class Block {
  static all = new Set<Block>();

  abstract position: Vector;
  abstract size: Vector;
  abstract color: string;
  abstract title: string;

  protected mouseOver: boolean = false;

  protected inDrag: boolean = false;
  protected dragDeltaPosition: Vector = { x: 0, y: 0 };

  protected inTie: boolean = false;

  protected input: Set<Block> = new Set();
  protected output: Set<Block> = new Set();
  abstract value: BlockOutput;

  lastModified: number = 0;

  constructor() {
    Block.all.add(this);
  }

  abstract acceptInput: boolean;
  abstract displayValue(): string;
  abstract parseInput(): void;

  draw() {
    p.push();
    p.strokeWeight(3);

    if (this.inDrag) {
      this.position = {
        x: Camera.mouseX + this.dragDeltaPosition.x,
        y: Camera.mouseY + this.dragDeltaPosition.y,
      };
    }

    if (this.inTie) {
      p.line(
        this.position.x + this.size.x / 2,
        this.position.y + this.size.y / 2,
        Camera.mouseX,
        Camera.mouseY
      );
    }

    this.drawTies();

    p.textSize(16);
    const dval = this.displayValue();
    const tw1 = p.textWidth(this.title);
    p.textSize(24);
    const tw2 = p.textWidth(dval);

    this.size.x = Math.max(tw1, tw2) + 20;

    p.fill(this.color);
    p.rect(this.position.x, this.position.y, this.size.x, this.size.y, 3);

    p.textAlign(p.LEFT, p.TOP);
    p.fill("white");
    p.strokeWeight(2);
    p.stroke("black");
    p.textSize(16);
    p.text(this.title, this.position.x + 10, this.position.y + 10);
    p.textSize(24);
    p.strokeWeight(3);

    p.text(dval, this.position.x + 10, this.position.y + 30);
    p.pop();
  }

  mouseMove() {
    this.mouseOver =
      Camera.mouseX > this.position.x &&
      Camera.mouseX < this.position.x + this.size.x &&
      Camera.mouseY > this.position.y &&
      Camera.mouseY < this.position.y + this.size.y;
  }

  mousePressed() {
    if (this.mouseOver) {
      if (p.keyIsPressed && p.keyCode == Key.Ctrl) {
        Block.all.forEach((block) => (block.inTie = false));
        this.inTie = true;
      } else {
        Block.all.forEach((block) => (block.inDrag = false));
        this.lastModified = Date.now();
        this.inDrag = true;
        this.dragDeltaPosition = {
          x: this.position.x - Camera.mouseX,
          y: this.position.y - Camera.mouseY,
        };
      }
    }
  }
  mouseReleased() {
    if (this.inTie) {
      for (const block of Block.all) {
        if (block !== this && block.mouseOver && block.acceptInput) {
          if (!block.input.has(this) && block.checkInput(this))
            block.input.add(this);
          this.output.add(block);

          break;
        }
      }
    }
    this.inDrag = false;
    this.inTie = false;
  }

  drawTies() {
    p.noFill();
    const abtw = (x1: number, y1: number, x2: number, y2: number) =>
      Math.atan2(y2 - y1, x2 - y1) * (180 / p.PI);

    let index = 0;
    for (const block of this.input) {
      index++;
      const ang =
        (p.atan2(
          block.position.y - this.position.y,
          block.position.x - this.position.x
        ) *
          180) /
        p.PI;

      let xdist = Math.abs(this.position.x - block.position.x) / 2;
      let ydist = Math.abs(this.position.y - block.position.y) / 2;

      let bPoints = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        x3: 0,
        y3: 0,
        x4: 0,
        y4: 0,
      };
      if (ang > 45 && ang < 135) {
        bPoints = {
          x1: this.position.x + this.size.x / 2,
          y1: this.position.y + this.size.y,
          x2: this.position.x + this.size.x / 2,
          y2: this.position.y + this.size.y + ydist,
          x3: block.position.x + block.size.x / 2,
          y3: block.position.y - ydist,
          x4: block.position.x + block.size.x / 2,
          y4: block.position.y,
        };
      } else if ((ang > 135 && ang <= 180) || (ang < -135 && ang >= -180)) {
        bPoints = {
          x1: this.position.x,
          y1: this.position.y + this.size.y / 2,
          x2: this.position.x - xdist,
          y2: this.position.y + this.size.y / 2,
          x3: block.position.x + block.size.x + xdist,
          y3: block.position.y + block.size.y / 2,
          x4: block.position.x + block.size.x,
          y4: block.position.y + block.size.y / 2,
        };
      } else if (ang < 45 && ang > -45) {
        bPoints = {
          x1: this.position.x + this.size.x,
          y1: this.position.y + this.size.y / 2,
          x2: this.position.x + this.size.x + xdist,
          y2: this.position.y + this.size.y / 2,
          x3: block.position.x - xdist,
          y3: block.position.y + block.size.y / 2,
          x4: block.position.x,
          y4: block.position.y + block.size.y / 2,
        };
      } else if (ang < -45 && ang > -135) {
        bPoints = {
          x1: this.position.x + this.size.x / 2,
          y1: this.position.y,
          x2: this.position.x + this.size.x / 2,
          y2: this.position.y - ydist,
          x3: block.position.x + block.size.x / 2,
          y3: block.position.y + block.size.y + ydist,
          x4: block.position.x + block.size.x / 2,
          y4: block.position.y + block.size.y,
        };
      }
      p.bezier(
        bPoints.x1,
        bPoints.y1,
        bPoints.x2,
        bPoints.y2,
        bPoints.x3,
        bPoints.y3,
        bPoints.x4,
        bPoints.y4
      );
      const x = p.bezierPoint(
        bPoints.x1,
        bPoints.x2,
        bPoints.x3,
        bPoints.x4,
        0.49
      );
      const y = p.bezierPoint(
        bPoints.y1,
        bPoints.y2,
        bPoints.y3,
        bPoints.y4,
        0.49
      );
      const x1 = p.bezierPoint(
        bPoints.x1,
        bPoints.x2,
        bPoints.x3,
        bPoints.x4,
        0.55
      );
      const y1 = p.bezierPoint(
        bPoints.y1,
        bPoints.y2,
        bPoints.y3,
        bPoints.y4,
        0.55
      );

      const vang = Math.atan2(y1 - y, x1 - x) + Math.PI / 2;
      p.push();
      // p.strokeWeight(2);
      p.translate(x, y);
      p.fill(255);
      p.rotate(vang);
      p.triangle(-12, 0, 12, 0, 0, 25);

      p.pop();
      p.textAlign(p.CENTER, p.CENTER);
      p.stroke(2);
      p.fill("white");
      p.text(
        index,
        x + 8 * Math.cos(vang + Math.PI / 2),
        y + 8 * Math.sin(vang + Math.PI / 2)
      );
      p.noFill();
    }
  }

  checkInput(block: Block) {
    return true;
  }
}
