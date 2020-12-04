import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {ExecutableComponent} from "../../models/executable.model";
import {Action} from "../../models/action.model";
import {LibraryBottomsheetInteractionService} from "../../services/library/library-bottomsheet-interaction.service";
import {OuterComponent} from "../../models/outer.model";

@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
@Injectable({
  providedIn: "root"
})
export class BottomSheetComponent implements OnInit{

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { components: ExecutableComponent[], isAction: boolean },
              private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
              private interactionService: LibraryBottomsheetInteractionService) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  updateActionsArray(action: Action) {
    this.interactionService.updateActionsArray(action);
  }

  updateCompoundsArray(compound: OuterComponent) {
    this.interactionService.updateCompoundsArray(compound);
  }

  onClick(component) {
    if (this.data.isAction) {
      this.updateActionsArray(component);
    }
    else {
      this.updateCompoundsArray(component);
    }
  }


  ngOnInit() {
    console.log(this.data);
  }
}
