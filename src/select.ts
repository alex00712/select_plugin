import {template} from './template'

const default_data: any[] = [
    {id: 1, data: 'you'},
    {id: 2, data: 'can'},
    {id: 3, data: 'use'},
    {id: 4, data: 'your'},
    {id: 5, data: 'own'},
    {id: 6, data: 'data'}
]

interface ISelector {
    open: ()=>void,
    close: ()=>void,
    clickHendler: (e: any)=>void,
    destoy: () => void,
    chooseCurrentValue: () => void,
    select: () => void,
    toggle: (type: string, id?: string) => void
}

interface IOptions {
    placeholder: string,
    data: any,
    id: any,
    callback: (current: any)=>void
}

export class Select implements ISelector {

    $element: any
    $current: any
    $allItems: any
    $closeSelect: any
    currentId: any
    opt: IOptions 
    isOpen: boolean

    constructor(selector: string, opt?: IOptions) {
        this.$element = document.querySelector(selector)
        this.opt = opt
        this.opt.data = opt.data || default_data
        this.isOpen = false
        this.currentId = opt.id || null
        this.render()
        this.settings()
    }

    private render(): void{
        const {placeholder, data} = this.opt
        this.$element.classList.add('select')
        this.$element.innerHTML = template(placeholder, data, this.currentId)
        
    }

    private settings(): void{
        this.clickHendler = this.clickHendler.bind(this)
        this.$current = document.querySelector('[data-type = "current"]')
        this.$allItems = document.querySelectorAll(".select_i")
        this.$closeSelect = document.querySelector('.select_close_layer')
        this.$element.addEventListener('click', this.clickHendler)
        this.close = this.close.bind(this)
        this.$closeSelect.addEventListener('click', this.close)
    }

    destoy(): void{
        this.$element.removeEventListener('click', this.clickHendler)
    }

    chooseCurrentValue(): void{
        let current = this.opt.data.filter(item=>item.id == this.currentId)[0]
        this.opt.callback(current)
        return current.data
    }

    select(): void{
        this.$current.textContent = this.chooseCurrentValue()
        this.$allItems.forEach(element => {
            if(element.dataset.id==this.currentId){
                element.classList.add('selected')
            }else{
                element.classList.remove('selected')
            }
        });
    }

    toggle(type: string, id?: string): void {
        if (type === 'open' && !this.isOpen){
            this.open()
        }
        else if(type === 'open' && this.isOpen){
            this.close()
        }
        else if(type === 'item'){
            this.currentId = id
            this.select()
            this.close()
        }
    }

    clickHendler(e: any): void{
        const {type, id} = e.target.dataset
        this.toggle(type, id)
    }

    open(): void{
        this.$element.classList.add('open')
        this.isOpen = !this.isOpen
    }

    close(): void{
        this.$element.classList.remove('open')
        this.isOpen = !this.isOpen
    }

}