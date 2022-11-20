import { Block, BlockOutput } from "../primitives/block";
import { Vector } from "../primitives/math";

export class ValueBlock extends Block {
  title: string = "Vector";
  position: Vector = { x: 20, y: 20 };
  size: Vector = { x: 80, y: 60 };
  color: string = "#e67e22";
  acceptInput = true;

  value: BlockOutput = [];

  displayValue() {
    return JSON.stringify(this.value);
  }

  parseInput() {
    this.value = [];
    for (const block of this.input) {
      this.value = [...this.value, ...block.value];
    }
  }
}
