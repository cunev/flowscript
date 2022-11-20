import p5 from "p5";
import { Key } from "ts-keycode-enum";
import { ConstantBlock } from "./composite/ConstantBlock";
import { LengthBlock } from "./composite/methods/LengthBlock";
import { EqualsBlock } from "./composite/operators/EqualsBlock";
import { ReverseBlock } from "./composite/ReverseBlock";
import { SortBlock } from "./composite/SortBlock";
import { ValueBlock } from "./composite/ValueBlock";
import { Block } from "./primitives/block";
import { Camera } from "./primitives/camera";
import { drawGrid } from "./primitives/grid";
import { p, setP } from "./primitives/p5";
import "./style.css";
import "./primitives/gui";

export const _app = new p5((p5Instance) => {
  setP(p5Instance);

  p.setup = function setup() {
    p.createCanvas(this.windowWidth, this.windowHeight);
    p.frameRate(120);
  };

  p.draw = function draw() {
    p.background(255);
    drawGrid();
    Camera.update();
    p.translate(Camera.position.x, Camera.position.y);
    Block.all.forEach((block) => {
      block.draw();
      block.parseInput();
      block.mouseMove();
    });
  };

  p.mousePressed = () => {
    Block.all.forEach((block) => {
      block.mousePressed();
    });
  };
  p.mouseReleased = () => {
    Block.all.forEach((block) => {
      block.mouseReleased();
    });
  };
  p.keyPressed = () => {
    switch (p.keyCode) {
      case Key.C:
        return;
      case Key.W:
        Camera.translateYBy(10);
        return;
      case Key.A:
        Camera.translateXBy(10);
        return;
      case Key.S:
        Camera.translateYBy(-10);
        return;
      case Key.D:
        Camera.translateXBy(-10);
        return;
    }
  };
  p.keyReleased = () => {
    switch (p.keyCode) {
      case Key.W:
        Camera.translateYBy(-10);
        return;
      case Key.A:
        Camera.translateXBy(-10);
        return;
      case Key.S:
        Camera.translateYBy(10);
        return;
      case Key.D:
        Camera.translateXBy(10);
        return;
    }
  };
}, document.getElementById("app")!);
