import { Component, OnInit, Input } from '@angular/core';
import { Speakerlist } from '../../../models/speakerlist.model';
import { SpeakerListService } from '../../../services/speaker-list.service';
import { ConferenceService } from '../../../services/conference-service.service';
import { Delegation } from '../../../models/conference/delegation.model';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';

@Component({
  selector: 'app-speakerlist-panel',
  templateUrl: './speakerlist-panel.component.html',
  styleUrls: ['./speakerlist-panel.component.css']
})
export class SpeakerlistPanelComponent implements OnInit {

  @Input() speakerlist: Speakerlist;

  addSpeakerSelection: string;

  presetDelegations: Delegation[];

  constructor(private speakerlistService: SpeakerListService, private conferenceService: ConferenceService) { }

  ngOnInit() {
    this.conferenceService.getAllDelegations().subscribe(n => {
      this.presetDelegations = n;
    });
  }

  //addSpeaker() {
  //  const s = this.presetDelegations.find(n => n.Name == this.addSpeakerSelection);
  //  this.speakerlistService.addSpeaker(this.speakerlist.ID, s.ID).subscribe();
  //}

  onAddSpeakerSelected(val: TypeaheadMatch) {
    if (val !== null) {
      const del: Delegation = val.item;
      if (del != null) {
        this.speakerlistService.addSpeaker(this.speakerlist.id, del.delegationId).subscribe(n => {
          this.addSpeakerSelection = '';
        });
      }
    }
  }

  //addQuestion() {
  //  const s = this.presetDelegations.find(n => n.Name == this.addQuestionSelection);
  //  this.speakerlistService.addQuestion(this.speakerlist.ID, s.ID).subscribe();
  //}

  nextSpeaker() {
    this.speakerlistService.nextSpeaker(this.speakerlist.id).subscribe();
  }

  nextQuestion() {
    this.speakerlistService.nextQuestion(this.speakerlist.id).subscribe();
  }

  toggleSpeaker() {
    if (this.speakerlist.status == 1) {
      this.speakerlistService.stopTimer(this.speakerlist.id).subscribe();
    } else {
      this.speakerlistService.startSpeaker(this.speakerlist.id).subscribe();
    }
  }

  toggleQuestion() {
    if (this.speakerlist.status == 2) {
      this.speakerlistService.stopTimer(this.speakerlist.id).subscribe();
    } else {
      this.speakerlistService.startQuestion(this.speakerlist.id).subscribe();
    }
  }

  clearSpeaker() {
    this.speakerlistService.clearSpeaker(this.speakerlist.id).subscribe();
  }

}
