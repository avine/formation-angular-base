var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var MenuComponent = (function () {
    function MenuComponent() {
    }
    MenuComponent = __decorate([
        angular2_1.Component({
            selector: "menu",
            template: "<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n                <div class=\"container\">\n                    <div class=\"navbar-header\">\n                        <a class=\"navbar-brand\" href=\"#\">Zenika Ecommerce</a>\n                    </div>\n                    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                        <ul class=\"nav navbar-nav\">\n                            <li>\n                                <a href=\"#\">Voir mon Panier</a>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </nav>"
        }), 
        __metadata('design:paramtypes', [])
    ], MenuComponent);
    return MenuComponent;
})();
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.js.map