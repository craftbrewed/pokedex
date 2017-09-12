"use strict";
import topScreenHome from '../../components/routes/home/topScreen.vue';
import bottomScreenHome from '../../components/routes/home/bottomScreen.vue';

import topScreenInfoRoot from '../../components/routes/info/topScreenRoot.vue';
import bottomScreenInfoRoot from '../../components/routes/info/bottomScreenRoot.vue';

import topScreenInfo from '../../components/routes/info/topScreenInfo.vue'
import bottomScreenInfo from '../../components/routes/info/bottomScreenInfo.vue';

import bottomScreenInfoArea from '../../components/routes/info/bottomScreenArea.vue';
import topScreenInfoArea from '../../components/routes/info/topScreenArea.vue';

import bottomScreenInfoCry from '../../components/routes/info/bottomScreenCry.vue';
import topScreenInfoCry from '../../components/routes/info/topScreenCry.vue';

import bottomScreenInfoSize from '../../components/routes/info/bottomScreenSize.vue';
let topScreenInfoSize, topScreenSearch, bottomScreenSearch;

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
                topScreen: topScreenInfoRoot,
                bottomScreen: bottomScreenInfoRoot
            },
            children:[
                {
                    path: '/',
                    components: {
                        topScreenInfo: topScreenInfo,
                        bottomScreenInfo: bottomScreenInfo
                    }
                },
                {
                    path: 'area',
                    components: {
                        topScreenInfo: topScreenInfoArea,
                        bottomScreenInfo: bottomScreenInfoArea
                    }
                },
                {
                    path: 'cry',
                    components: {
                        topScreenInfo: topScreenInfoCry,
                        bottomScreenInfo: bottomScreenInfoCry
                    }
                },
                {
                    path: 'size',
                    components: {
                        topScreenInfo: topScreenInfoSize,
                        bottomScreenInfo: bottomScreenInfoSize
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