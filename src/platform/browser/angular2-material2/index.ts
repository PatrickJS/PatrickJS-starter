import { MdAnchor, MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdProgressBar } from '@angular2-material/progress-bar';
import { MdProgressCircle, MdSpinner } from '@angular2-material/progress-circle';
import { MdRadioButton, MdRadioDispatcher, MdRadioGroup } from '@angular2-material/radio';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MdToolbar } from '@angular2-material/toolbar';

/*
 * we are grouping the module so we only need to manage the imports in one location
 */

export const MATERIAL_PIPES = [

];

export const MATERIAL_DIRECTIVES = [
  ...MD_SIDENAV_DIRECTIVES,
  ...[
    MdAnchor,
    MdButton,
    MdToolbar,
    MdCheckbox,
    MdRadioButton,
    MdRadioGroup,
    MdSpinner,
    MdProgressBar,
    MdProgressCircle
  ],
  ...MD_INPUT_DIRECTIVES,
  ...MD_LIST_DIRECTIVES,
  ...MD_CARD_DIRECTIVES
];

export const MATERIAL_PROVIDERS = [
  MdRadioDispatcher
];
