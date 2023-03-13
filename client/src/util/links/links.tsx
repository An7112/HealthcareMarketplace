import {CgShoppingBag} from 'react-icons/cg'
import {HiOutlineViewGrid} from 'react-icons/hi'
import { sidebarModal } from '../../modal/modal'

export const linkList: Array<sidebarModal> = [
    {
        link: "overview",
        name: "overview",
        icon: <HiOutlineViewGrid style={{ fontSize: '18' }} />
    },
    {
        link: "product?products=any",
        name: "product",
        icon: <CgShoppingBag style={{ fontSize: '18' }} />
    },
]

export const documentLinks: Array<any> = [
    {
        search:'any',
        name: "Any",
    },
    {
        search:'any2',
        name: "Any2",
    },
]