import { Component, OnInit } from '@angular/core';
import { Look } from 'src/app/modules/shared/types/look.model';
import { LookService } from 'src/app/modules/core/services/look.service';

@Component({
  selector: 'app-htw-look-list',
  templateUrl: './look-list.component.html',
  styleUrls: ['./look-list.component.css']
})
export class LookListComponent implements OnInit {

  page = 0;
  showLoadingIndicatorSpinner = false; 

  get looks(): Array<Look> {
    return this.lookService.looksStorage
  }

  constructor(private lookService: LookService) { }

  ngOnInit() {
    this.lookService.getLooksByPage(this.page).subscribe(
      (response) => this.lookService.looksStorage = response,
      (error) => {},
      () => {
        this.showLoadingIndicatorSpinner = false;
      }
    );
  }

  onScroll(){
    this.page++;
    this.showLoadingIndicatorSpinner = true;
    this.lookService.getLooksByPage(this.page).subscribe(
      (response) => {
        if(response && Array.isArray(response) && response.length ) {
          this.lookService.looksStorage = this.lookService.looksStorage.concat(response);
        }
      },
      (error) => {},
      () => {
        this.showLoadingIndicatorSpinner = false;
      }
    );
  }

}
