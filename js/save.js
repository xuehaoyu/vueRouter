var save = {
    install(vue,params){
        vue.prototype.save = function (attr,value) {
            sessionStorage[attr]=JSON.stringify(value);
        }
        vue.prototype.del = function (attr) {
            sessionStorage.removeItem(attr);
        }
        vue.prototype.get = function (attr,attrOne) {
            if(attrOne){
                return sessionStorage[attr]?JSON.parse(sessionStorage[attr])[attrOne]:"";
            }else {
                return sessionStorage[attr];
            }
        }
    }
}