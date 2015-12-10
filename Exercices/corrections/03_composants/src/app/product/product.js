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
var ProductComponent = (function () {
    function ProductComponent() {
        this.addToBasket = new angular2_1.EventEmitter();
    }
    ProductComponent.prototype.clickHandler = function () {
        this.addToBasket.next(this.data);
    };
    ProductComponent = __decorate([
        angular2_1.Component({
            selector: "product",
            template: "<div class=\"col-md-3 col-sm-6 hero-feature\">\n                <div class=\"thumbnail\">\n                    <img [src]=\"data.photo\" alt=\"\">\n                    <div class=\"caption\">\n                        <h3>{{data.title}} - {{data.price}}\u20AC</h3>\n                        <p>{{data.description}}</p>\n                        <p>\n                            <button class=\"btn btn-primary\" (click)=\"clickHandler()\">Ajoutez au panier</button>\n                        </p>\n                    </div>\n                </div>\n            </div>",
            inputs: ['data'],
            outputs: ['addToBasket']
        }), 
        __metadata('design:paramtypes', [])
    ], ProductComponent);
    return ProductComponent;
})();
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.js.map