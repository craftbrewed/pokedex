"use strict";
import topScreenHome from '../../components/routes/home/topScreen.vue';
import bottomScreenHome from '../../components/routes/home/bottomScreen.vue';


import topScreenInfo from '../../components/routes/info/topScreenInfo.vue'

import bottomScreenInfo from '../../components/routes/info/bottomScreenInfo.vue';
import bottomScreenInfoArea from '../../components/routes/info/bottomScreenArea.vue';
import bottomScreenInfoCry from '../../components/routes/info/bottomScreenCry.vue';
import bottomScreenInfoSize from '../../components/routes/info/bottomScreenSize.vue';
let topScreenInfoArea, topScreenInfoCry, topScreenInfoSize, topScreenSearch, bottomScreenSearch;

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
            path: '/info/area',
            components: {
                topScreen: topScreenInfo,
                bottomScreen: bottomScreenInfoArea
            }
        },
        {
            path: '/info/cry',
            components: {
                topScreen: topScreenInfo,
                bottomScreen: bottomScreenInfoCry
            }
        },
        {
            path: '/info/size',
            components: {
                topScreen: topScreenInfo,
                bottomScreen: bottomScreenInfoSize
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