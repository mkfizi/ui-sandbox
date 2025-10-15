import Alpine from 'alpinejs';
import anchor from '@alpinejs/anchor';
import focus from '@alpinejs/focus';
import persist from '@alpinejs/persist';
 

Alpine.data('app', () => ({
    init() {
        console.log("Initialize");
    } 
}));

Alpine.plugin(anchor);
Alpine.plugin(focus);
Alpine.plugin(persist);

Alpine.start();
