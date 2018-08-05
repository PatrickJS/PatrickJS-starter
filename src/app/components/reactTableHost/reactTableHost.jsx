import _ from 'lodash';
import React from 'react';
import { ReactDOM } from 'react-dom';
import ReactTable from 'react-table';

import checkboxHOC from 'react-table/lib/hoc/selectTable';
import CBReactTablePagination from './pagination.jsx';

const CheckboxTable = checkboxHOC(ReactTable),

    _buildCustomCellTemplate = (cellSchemaFn) => {
        return (row) => {
            const cellConfig = cellSchemaFn(row.original);

            if (_.isArray(cellConfig)) {
                const listItems = _.map(cellConfig, (item) =>
                    (<button
                        id={ item.id || 'buttonId'}
                        className={ item.icon }
                        onClick={ item.action }
                        disabled={ item.isDisabled }
                        type='button'
                        title={ item.tooltip }
                    ></button>)
                );

                return (<span>{ listItems }</span>)
            } else {
                return (<span dangerouslySetInnerHTML={{__html: cellConfig}} />)
            }
        }
    },

    remapColumns = (columns) => {
        const legacyPropertyMap = {
                name: 'Header',
                prop: 'accessor',
                cellRenderer: 'Cell'
            };

        return _.map(columns, (col) => {
            const column = {};

            _.forEach(col, (colPropValue, colPropkey) => {
                colPropkey = legacyPropertyMap[colPropkey] || colPropkey;

                if (colPropkey === 'Cell') {
                    column[colPropkey] = _buildCustomCellTemplate(colPropValue);
                } else {
                    column[colPropkey] = colPropValue;
                }
            });

            return column;
        });
    };

export class ReactTableHost extends React.Component {
    constructor() {
        super();

        this.state = {
            columns: [],
            data: [],
            selection: [],
            selectAll: false
        };

        this.isSelected = (key) => {
            return _.includes(this.state.selection, key);
        };

        this.selectionChanged = (selection, selectAll) => {
            const onSelectionChangeCallBackFn = _.get(this, 'props.onSelectionChange');

            this.setState({ selection, selectAll });

            if (_.isFunction(onSelectionChangeCallBackFn)) {
                onSelectionChangeCallBackFn(selection);
            }
        };

        this.toggleSelection = (key, shift, row) => {
            let selection = [...this.state.selection],
                toggleAll = this.state.toggleAll;
            const keyIndex = selection.indexOf(key);

            if (this.props.selectType === 'checkbox') {

                if (keyIndex < 0) {
                    selection.push(key);
                } else {
                    selection = [
                        ...selection.slice(0, keyIndex),
                        ...selection.slice(keyIndex + 1)
                    ];
                }

                toggleAll = selection.length === this.state.data.length;

                this.selectionChanged(selection, toggleAll);

            } else if (keyIndex < 0 || (this.props.selectType === 'radio' && selection.length > 1)) {
                selection = [key];

                this.selectionChanged(selection);
            }
        };

        this.toggleAll = () => {
            const selectAll = this.state.selectAll ? false : true,
                selection = [];

            if (selectAll) {
                const wrappedInstance = this.checkboxTable.getWrappedInstance(),
                    currentRecords = wrappedInstance.getResolvedState().sortedData;

                currentRecords.forEach(item => {
                    selection.push(item._original[this.props.options.keyField]);
                });
            }

            this.selectionChanged(selection, selectAll);
        };
    }

    setPresetSelections(nextProps) {
        let presetSelections = null;

        if (nextProps.selected && _.isObjectLike(nextProps.selected[0])) {
            presetSelections = _.map(nextProps.selected, (row) => (
                row[nextProps.options.keyField]
            ))
        } else {
            presetSelections = nextProps.selected;
        }

        this.setState({ selection: presetSelections });
    }

    componentWillReceiveProps(nextProps) {
        const columns = remapColumns(_.get(nextProps, 'options.columns')),
            data = _.get(nextProps, 'data');

        this.setState({ columns, data });

        this.setPresetSelections(nextProps);
    }

    render() {
        const { toggleSelection, toggleAll, isSelected } = this,
            { selectAll, columns, data, selection } = this.state,
            mapSelectableProps = {
                selectAll,
                isSelected,
                toggleSelection,
                toggleAll,
                selectType: this.props.selectType || 'checkbox',
                getTrProps: (state, row) => {
                    const selected = row ? this.isSelected(row.original[this.props.options.keyField]) : false;

                    return {
                        onClick: (e) => {
                            this.toggleSelection(row.original[this.props.options.keyField]);
                        },
                        className: selected ? 'selected' : ''
                    };
                }
            },
            isSelectable = this.props.selectType ? true : false,
            mapOptionsToProps = _.omit(_.get(this, 'props.options'), 'columns');

        if (isSelectable && !this.props.options.keyField) {
            console.log('Selected Row properties are set but no keyField is specified.');
        }

        return isSelectable ? (<div>
                                <CheckboxTable
                                    PaginationComponent={CBReactTablePagination}
                                    className='standard-table'
                                    columns={ _.get(this, 'props.options.columns') }
                                    data={ _.get(this, 'props.data') || data}
                                    loading={ _.get(this, 'props.isLoading') }
                                    noDataText={ _.get(this, 'props.noResultsMessage') }
                                    ref={ r => (this.checkboxTable = r) }
                                    { ...mapOptionsToProps }
                                    { ...mapSelectableProps }
                                />
                            </div>) :
                            (<div>
                                <ReactTable
                                    PaginationComponent={CBReactTablePagination}
                                    columns={ _.get(this, 'props.options.columns') }
                                    data={ _.get(this, 'props.data') || data }
                                    loading={ _.get(this, 'props.isLoading') }
                                    noDataText={ _.get(this, 'props.noResultsMessage') }
                                    { ...mapOptionsToProps }
                                />
                            </div>);
    }
};
