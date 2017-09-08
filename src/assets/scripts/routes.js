"use strict";
import topScreenHome from '../../components/routes/home/topScreen.vue';
import bottomScreenHome from '../../components/routes/home/bottomScreen.vue';
import topScreenInfo from '../../components/routes/info/topScreen.vue'
import bottomScreenInfo from '../../components/routes/info/bottomScreen.vue';
import bottomScreenInfoArea from '../../components/routes/info/area.vue';
import bottomScreenInfoCry from '../../components/routes/info/cry.vue';
import bottomScreenInfoSize from '../../components/routes/info/size.vue';
let topScreenSearch, bottomScreenSearch;

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
            },
            children: [
                {
                    path: '/area',
                    components: {
                        topScreen: topScreenInfo,
                        bottomScreen: bottomScreenInfoArea
                    }
                },
                {
                    path: '/cry',
                    components: {
                        topScreen: topScreenInfo,
                        bottomScreen: bottomScreenInfoCry
                    }
                },
                {
                    path: '/size',
                    components: {
                        topScreen: topScreenInfo,
                        bottomScreen: bottomScreenInfoSize
                    }
                }
            ]
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