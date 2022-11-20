import { Block, BlockOutput } from "../../primitives/block";
import { Vector } from "../../primitives/math";

export class MinusBlock extends Block {
  title: string = "Minus";
  position: Vector = { x: 20, y: 20 };
  size: Vector = { x: 80, y: 60 };
  color: string = "#2ecc71";
  acceptInput = true;

  value: BlockOutput = [0];
  description = "";

  displayValue() {
    return this.value[0].toString();
  }

  checkInput(block: Block): boolean {
    return block.value.length == 1 && typeof block.value[0] == "number";
  }

  parseInput() {
    this.description = "";
    if (this.input.size < 2) {
      this.value = [0];
      return;
    }
    this.acceptInput = this.input.size != 2;
    const inputs = [...this.input.values()];
    this.value = [
      (inputs[0].value[0] as number) - (inputs[1].value[0] as number),
    ];
  }
}
