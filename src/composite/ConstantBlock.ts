import { Block, BlockOutput } from "../primitives/block";
import { Vector } from "../primitives/math";

export class ConstantBlock extends Block {
  title: string = "Constant";
  position: Vector = { x: 20, y: 20 };
  size: Vector = { x: 80, y: 60 };
  color: string = "#3498db";
  acceptInput = false;

  value: BlockOutput = [2];

  constructor(value?: number | string | boolean) {
    super();
    this.value = [value ? value : 0];
  }

  displayValue() {
    return JSON.stringify(this.value[0]);
  }

  parseInput() {}
}
