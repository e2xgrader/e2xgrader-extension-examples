import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import {CustomToolbar} from "./CustomToolbar";


/**
 * Initialization data for the @e2xgrader-examples/custom-notebook-toolbar extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@e2xgrader-examples/custom-notebook-toolbar:plugin',
  description: 'A JupyterLab extension that adds a custom notebook toolbar.',
  autoStart: true,
  requires: [
      INotebookTracker
  ],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker): void => {
    console.log('JupyterLab Extension: Custom Notebook Toolbar ist aktiviert!');

    // Überwache alle Notebook-Panels
    tracker.widgetAdded.connect((sender, panel: NotebookPanel) => {
      console.log('Neues Notebook erkannt, Custom Toolbar wird erstellt...');

      // Warte bis das Notebook vollständig geladen ist
      panel.revealed.then(() => {
        new CustomToolbar(panel, app.commands);
      });
    });
  }
};


export default plugin;
