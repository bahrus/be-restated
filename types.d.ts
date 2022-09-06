import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface EndUserProps {
    from: string,
    xslt: string,
    expandTempl: boolean,
}

export interface VirtualProps extends EndUserProps, MinimalProxy {
    fromRef: WeakRef<Element>;
    xsltProcessor: XSLTProcessor;
    self: any;
    fromEl: Element | undefined;
    updateCount: number;
}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps {
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface Actions{
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
    onFrom(pp: PP): void;
    onFromRef(pp: PP): void;
    onXslt(pp: PP): void;
    onReady(pp: PP): void;
}