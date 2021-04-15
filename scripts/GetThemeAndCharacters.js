(function (window) {
    'use strict';
    var App = window.App || {};
    var queryStr = window.location.search;

    function GetThemeAndCharacters() {
        this.urlParams = new URLSearchParams(queryStr);
        console.log("query string" + queryStr);
    }

    GetThemeAndCharacters.prototype.getTheme = function() {
        this.Theme = this.urlParams.get('Theme');
        
        return this.Theme;
    };

    GetThemeAndCharacters.prototype.getCharacter = function(key) {
        this.Character = this.urlParams.get(key);
        
        return this.Character;
    };

    App.GetThemeAndCharacters = GetThemeAndCharacters;
    window.App = App;
})(window);