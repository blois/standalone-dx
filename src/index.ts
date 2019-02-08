import DataExplorer from '@nteract/data-explorer';
import * as ReactDOM from "react-dom";
import * as React from 'react';
import 'react-table/react-table.css';
import './index.css';

window['displayDataExplorer'] = function(props, parent: HTMLElement) {
  const explorer = React.createElement(DataExplorer, props);
  ReactDOM.render(explorer, parent);

}

// window['DataExplorer'] = DataExplorer;
// window['ReactDOM'] = ReactDOM;
// window['React'] = React;