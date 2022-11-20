import { Block, BlockOutput } from "../primitives/block";
import { Vector } from "../primitives/math";

export class ReverseBlock extends Block {
  title: string = "Reverse";
  position: Vector = { x: 20, y: 20 };
  size: Vector = { x: 80, y: 60 };
  color: string = "#9b59b6";
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
    this.value.reverse();
  }
}
