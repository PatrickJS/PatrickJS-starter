import _ from 'lodash';
import React from 'react';
import { ReactDOM } from 'react-dom';
import ReactTable from 'react-table';

export class ReactTableHost extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<div>
                    <ReactTable
                        columns={ _.get(this, 'props.options.columns') }
                        data={ _.get(this, 'props.data') }
                        loading={false}
                        noDataText={ _.get(this, 'props.noResultsMessage') }
                    />
                </div>);
    }
};
