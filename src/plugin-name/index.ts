import { widget as Widget } from '$:/core/modules/widgets/widget.js';
import { IChangedTiddlers } from 'tiddlywiki';
import './index.css';

class ExampleWidget extends Widget {
  private clickCount = 0;

  private getDisplayText() {
    return `This is a widget! Clicks: ${this.clickCount}`;
  }

  refresh(_changedTiddlers: IChangedTiddlers) {
    return false;
  }

  render(parent: Element, nextSibling: Element) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    const containerElement = $tw.utils.domMaker('button', {
      class: 'tc-example-widget',
      attributes: {
        type: 'button',
        'aria-label': 'Example widget click counter',
      },
      text: this.getDisplayText(),
    });
    containerElement.addEventListener('click', () => {
      this.clickCount += 1;
      containerElement.textContent = this.getDisplayText();
    });
    parent.insertBefore(containerElement, nextSibling);
    this.domNodes.push(containerElement);
  }
}

// zh tips
// El nombre de la variable del modulo exportado aqui.RandomNumberSe utilizara como widget.（widget）Nombre. uso<$RandomNumber/>Llame a este widget。
// WidgetentiddlywikiEl nombre de la entrada, el archivo fuente y el archivo fuente en.metaNombre del archivo yWidgetLos nombres pueden ser inconsistentes。
// Por ejemploWidgetEl nombre de la entrada puede serMy-Widget,Archivos fuente y archivos fuente.metaSe puede llamar al nombre del archivo.index.tsConindex.ts.meta。FinalWidgetEl nombre es：RandomNumber，Y uso<$RandomNumber/>Llame a este widget。
// Si se agrega a un archivo de script .meta Se considerara expediente de entrada.。
// en tips
// The module variable name RandomNumber exported here will be used as the name of the widget. Use <$RandomNumber/> to call this Widget.
// The Widget's tiddler name, source file, and source file .meta file name in tiddlywiki can be inconsistent with the Widget name.
// For example, the Widget entry name could be My-Widget, and the source and source.meta file names could be index.ts and index.ts.meta, but the final Widget name could be RandomNumber, and the widget would be called with <$RandomNumber/>.
// If a .meta is added to a script file it will be treated as an entry file.
declare let exports: {
  RandomNumber: typeof ExampleWidget;
};
exports.RandomNumber = ExampleWidget;
