"use strict";
import PokeApi from '../pokeApiWrapper';
import PokeDataModule from './pokeDataModule';
const extend = require('lodash/extend');
const ApiScraper = function(){};

ApiScraper.prototype.extend = extend;
ApiScraper.prototype.api = new PokeApi();
ApiScraper.prototype.dataModule = new PokeDataModule();
ApiScraper.prototype.data = {};
ApiScraper.prototype.totalTime = 0;
ApiScraper.prototype.startTime = 0;
ApiScraper.prototype.spinner = function(){

    const spinner = ["|", "/", "―", "\\"];
    let interval = null;
    let idx = 0;
    let message = "";
    const stop  = function(){
        clearInterval(interval);
    };

    const start = function(_message){
        message = (typeof _message) ? _message : "";
        interval = setInterval(()=>{
            idx = (++idx === spinner.length) ? 0 : idx;
            console.clear();
            console.log(spinner[idx], message);
        }, 200);
    };
    const setMessage = function(_message){
        message = _message;
    };

    return{
        start,
        stop,
        setMessage
    }
}();
ApiScraper.prototype.totalTimeString = function (){
    let hours   = Math.floor(((this.totalTime / 1000) / 60) / 60),
        minutes = Math.floor(((this.totalTime / 1000) / 60) % 60),
        seconds = ((this.totalTime / 1000) % 60);

    return hours+" hours "+minutes+" minutes "+seconds+ " seconds";
};
ApiScraper.prototype.save = function(){
    let data = JSON.stringify(this.data);
    console.log(data);
    let filename = 'pokedata.json',
        blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a');


    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e)

};
ApiScraper.prototype.scrape = function(pokedex){
    this.spinner.start("Starting Scraper...");
    this.startTime = Date.now();
    let maxConcurrentRequests = 3;
    let idx = 0;
    let requestNumber = 0;
    let pArray = [];
    let failedIds = [];

    const _scrape = ()=>{
        this.spinner.setMessage('Scraping');
        let idxStart = idx;
        for(;requestNumber<maxConcurrentRequests; requestNumber++){
            idx = (failedIds.length) ? failedIds.pop() : idxStart+requestNumber;
            let pokemon = pokedex[idx];
            let id = pokemon.pokemon_species.url.split('/').filter(s => s !== "").pop();
            let promises = Promise.all([
                this.api.loadPokemonData(id, 'pokemon', false),
                this.api.loadPokemonData(id, 'species', false),
                this.api.loadEncounters('/api/v2/pokemon/'+id+'/encounters', false)
            ]);

            promises
                .then(responseArray =>{
                    let response = this.extend(responseArray[0], responseArray[1]);
                    response.location_area_encounters = responseArray[2];
                    this.data[id] = this.dataModule.filterFullPokeObject(response);
                })
                .catch(error =>{
                    failedIds.push(id);
                });
            idx++;
            pArray.push(promises);
        }
        Promise.all(pArray).then(()=>{
            requestNumber = 0;
            pArray = [];
            if(idx < pokedex.length && failedIds.length === 0) {
                this.spinner.setMessage('Rate Limiting ');

                setTimeout(()=> {
                    _scrape();
                }, 2600);

            }else{
                this.spinner.stop();
                this.totalTime = Date.now() - this.startTime;
                console.log("Complete!", "took: ", this.totalTimeString());
                this.save();
            }
        });
    };
    try{
        _scrape()
    }catch(e){
        this.spinner.stop();
        console.error(e);
    }
};

export default ApiScraper;