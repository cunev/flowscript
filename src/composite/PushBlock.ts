import { Block, BlockOutput } from "../primitives/block";
import { Vector } from "../primitives/math";

export class PushBlock extends Block {
  title: string = "Push";
  position: Vector = { x: 20, y: 20 };
  size: Vector = { x: 80, y: 34 };
  color: string = "#9b59b6";
  acceptInput = true;

  value: BlockOutput = [];

  triggerThread = false;

  displayValue() {
    return "";
  }

  checkInput(block: Block): boolean {
    return true;
  }

  parseInput() {
    if (this.triggerThread) {
      this.triggerThread = false;
      throw "Done";
    }
    if (this.input.size == 1 && this.output.size == 1) {
      const input = [...this.input.values()][0];
      this.value = [...this.value, ...input.value];
      this.triggerThread = true;
      try {
        for (const block of Block.all) {
          block.parseInput();
        }
      } catch (error) {}
    }
  }
}
