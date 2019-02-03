import { SelectorType } from '../enums/selector-type.enum';
import { ElementTarget } from '../enums/element-target.enum';
import { NumberOfElements } from '../enums/number-of-elements.enum';

export class RobotScrapingSelector {
    selector: string;
    type: SelectorType;
    flags: string;
    rank: number;
    elementTarget: ElementTarget;
    numberOfElements: NumberOfElements;
}