

export const template = (placeholder: string, data: any[], startId: number): string =>{

    let startText: string = placeholder || 'default placeholder' 

    const items = data.map(item=>{
        let clasS = ''
        if(item.id===startId){
            clasS = 'selected'
            startText = item.data
        }
        return `
            <li class = 'select_i ${clasS}' data-type="item" data-id="${item.id}">${item.data}</li>
        `
    }) 

    return `
        <div class = "select_close_layer" ></div>
        <div class="select_item" data-type="open">
            <span data-type = "current" >${startText}</span>
            <i class="fa fa-eye" aria-hidden="true" data-type="open"></i>
        </div>

        <div class="select_dropdown">
            <ui class = 'select_list'>
                ${items.join('')}
            </ui>
        </div>
    `
}