import { SystemService } from './../../../service/system.service';
import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit {
  title = "Credit List";
  credits: Credit[] = [];
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  colClasses = "btn btn-link font-weight-bold";

  constructor(private creditSvc: CreditService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    console.log('credit list: loggedInUser?',this.sysSvc.loggedInUser);
    // populate list of credits
    this.creditSvc.getAll().subscribe(
      resp => {
        this.credits = resp as Credit[];
        for (let c of this.credits) {
          c.actorName = c.actor.lastName + c.actor.firstName;
        }
        console.log('Credits', this.credits);
      },
      err => {
        console.log(err);
      }
    );
  }

  sortBy(column: string): void {
    console.log("movie list sortBy called")
    if(column == this.sortCriteria){
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }
}
