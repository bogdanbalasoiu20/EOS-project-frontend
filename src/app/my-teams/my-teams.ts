import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../services/teamservice';
import { TeamModal } from '../team-modal/team-modal';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-teams',
  standalone: true,
  imports: [CommonModule, TeamModal, RouterLink],
  templateUrl: './my-teams.html',
  styleUrl: './my-teams.css',
})
export class MyTeams implements OnInit {
  private teamService = inject(TeamService);

  leadingTeams = signal<any[]>([]);
  memberTeams = signal<any[]>([]);

  showModal = false;
  selectedTeam: any = {};

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getLeadingTeams().subscribe(res => {
      this.leadingTeams.set(res);
    });

    this.teamService.getMemberTeams().subscribe(res => {
      this.memberTeams.set(res);
    });

  }

  openNewTeamModal() {
    this.selectedTeam = {
      teamName: '',
      description: ''
    };

    this.showModal = true;
  }

  onTeamSaved() {
    this.showModal = false;
    this.loadTeams();
  }

  closeModal() {
    this.showModal = false;
  }

}