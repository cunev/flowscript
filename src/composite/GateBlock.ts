import { Block, BlockOutput } from "../primitives/block";
import { Vector } from "../primitives/math";

export class GateBlock extends Block {
  title: string = "Gate";
  position: Vector = { x: 20, y: 20 };
  size: Vector = { x: 80, y: 34 };
  color: string = "#9b59b6";
  acceptInput = true;

  value: BlockOutput = [];

  displayValue() {
    return "";
  }

  checkInput(block: Block): boolean {
    return true;
  }

  parseInput() {
    if (this.input.size < 2) {
      this.value = [true];
      return;
    }
    this.acceptInput = this.input.size != 2;
    const inputs = [...this.input.values()];
    if (inputs[0].value[0]) {
      this.value = [inputs[1].value[0]];
    } else {
      this.value = [];
    }
  }
}
