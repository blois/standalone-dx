import DataExplorer from '@nteract/data-explorer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import'react-table/react-table.css';
import './index.css';

export function displayDataExplorer(props, parent: HTMLElement) {
  const explorer = React.createElement(DataExplorer, props);
  ReactDOM.render(explorer, parent);
}