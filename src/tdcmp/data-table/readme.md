# MdDataTable
MdDataTable is an enhancment of classic data tables.

## Basic data table
### Classes
| Name | Target | Description |
| --- | --- | --- |
| md-data-table | table | Style table, without using md-data-table component |
| sortable | th | mark column as sortable |
| sorted-ascending | th | mark column as sorted ascending |
| sorted-descending | th | mark column as sorted descending |
| md-text-cell | thead th, tbody td | Declare a cell as non-numeric and left align its text. |

## Selectable data table
### Properties
| Name | Target | Type | Description |
| --- | --- | --- | --- |
| selectable | md-data-table | boolean | Enable listeners to children's checkbox.   

### Events
| Name | Description |
| --- | --- |
| onSelectableChange | Emitted when the user select or unselect a row |

## Selectable header row
### Properties
| Name | Target | Type | Description |
| --- | --- | --- | --- |
| md-data-table-header-selectable-row | thead tr | boolean | Enable the master checkbox on header. |

### Events
| Name | Description |
| --- | --- |
| onChange | Emitted when the user check or uncheck the master checkbox |

## Selectable header row
### Properties
| Name | Target | Type | Description |
| --- | --- | --- | --- |
| md-data-table-selectable-row | tbody tr | boolean | Enable a checkbox for this row. |
| selectable-value | tbody tr | string | value of the checkbox. If it's not set the checkbox's value will be the index of the row. |

### Events
| Name | Description |
| --- | --- |
| onChange | Emitted when the user check or uncheck the checkbox |

## Examples
```
<md-data-table [selectable]="true">
  <thead>
  <tr md-data-table-header-selectable-row>
    <th class="md-text-cell">Material</th>
    <th>Quantity</th>
    <th>Unit price</th>
  </tr>
  </thead>
  <tbody>
  <tr *ngFor="let material of materials"  md-data-table-selectable-row [selectable-value]="material.id">
    <td class="md-text-cell">{{ material.name }}</td>
    <td>{{ material.quantity }}</td>
    <td>{{ material.price }}</td>
  </tr>
  </tbody>
</md-data-table>
```
