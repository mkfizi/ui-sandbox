import Alpine from 'alpinejs';
import anchor from '@alpinejs/anchor'
import focus from '@alpinejs/focus'

Alpine.data('app', () => ({
    init() {
        console.log("Initialize");
    } 
}))

Alpine.plugin(anchor)
Alpine.plugin(focus)

window.Alpine = Alpine;
Alpine.start()

