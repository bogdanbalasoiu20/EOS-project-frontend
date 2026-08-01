import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../services/teamservice';
import { AddMemberModal } from '../add-member-modal/add-member-modal';
import { TaskModal } from '../task-modal/task-modal';

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [CommonModule, AddMemberModal, TaskModal],
  templateUrl: './team-details.html',
  styleUrl: './team-details.css',
})
export class TeamDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private teamService = inject(TeamService);

  team: any = {};
  members = signal<any[]>([]);
  showAddMemberModal = false;
  showTaskModal = false;
  selectedTask: any = {};

  ngOnInit(): void {
    const teamId = Number(this.route.snapshot.paramMap.get('teamId'));

    this.teamService.getTeamById(teamId).subscribe(res => {
      this.team = res;
    });

    this.teamService.getMembers(teamId).subscribe(res => {
      this.members.set(res);
    });

  }

  openAddMemberModal() {
    this.showAddMemberModal = true;
  }

  closeAddMemberModal() {
    this.showAddMemberModal = false;
  }

  onMemberAdded() {
    this.showAddMemberModal = false;

    const teamId = Number(this.route.snapshot.paramMap.get('teamId'));

    this.teamService.getMembers(teamId).subscribe(res => this.members.set(res));

  }

  removeMember(userId: number) {
    if (!confirm('Are you sure you want to remove this member?')) {
      return;
    }

    this.teamService.removeMember(this.team.teamId, userId).subscribe(() => {
            this.teamService
                .getMembers(this.team.teamId)
                .subscribe(res => this.members.set(res));

        });

  }

  // acelasi taskmodal ca in mytasks, dar cu echipa fixa
  openNewTaskModal() {
    this.selectedTask = {
      taskName: '',
      dueDate: '',
      statusTypeId: 'P',
      userId: null,
      teamId: this.team.teamId
    };

    this.showTaskModal = true;
  }

  closeTaskModal() {
    this.showTaskModal = false;
  }

  onTaskSaved() {
    this.showTaskModal = false;
  }

}