import { Block, BlockOutput } from "../../primitives/block";
import { Vector } from "../../primitives/math";

export class LengthBlock extends Block {
  title: string = "Length";
  position: Vector = { x: 20, y: 20 };
  size: Vector = { x: 80, y: 60 };
  color: string = "#e67e22";
  acceptInput = true;

  value: BlockOutput = [0];

  displayValue() {
    return this.value[0].toString();
  }

  parseInput() {
    this.value = [];
    for (const block of this.input) {
      this.value = [...this.value, ...block.value];
    }

    this.value = [this.value.length];
  }
}
