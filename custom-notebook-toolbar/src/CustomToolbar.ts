
import { NotebookPanel } from '@jupyterlab/notebook';
import { Toolbar, ToolbarButton } from '@jupyterlab/ui-components';
import { CommandRegistry } from '@lumino/commands';
import { Widget, PanelLayout } from '@lumino/widgets';

/**
 * Custom Toolbar Widget
 */
export class CustomToolbar extends Widget {
  constructor(
    panel: NotebookPanel,
    commands: CommandRegistry
  ) {
    super();
    this.addClass('jp-custom-notebook-toolbar');

    // Container für die Toolbar
    const toolbar: Toolbar = panel.toolbar;

    // Entferne alle existierenden Items
    const layout = toolbar.layout as PanelLayout;
    if (layout) {
      // Erstelle eine Kopie der Widgets, da wir während der Iteration entfernen
      const widgets = Array.from(layout.widgets);
      widgets.forEach(widget => {
        layout.removeWidget(widget);
      });
    }

    // Füge eigene Buttons hinzu
    this._addCustomButtons(toolbar, commands, panel);
  }

  private _addCustomButtons(
    toolbar: Toolbar,
    commands: CommandRegistry,
    panel: NotebookPanel
  ): void {
    // Spacer -- the first toolbar item will always be moved to the end (don't know why)
    const spacer1 = new Widget();
    spacer1.addClass('jp-Toolbar-spacer');
    toolbar.addItem('spacer1', spacer1);

    // e2x Branding
    const e2xLabel = new Widget();
    e2xLabel.addClass('jp-ToolbarBranding');
    e2xLabel.node.textContent = 'e²x'
    toolbar.addItem('e2xLabel', e2xLabel);

    // Save Button
    const saveButton = new ToolbarButton({
      icon: 'ui-components:save',
      onClick: () => {
        commands.execute('docmanager:save');
      },
      tooltip: 'save notebook'
    });
    toolbar.addItem('save', saveButton);

    // Run Button
    const runButton = new ToolbarButton({
      icon: 'ui-components:run',
      onClick: () => {
        commands.execute('notebook:run-cell-and-select-next');
      },
      tooltip: 'run cell'
    });
    toolbar.addItem('run', runButton);

    // Cell Type Switcher (simplified)
    const cellTypeButton = new ToolbarButton({
      label: 'Switch Cell-Type',
      onClick: () => {
        const currentType = panel.content.activeCell?.model.type;
        if (currentType === 'code') {
          commands.execute('notebook:change-cell-to-markdown');
        } else {
          commands.execute('notebook:change-cell-to-code');
        }
      },
      tooltip: 'Zelltyp wechseln'
    });
    toolbar.addItem('cell-type', cellTypeButton);

    /*
    // Run All Button
    const runAllButton = new ToolbarButton({
      icon: 'ui-component:fast-forward',
      onClick: () => {
        commands.execute('notebook:run-all-cells');
      },
      tooltip: 'run all cells'
    });
    toolbar.addItem('run-all', runAllButton);

    // Restart Kernel Button
    const restartButton = new ToolbarButton({
      icon: 'ui-components:refresh',
      onClick: () => {
        commands.execute('notebook:restart-kernel');
      },
      tooltip: 'Restart Kernel'
    });
    toolbar.addItem('restart', restartButton);

    // Spacer
    const spacer2 = new Widget();
    spacer2.addClass('jp-Toolbar-spacer');
    toolbar.addItem('spacer2', spacer2);

    // Insert Cell Below
    const insertButton = new ToolbarButton({
      icon: 'ui-components:add',
      onClick: () => {
        commands.execute('notebook:insert-cell-below');
      },
      tooltip: 'Insert cell below'
    });
    toolbar.addItem('insert', insertButton);

    // Delete Cell
    const deleteButton = new ToolbarButton({
      icon: 'ui-components:delete',
      onClick: () => {
        commands.execute('notebook:delete-cell');
      },
      tooltip: 'Delete cell'
    });
    toolbar.addItem('delete', deleteButton);

    // Spacer
    const spacer3 = new Widget();
    spacer3.addClass('jp-Toolbar-spacer');
    toolbar.addItem('spacer3', spacer3);

    // Spacer
    const spacer4 = new Widget();
    spacer4.addClass('jp-Toolbar-spacer');
    toolbar.addItem('spacer4', spacer4);

    // Info Button (Custom)
    const infoButton = new ToolbarButton({
      label: '📊',
      onClick: () => {
        const cellCount = panel.content.widgets.length;
        alert(`This notebook has ${cellCount} cells.\nCustom toolbar is active!`);
      },
      tooltip: 'Notebook info'
    });
    toolbar.addItem('info', infoButton);
    */
  }
}
