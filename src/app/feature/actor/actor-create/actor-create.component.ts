import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/model/actor.class';
import { ActorService } from 'src/app/service/actor.service';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.css']
})
export class ActorCreateComponent implements OnInit {
  title = "Actor Create";
  actor: Actor = new Actor();
  submitBtnTitle = "Create";

  constructor(private actorSvc: ActorService,
              private router: Router) { }

  ngOnInit(): void {
  }

}
