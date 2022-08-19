import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import 'be-a-beacon/be-a-beacon.js';
import {BeRestatedActions, BeRestatedProps, BeRestatedVirtualProps, P} from './types';

const xsltLookup: {[key: string]: XSLTProcessor} = {};

export class BeRestated implements BeRestatedActions{
    #target!: Element;
    intro(proxy: Element & BeRestatedVirtualProps, target: Element, beDecorProps: BeDecoratedProps<any, any>): void {
        this.#target = target;
    }
    onFrom({from, proxy}: this): void {
        const rn = proxy.getRootNode() as Element | DocumentFragment;
        const fromEl = rn.querySelector(from);
        if(fromEl !== null){
            proxy.fromRef = new WeakRef(fromEl);
            return;
        }
        rn.addEventListener('i-am-here', this.onRNBeacon);
    }

    onRNBeacon = (e: Event) => {
        const rn = this.#target.getRootNode() as Element | DocumentFragment;
        const fromEl = rn.querySelector(this.proxy.from);
        if(fromEl === null) return;
        rn.removeEventListener('i-am-here', this.onRNBeacon);
        fromEl.addEventListener('i-am-here', this.onFromBeacon);
        this.proxy.fromRef = new WeakRef(fromEl);
    }

    onFromBeacon = (e: Event) => {

    }

    onFromRef({fromRef, self}: this): void {
        const ref = fromRef.deref();
        if(ref === undefined) {
            this.onFrom(self);
            return;
        }

    }

    async onXslt({xslt}: this): Promise<P> {
        //identical to be-metamorphic.onDependciesLoaded
        let xsltProcessor = xsltLookup[xslt];
        if(xsltProcessor !== undefined){
            return {
                xsltProcessor
            };
        }
        const resp = await fetch(xslt);
        const xsltString = await resp.text();
        const xsltNode = new DOMParser().parseFromString(xsltString, 'text/xml');
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsltNode);
        xsltLookup[xslt] = xsltProcessor;
        return {
            xsltProcessor
        }; 
    }

    async onReady({xsltProcessor, fromEl, proxy, expandTempl}: this): Promise<P>{
        let xmlSrc = fromEl!;
        if(expandTempl){
            const {clone} = await import('trans-render/xslt/clone.js');
            xmlSrc = clone(xmlSrc);
        }
        const {swap} = await import('trans-render/xslt/swap.js');
        swap(xmlSrc, true);
        const resultDocument = xsltProcessor.transformToFragment(xmlSrc, document);
        //swap(resultDocument, false);
        this.#target.innerHTML = '';
        this.#target.append(resultDocument);
        return {
            fromEl: undefined
        }
    }
}

export interface BeRestated extends BeRestatedProps{}

const tagName = 'be-restated';

const ifWantsToBe = 'restated';

const upgrade = '*';

define<BeRestatedProps & BeDecoratedProps<BeRestatedProps, BeRestatedActions>, BeRestatedActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            virtualProps:['from', 'xslt', 'xsltProcessor', 'fromRef', 'fromEl', 'expandTempl'],
            intro: 'intro'
        },
        actions:{
            onFrom: 'from',
            onFromRef: 'fromRef',
            onXslt: 'xslt',
            onReady: {
                ifAllOf: ['fromEl', 'xsltProcessor']
            }
        }
    },
    complexPropDefaults:{
        controller: BeRestated
    }
});

register(ifWantsToBe, upgrade, tagName);