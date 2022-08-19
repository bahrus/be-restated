import {BeDecoratedProps} from 'be-decorated/types';

export interface BeRestatedVirtualProps {
    xslt: string,
}

export interface BeRestatedProps extends BeRestatedVirtualProps{
    proxy: Element & BeRestatedVirtualProps,
}

export type P =  Partial<Element & BeRestatedVirtualProps>;

export interface BeRestatedActions{
    
}