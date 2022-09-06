import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import 'be-a-beacon/be-a-beacon.js';
import {Actions, VirtualProps, PP, Proxy} from './types';
import {Mgmt} from 'trans-render/xslt/Mgmt.js';

export class BeRestated extends EventTarget implements Actions{
    #xsltMgmt = new Mgmt();
    #rootAbortController: AbortController | undefined;
    onFrom(pp: PP): void {
        const {from, proxy} = pp;
        const rn = proxy.getRootNode() as Element | DocumentFragment;
        const fromEl = rn.querySelector(from);
        if(fromEl !== null){
            proxy.fromRef = new WeakRef(fromEl);
            return;
        }
        this.disconnectRoot();
        this.#rootAbortController = new AbortController();
        rn.addEventListener('i-am-here', e => {
            this.onRNBeacon(pp);
        }, {capture: true, signal: this.#rootAbortController.signal});
    }

    #fromAbortController: AbortController | undefined;

    onRNBeacon(pp: PP) {
        const {proxy} = pp;
        const rn = proxy.self.getRootNode() as Element | DocumentFragment;
        const fromEl = rn.querySelector(proxy.from);
        if(fromEl === null) return;
        this.disconnectRoot();
        const beacon = fromEl.querySelector('template[be-a-beacon],template[is-a-beacon]');
        if(beacon === null){
            this.disconnectFrom();
            this.#fromAbortController = new AbortController();
            fromEl.addEventListener('i-am-here', e => {
                proxy.fromRef = new WeakRef(fromEl);
            }, {once: true, capture: true, signal: this.#fromAbortController.signal});
        }else{
            proxy.fromRef = new WeakRef(fromEl);
        }
    }

    // onFromBeacon = (e: Event) => {
    //     this.updateCount++;
    //     this.fromEl = this.fromRef.deref();
    // }

    onFromRef({fromRef, self}: PP) {
        const fromEl = fromRef.deref();
        if(fromEl === undefined) {
            this.onFrom(self);
            return {};
        }
        return {fromEl}
    }

    async onXslt({xslt}: PP){
        //identical to be-metamorphic.onDependciesLoaded
        const xsltProcessor = await this.#xsltMgmt.getProcessor(xslt); 
        return {
            xsltProcessor
        }; 
    }

    async onReady({xsltProcessor, fromEl, proxy, expandTempl, self}: PP){
        let xmlSrc = fromEl!;
        if(expandTempl){
            const {clone} = await import('trans-render/xslt/clone.js');
            xmlSrc = clone(xmlSrc);
        }
        const {swap} = await import('trans-render/xslt/swap.js');
        swap(xmlSrc, true);
        const resultDocument = xsltProcessor.transformToFragment(xmlSrc, document);
        //swap(resultDocument, false);
        self.innerHTML = '';
        self.append(resultDocument);
        proxy.resolved = true;
        return {
            fromEl: undefined
        }
    }

    disconnectRoot(){
        if(this.#rootAbortController !== undefined) this.#rootAbortController.abort();
    }
    disconnectFrom(){
        if(this.#fromAbortController !== undefined) this.#fromAbortController.abort();
    }
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps<any, any>): void {
        this.disconnectFrom();
        this.disconnectRoot();
        const {fromRef} = proxy;
        if(fromRef === undefined) return;
        const fromEl = fromRef.deref();
        if(fromEl === undefined) return;
    }
}


const tagName = 'be-restated';

const ifWantsToBe = 'restated';

const upgrade = '*';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            virtualProps:['from', 'xslt', 'xsltProcessor', 'fromRef', 'fromEl', 'expandTempl', 'updateCount'],
            proxyPropDefaults: {
                updateCount: 1,
            }
        },
        actions:{
            onFrom: 'from',
            onFromRef: 'fromRef',
            onXslt: 'xslt',
            onReady: {
                ifAllOf: ['fromEl', 'xsltProcessor', 'updateCount'],
            }
        }
    },
    complexPropDefaults:{
        controller: BeRestated
    }
});

register(ifWantsToBe, upgrade, tagName);