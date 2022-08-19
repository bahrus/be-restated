import {BeDecoratedProps} from 'be-decorated/types';

export interface BeRestatedEndUserProps {
    from: string,
    xslt: string,
    expandTempl: boolean,
}

export interface BeRestatedVirtualProps extends BeRestatedEndUserProps {
    fromRef: WeakRef<Element>;
    xsltProcessor: XSLTProcessor;
    self: any;
    fromEl: Element | undefined;
}

export interface BeRestatedProps extends BeRestatedVirtualProps{
    proxy: Element & BeRestatedVirtualProps,
}

export type P =  Partial<Element & BeRestatedVirtualProps>;

export interface BeRestatedActions{
    intro(proxy: Element & BeRestatedVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onFrom(self: this): void;
    onFromRef(self: this): void;
    onXslt(self: this): void;
    onReady(self: this): Promise<P>;
}