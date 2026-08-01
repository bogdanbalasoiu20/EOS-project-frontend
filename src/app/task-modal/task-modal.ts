import { Component, inject, Input, Output, EventEmitter, signal } from '@angular/core';
import { TaskService } from '../../services/tasksservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { StatusService } from '../../services/statusservice';
import { UserService } from '../../services/userservice';
import { TeamService } from '../../services/teamservice';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css',
})
export class TaskModal implements OnInit {
  private taskService = inject(TaskService);
  private statusService = inject(StatusService);
  private teamService = inject(TeamService);

  @Input() task: any = {
    taskName: '',
    dueDate: '',
    statusTypeId: 'P',   
    userId: null,
    teamId: null
  };
  @Input() fixedTeamId: number | null = null; // daca taskmodal este deschis din TeamDetails, atunci echipa este fixa si nu poate fi schimbata

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  statuses = signal<any[]>([]);
  teams= signal<any[]>([]);
  users= signal<any[]>([]);

  ngOnInit(): void {

    this.loadStatuses();

    // TaskModal deschis din TeamDetails
    if (this.fixedTeamId != null) {
      this.task.teamId = this.fixedTeamId;
      this.loadMembers(this.fixedTeamId);

    } else {
      // TaskModal deschis din MyTasks
      this.loadTeams();

      // dupa ce aleg o echipa, trebuie sa incarcam membrii acesteia
      if (this.task.teamId != null) {
        this.loadMembers(this.task.teamId);
      }

    }
  }

  loadStatuses() {
    this.statusService.getStatuses().subscribe(res => {
      const filteredStatuses = res.filter(status =>
        ['Pending', 'In Progress', 'Completed', 'Cancelled']
          .includes(status.statusName)
      );

      this.statuses.set(filteredStatuses);

    });
  }

  loadTeams() {
    this.teamService.getTeams().subscribe(res => {
      this.teams.set(res);
    });

  }

  loadMembers(teamId: number) {
    this.teamService.getMembers(teamId).subscribe(res => {
      this.users.set(res);
    });

  }

  // Daca se schimba echipa, trebuie sa resetam userId si sa incarcam membrii noii echipe
  onTeamChange() {
    this.task.userId = null;
    this.users.set([]);

    if (this.task.teamId != null) {
      this.loadMembers(this.task.teamId);
    }
  }


  saveTask() {

    if (this.task.taskId) {
      this.taskService
        .updateTask(this.task.taskId, this.task)
        .subscribe(() => this.saved.emit());
    } else {
      this.taskService
        .createTask(this.task)
        .subscribe((task) => this.saved.emit()
        );
    }
  }
}
