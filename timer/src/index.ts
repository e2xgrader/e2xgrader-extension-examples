import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { DOMUtils } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

const TOP_AREA_CSS_CLASS = 'jp-TopAreaText-timer';

/**
 * Initialization data for the @e2xgrader-examples/timer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@e2xgrader-examples/timer:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension @e2xgrader-examples/timer is activated!');

    const startTime: number = Date.now();

    // Create the HTML content of the widget
    const node = document.createElement('div');
    node.textContent = '00:00:00';

    setInterval(() => {
      node.textContent = new Date(
        Date.now() - startTime
      ).toLocaleTimeString('de-DE', {timeZone: 'UTC'});
    }, 1000);

    // Create the widget
    const widget = new Widget({ node });
    widget.id = DOMUtils.createDomID();
    widget.addClass(TOP_AREA_CSS_CLASS);

    // Add the widget to the top area
    app.shell.add(widget, 'top', { rank: 1000 });
  }
};

export default plugin;
