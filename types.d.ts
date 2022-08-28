import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeRestatedEndUserProps {
    from: string,
    xslt: string,
    expandTempl: boolean,
}

export interface BeRestatedVirtualProps extends BeRestatedEndUserProps, MinimalProxy {
    fromRef: WeakRef<Element>;
    xsltProcessor: XSLTProcessor;
    self: any;
    fromEl: Element | undefined;
    updateCount: number;
}

export interface BeRestatedProps extends BeRestatedVirtualProps{
    proxy: Element & BeRestatedVirtualProps,
}

export type P =  Partial<Element & BeRestatedVirtualProps>;

export interface BeRestatedActions{
    finale(proxy: Element & BeRestatedVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onFrom(self: this): void;
    onFromRef(self: this): void;
    onXslt(self: this): void;
    onReady(self: this): Promise<P>;
}