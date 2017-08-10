"use strict";
import topScreenHome from '../../components/routes/home/topScreen.vue';
import bottomScreenHome from '../../components/routes/home/bottomScreen.vue';
import topScreenInfo from '../../components/routes/info/topScreen.vue'
var bottomScreenInfo, topScreenSearch, bottomScreenSearch;

var routes = function(){
    return [
        {
            path: '/',
            components: {
                topScreen: topScreenHome,
                bottomScreen: bottomScreenHome
            }
        },
        {
            path: '/info',
            components: {
                topScreen: topScreenInfo,
                bottomScreen: bottomScreenInfo
            }
        },
        {
            path: '/search', 
            components: {
                topScreen: topScreenSearch,
                bottomScreen: bottomScreenSearch
            }
        }
    ]
};

export default routes;