import {Select} from './src/select'
import './src/style.scss'

const S = new Select('#select', {
    placeholder: 'choose element',
    // data: [
    //     {id: 1, data: 'hello'},
    //     {id: 2, data: 'yo-yo-yo'},
    //     {id: 3, data: 'ку ку'},
    //     {id: 4, data: 'Hi!'},
    //     {id: 5, data: 'Здорово'},
    //     {id: 6, data: 'Е-Е-Е'},
    // ],
    id: 3, // default item
    callback(item){
        console.log(item)
    }
})


window.S = S