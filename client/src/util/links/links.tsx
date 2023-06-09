import {CgShoppingBag, CgProfile} from 'react-icons/cg'
import {HiOutlineViewGrid} from 'react-icons/hi'
import {BiPurchaseTagAlt} from 'react-icons/bi'
import { sidebarModal } from '../../modal/modal'

export const linkList: Array<sidebarModal> = [
    {
        link: "overview",
        name: "overview",
        icon: <HiOutlineViewGrid style={{ fontSize: '18' }} />
    },
    {
        link: "product?products=treat-diseases",
        name: "product",
        icon: <CgShoppingBag style={{ fontSize: '18' }} />
    },
    {
        link: "profile",
        name: "profile",
        icon: <CgProfile style={{ fontSize: '18' }}/>
    },
]

export const documentLinks: Array<any> = [
    {
        search:'treat-diseases',
        name: "Treat diseases",
    },
    {
        search:'preventive-medicine',
        name: "Preventive medicine",
    },
    {
        search:'adjunctive-therapy',
        name: "Adjunctive therapy",
    },
    {
        search:'exploration-diagnosis',
        name: "Exploration and diagnosis",
    },
    {
        search:'supplements',
        name: "Supplements",
    },
]