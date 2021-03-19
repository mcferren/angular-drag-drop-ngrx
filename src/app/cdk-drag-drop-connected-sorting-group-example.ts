import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * @title Drag&Drop connected sorting group
 */
@Component({
  selector: 'cdk-drag-drop-connected-sorting-group-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-group-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-group-example.css'],
})
export class CdkDragDropConnectedSortingGroupExample {

  ApiResponse = true;
  isDisabled = false;
  evenPredicate_ = true;
  constructor(private spinner: NgxSpinnerService) {}
  
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {

    var name="";
    if (event.previousContainer === event.container) {
      name = event.container.data[event.previousIndex];
    }
    else{
      name = event.previousContainer.data[event.previousIndex];
    }
    
    this.spinner.show(name);
    this.isDisabled = true;
    of(this.ApiResponse).pipe(delay(5000)).subscribe(res=>{
      this.spinner.hide(name);
      this.isDisabled = false;
      if(res){
        // stay there
      }
      else{
          // go back
         this.goback(event);
         this.evenPredicate_=false;
      }
    });
    
    this.goforward(event);
  }

  goback(event:any){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.currentIndex, event.previousIndex);
    } else {
      transferArrayItem(event.container.data,
                        event.previousContainer.data,
                        event.currentIndex,event.previousIndex);
    }
  }

  goforward(event:any){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,event.currentIndex);
    }
  }

  noReturnPredicate() {
    return false;
  }

  evenPredicate(){
    return this.evenPredicate_;
  }

}