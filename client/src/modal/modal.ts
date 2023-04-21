export type sidebarModal = {
    link: string,
    name: string,
    icon: any,
}

export type documentModal = {
    search: string,
    name: string,
}

export type productModal = {
    available: boolean,
    description: string,
    id: number,
    imageURL: string,
    name: string,
    price: number,
    quantity: number,
}

export type purchaseModal = {
    id: number,
    buyer: any,
    products: Array<productModal>,
    delivered: boolean,
}

export interface Purchase {
    id: number;
    buyer: string;
    products: number[];
    delivered: boolean;
    status: number;
  }