import dat from "dat.gui";
import { AtBlock } from "../composite/AtBlock";
import { ConstantBlock } from "../composite/ConstantBlock";
import { GateBlock } from "../composite/GateBlock";
import { LengthBlock } from "../composite/methods/LengthBlock";
import { EqualsBlock } from "../composite/operators/EqualsBlock";
import { GreaterBlock } from "../composite/operators/GreaterBlock";
import { LessBlock } from "../composite/operators/LessBlock";
import { MinusBlock } from "../composite/operators/MinusBlock";
import { PlusBlock } from "../composite/operators/PlusBlock";
import { PushBlock } from "../composite/PushBlock";
import { ReverseBlock } from "../composite/ReverseBlock";
import { SortBlock } from "../composite/SortBlock";
import { ValueBlock } from "../composite/ValueBlock";

const gui = new dat.GUI();

const primitiveObject = {
  associatedValue: "0",
  createConstantBlock: () => {
    new ConstantBlock(
      primitiveObject.associatedValue ==
      Number(primitiveObject.associatedValue).toString()
        ? Number(primitiveObject.associatedValue)
        : primitiveObject.associatedValue
    );
  },
};

const primitiveFolder = gui.addFolder("Primitives");
primitiveFolder.open();
primitiveFolder.add(primitiveObject, "associatedValue").name("Block Value");
primitiveFolder
  .add(primitiveObject, "createConstantBlock")
  .name("Constant Block");

const vectorObject = {
  createVectorBlock: () => {
    new ValueBlock();
  },
};
const vectorFolder = gui.addFolder("Vectors");
vectorFolder.open();
vectorFolder.add(vectorObject, "createVectorBlock").name("Vector Block");

const operationsObject = {
  createSortBlock: () => {
    new SortBlock();
  },
  createReverseBlock: () => {
    new ReverseBlock();
  },
  createLengthBlock: () => {
    new LengthBlock();
  },
  createAtBlock: () => {
    new AtBlock();
  },
  createPushBlock: () => {
    new PushBlock();
  },
  createGateBlock: () => {
    new GateBlock();
  },
};
const operationsFolder = gui.addFolder("Methods");
operationsFolder.open();
operationsFolder.add(operationsObject, "createSortBlock").name("Sort Block");
operationsFolder
  .add(operationsObject, "createReverseBlock")
  .name("Reverse Block");
operationsFolder
  .add(operationsObject, "createLengthBlock")
  .name("Length Block");
operationsFolder.add(operationsObject, "createAtBlock").name("At Block");
operationsFolder.add(operationsObject, "createGateBlock").name("Gate Block");
operationsFolder.add(operationsObject, "createPushBlock").name("Push Block");

const operatorsObject = {
  createEqualsBlock: () => {
    new EqualsBlock();
  },
  createGreaterBlock: () => {
    new GreaterBlock();
  },
  createLessBlock: () => {
    new LessBlock();
  },
  createPlusBlock: () => {
    new PlusBlock();
  },
  createMinusBlock: () => {
    new MinusBlock();
  },
};

const operatorsFolder = gui.addFolder("Operators");
operatorsFolder.open();
operatorsFolder.add(operatorsObject, "createPlusBlock").name("Plus Block");
operatorsFolder.add(operatorsObject, "createMinusBlock").name("Minus Block");
operatorsFolder.add(operatorsObject, "createEqualsBlock").name("Equals Block");
operatorsFolder
  .add(operatorsObject, "createGreaterBlock")
  .name("Greater Block");
operatorsFolder.add(operatorsObject, "createLessBlock").name("Less Block");
