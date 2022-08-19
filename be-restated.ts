import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import 'be-a-beacon/be-a-beacon.js';
import {BeRestatedActions, BeRestatedProps, BeRestatedVirtualProps} from './types';

const xsltLookup: {[key: string]: XSLTProcessor} = {};

export class BeRestated implements BeRestatedActions{

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
            virtualProps:[],
        },
        actions:{}
    },
    complexPropDefaults:{
        controller: BeRestated
    }
});

register(ifWantsToBe, upgrade, tagName);