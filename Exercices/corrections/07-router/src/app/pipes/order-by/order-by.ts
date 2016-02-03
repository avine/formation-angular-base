import {Pipe, PipeTransform} from 'angular2/core';
import {Product} from '../../model/product';

@Pipe({
  name: 'OrderBy'
})
export class OrderBy implements PipeTransform{

  transform(value:Product[]):Product[] {
    if(!value){
      return [];
    }
    
    return value.sort(function(previous, next){
        if(previous.title > next.title) return 1;
        else if(previous.title < next.title) return -1;
        return 0
    });
  }
}
