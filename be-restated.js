import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
import 'be-a-beacon/be-a-beacon.js';
import { Mgmt } from 'trans-render/xslt/Mgmt.js';
//const xsltLookup: {[key: string]: XSLTProcessor} = {};
export class BeRestated {
    #target;
    #xsltMgmt = new Mgmt();
    intro(proxy, target, beDecorProps) {
        this.#target = target;
    }
    onFrom({ from, proxy }) {
        const rn = proxy.getRootNode();
        const fromEl = rn.querySelector(from);
        if (fromEl !== null) {
            proxy.fromRef = new WeakRef(fromEl);
            return;
        }
        rn.addEventListener('i-am-here', this.onRNBeacon, { capture: true });
    }
    onRNBeacon = (e) => {
        const rn = this.#target.getRootNode();
        const fromEl = rn.querySelector(this.proxy.from);
        if (fromEl === null)
            return;
        rn.removeEventListener('i-am-here', this.onRNBeacon, { capture: true });
        const beacon = fromEl.querySelector('template[be-a-beacon],template[is-a-beacon]');
        if (beacon === null) {
            fromEl.addEventListener('i-am-here', e => {
                this.proxy.fromRef = new WeakRef(fromEl);
            }, { once: true, capture: true });
        }
        else {
            this.proxy.fromRef = new WeakRef(fromEl);
        }
        fromEl.addEventListener('i-am-here', this.onFromBeacon);
    };
    onFromBeacon = (e) => {
        this.updateCount++;
        this.fromEl = this.fromRef.deref();
    };
    onFromRef({ fromRef, self }) {
        const fromEl = fromRef.deref();
        if (fromEl === undefined) {
            this.onFrom(self);
            return {};
        }
        return { fromEl };
    }
    async onXslt({ xslt }) {
        //identical to be-metamorphic.onDependciesLoaded
        const xsltProcessor = await this.#xsltMgmt.getProcessor(xslt);
        return {
            xsltProcessor
        };
    }
    async onReady({ xsltProcessor, fromEl, proxy, expandTempl }) {
        let xmlSrc = fromEl;
        if (expandTempl) {
            const { clone } = await import('trans-render/xslt/clone.js');
            xmlSrc = clone(xmlSrc);
        }
        const { swap } = await import('trans-render/xslt/swap.js');
        swap(xmlSrc, true);
        const resultDocument = xsltProcessor.transformToFragment(xmlSrc, document);
        //swap(resultDocument, false);
        this.#target.innerHTML = '';
        this.#target.append(resultDocument);
        return {
            fromEl: undefined
        };
    }
    finale(proxy, target, beDecorProps) {
        const { fromRef } = proxy;
        if (fromRef === undefined)
            return;
        const fromEl = fromRef.deref();
        if (fromEl === undefined)
            return;
        fromEl.removeEventListener('i-am-here', this.onFromBeacon);
    }
}
const tagName = 'be-restated';
const ifWantsToBe = 'restated';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            virtualProps: ['from', 'xslt', 'xsltProcessor', 'fromRef', 'fromEl', 'expandTempl', 'updateCount'],
            intro: 'intro',
            proxyPropDefaults: {
                updateCount: 1,
            }
        },
        actions: {
            onFrom: 'from',
            onFromRef: 'fromRef',
            onXslt: 'xslt',
            onReady: {
                ifAllOf: ['fromEl', 'xsltProcessor', 'updateCount'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeRestated
    }
});
register(ifWantsToBe, upgrade, tagName);
