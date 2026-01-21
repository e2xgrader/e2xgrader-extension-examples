import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookWidgetFactory,
  NotebookWidgetFactory,
  NotebookPanel,
  StaticNotebook,
//  ToolbarItems,
//  ExecutionIndicator
}  from '@jupyterlab/notebook';

import {
  IEditorServices
} from '@jupyterlab/codeeditor';

import {
  IRenderMimeRegistry
} from '@jupyterlab/rendermime';

import {
//  createToolbarFactory,
  ISessionContextDialogs,
  IToolbarWidgetRegistry,
//  SessionContextDialogs,
//  Toolbar
} from '@jupyterlab/apputils';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { ITranslator, nullTranslator } from '@jupyterlab/translation';

import { PageConfig } from '@jupyterlab/coreutils';

import { IObservableList } from '@jupyterlab/observables';

import { DocumentRegistry } from '@jupyterlab/docregistry';

//import { ToolbarItems as DocToolbarItems } from '@jupyterlab/docmanager-extension';



/**
 * The name of the factory that creates notebooks.
 */
const FACTORY = 'Notebook';

/**
 * Setting Id storing the customized toolbar definition.
 */
//const PANEL_SETTINGS = '@jupyterlab/notebook-extension:panel';


/**
 * Initialization data for the @e2xgrader-extension/replace-notebook-widget-factory extension.
 */
const plugin: JupyterFrontEndPlugin<NotebookWidgetFactory.IFactory> = {
  id: '@e2xgrader-extension/replace-notebook-widget-factory:plugin',
  description: 'A JupyterLab that replaces the native notebook-widget-factory extension to achieve an empty notebook toolbar.',
  provides: INotebookWidgetFactory,
  requires: [
    NotebookPanel.IContentFactory,
    IEditorServices,
    IRenderMimeRegistry,
    IToolbarWidgetRegistry
  ],
  optional: [ISettingRegistry, ISessionContextDialogs, ITranslator],
  activate: activateWidgetFactory,
  autoStart: true
};

function activateWidgetFactory(
  app: JupyterFrontEnd,
  contentFactory: NotebookPanel.IContentFactory,
  editorServices: IEditorServices,
  rendermime: IRenderMimeRegistry,
  toolbarRegistry: IToolbarWidgetRegistry,
  settingRegistry: ISettingRegistry | null,
  sessionContextDialogs_: ISessionContextDialogs | null,
  translator_: ITranslator | null
): NotebookWidgetFactory.IFactory {
  const translator = translator_ ?? nullTranslator;
  //const sessionContextDialogs = sessionContextDialogs_ ?? new SessionContextDialogs({ translator });
  const preferKernelOption = PageConfig.getOption('notebookStartsKernel');

  // If the option is not set, assume `true`
  const preferKernelValue =
    preferKernelOption === '' || preferKernelOption.toLowerCase() === 'true';

  //const { commands } = app;
  let toolbarFactory:
    | ((
        widget: NotebookPanel
      ) =>
        | DocumentRegistry.IToolbarItem[]
        | IObservableList<DocumentRegistry.IToolbarItem>)
    | undefined;

  /*
  // Register notebook toolbar widgets
  toolbarRegistry.addFactory<NotebookPanel>(FACTORY, 'save', panel =>
    DocToolbarItems.createSaveButton(commands, panel.context.fileChanged)
  );
  toolbarRegistry.addFactory<NotebookPanel>(FACTORY, 'cellType', panel =>
    ToolbarItems.createCellTypeItem(panel, translator)
  );
  toolbarRegistry.addFactory<NotebookPanel>(FACTORY, 'kernelName', panel =>
    Toolbar.createKernelNameItem(
      panel.sessionContext,
      sessionContextDialogs,
      translator
    )
  );

  toolbarRegistry.addFactory<NotebookPanel>(
    FACTORY,
    'executionProgress',
    panel => {
      const loadingSettings = settingRegistry?.load(trackerPlugin.id);
      const indicator = ExecutionIndicator.createExecutionIndicatorItem(
        panel,
        translator,
        loadingSettings
      );

      void loadingSettings?.then(settings => {
        panel.disposed.connect(() => {
          settings.dispose();
        });
      });

      return indicator;
    }
  );



  if (settingRegistry) {
    // Create the factory
    toolbarFactory = createToolbarFactory(
      toolbarRegistry,
      settingRegistry,
      FACTORY,
      PANEL_SETTINGS,
      translator
    );
  }

   */

  const trans = translator.load('jupyterlab');

  const factory = new NotebookWidgetFactory({
    name: FACTORY,
    label: trans.__('Notebook'),
    fileTypes: ['notebook'],
    modelName: 'notebook',
    defaultFor: ['notebook'],
    preferKernel: preferKernelValue,
    canStartKernel: true,
    rendermime,
    contentFactory,
    editorConfig: StaticNotebook.defaultEditorConfig,
    notebookConfig: StaticNotebook.defaultNotebookConfig,
    mimeTypeService: editorServices.mimeTypeService,
    toolbarFactory,
    translator
  });
  app.docRegistry.addWidgetFactory(factory);

  return factory;
}

export default plugin;
