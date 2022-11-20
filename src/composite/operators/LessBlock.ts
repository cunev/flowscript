import { Block, BlockOutput } from "../../primitives/block";
import { Vector } from "../../primitives/math";

export class LessBlock extends Block {
  title: string = "Less";
  position: Vector = { x: 20, y: 20 };
  size: Vector = { x: 80, y: 60 };
  color: string = "#2ecc71";
  acceptInput = true;

  value: BlockOutput = [true];
  description = "";

  displayValue() {
    return this.value[0].toString();
  }

  checkInput(block: Block): boolean {
    return block.value.length == 1;
  }

  parseInput() {
    this.description = "";
    if (this.input.size < 2) {
      this.value = [true];
      return;
    }
    this.acceptInput = this.input.size != 2;
    const inputs = [...this.input.values()];
    this.value = [inputs[0].value[0] < inputs[1].value[0]];
  }
}
