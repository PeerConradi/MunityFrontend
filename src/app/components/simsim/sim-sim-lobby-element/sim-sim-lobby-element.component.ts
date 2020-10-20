import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { SimulationLobbyInfo } from '../../../models/simulation/simulation-lobby-info.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SimulationService } from '../../../services/simulator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sim-sim-lobby-element',
  templateUrl: './sim-sim-lobby-element.component.html',
  styleUrls: ['./sim-sim-lobby-element.component.css']
})
export class SimSimLobbyElementComponent implements OnInit {


  @Input() lobby: SimulationLobbyInfo;

  modalRef: BsModalRef;

  joinForm;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private simulationService: SimulationService,
    private router: Router) { }

  ngOnInit(): void {
    this.joinForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      password: ''
    })
  }

  openModal(template: TemplateRef<any>) {

    this.simulationService.checkHiddenToken(this.lobby.SimSimId.toString()).subscribe(n => {
      if (n === true) {
        // If the User is already inside this simulation rejoin
        this.router.navigate(['/sim/']);
        this.modalRef.hide();
      } else {
        // If not then Open the Join Modal
        this.modalRef = this.modalService.show(template);
      }
    });
  }

  join(val) {
    this.simulationService.checkHiddenToken(this.lobby.SimSimId.toString()).subscribe(n => {
      console.log(n);
      if (n === true) {
        // If the User is already inside this simulation rejoin
        this.simulationService.getSimulation(this.lobby.SimSimId.toString());

        this.router.navigate(['/sim/']);

        this.modalRef.hide();
      } else {
        // If not then join as a new User
        this.simulationService.tryJoin(this.lobby.SimSimId.toString(), val.displayName).subscribe(res => {
          this.simulationService.userToken = res.HiddenToken;
          this.simulationService.currentUser = res;
          localStorage.setItem('lastsimulation', this.lobby.SimSimId.toString());
          this.router.navigate(['/sim/']);
          this.modalRef.hide();
        })
      }
    });


  }

}
