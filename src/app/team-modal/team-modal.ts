import {Component,EventEmitter,inject,Input,Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../services/teamservice';

@Component({
  selector: 'app-team-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './team-modal.html',
  styleUrl: './team-modal.css'
})
export class TeamModal {
  private teamService = inject(TeamService);

  @Input() team: any = {};

  @Output() saved = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  saveTeam() {
    if (this.team.teamId) {
      this.teamService
        .updateTeam(this.team.teamId, this.team)
        .subscribe(() => this.saved.emit());

    } else {
      this.teamService
        .createTeam(this.team)
        .subscribe(() => this.saved.emit());

    }

  }

}