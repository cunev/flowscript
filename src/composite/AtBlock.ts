import { Block, BlockOutput } from "../primitives/block";
import { Vector } from "../primitives/math";

export class AtBlock extends Block {
  title: string = "At";
  position: Vector = { x: 20, y: 20 };
  size: Vector = { x: 80, y: 60 };
  color: string = "#9b59b6";
  acceptInput = true;

  value: BlockOutput = [];

  displayValue() {
    return JSON.stringify(this.value);
  }

  checkInput(block: Block): boolean {
    return true;
  }

  parseInput() {
    this.value = [];
    this.title = "At";
    const inputs = [...this.input.values()];
    if (inputs.length == 2 && inputs.at(1)!.value.length) {
      this.title = `At ${inputs.at(1)!.value[0] as number}`;
      this.value = [inputs.at(0)?.value[inputs.at(1)!.value[0] as number]!];
    }
  }
}
