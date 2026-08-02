import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../services/teamservice';
import { AddMemberModal } from '../add-member-modal/add-member-modal';
import { TaskModal } from '../task-modal/task-modal';
import { TaskService } from '../../services/tasksservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [CommonModule, AddMemberModal, TaskModal, RouterLink],
  templateUrl: './team-details.html',
  styleUrl: './team-details.css',
})
export class TeamDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private teamService = inject(TeamService);
  private taskService = inject(TaskService);

  team: any = {};
  members = signal<any[]>([]);
  showAddMemberModal = false;
  showTaskModal = false;
  selectedTask: any = {};
  expandedMemberId = signal<number | null>(null);  // pastrez id-ul membrului al carui taskuri sunt afisate
  memberTasks = signal<Record<number, any[]>>({}); // pastrez taskurile pentru fiecare membru, indexate dupa userId; un obiect in care cheia este userId si valoarea este un array de taskuri
  unassignedTasks = signal<any[]>([]); // pastrez taskurile neatribuite pentru echipa
  unassignedExpanded = signal(false); // pastrez starea de afisare a taskurilor neatribuite pentru echipa
  unassignedTasksLoaded = signal(false);// pastrez starea de incarcare a taskurilor neatribuite pentru echipa

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

  toggleMemberTasks(userId: number) {

    // verific daca taskurile pentru acest membru sunt deja afisate; daca da, le ascundem
    if (this.expandedMemberId() === userId) {
      this.expandedMemberId.set(null);
      return;
    }

    //daca nu sunt afisate, le afisez si fac request pentru taskurile membrului respectiv
    this.expandedMemberId.set(userId);

    // verific daca am deja taskurile pentru acest membru; daca da, nu mai fac request
    if (this.memberTasks()[userId]) {
      return;
    }

    // requestul se face la apasarea butonului de afisare a taskurilor pentru un membru, si nu la incarcarea paginii, pentru a reduce numarul de requesturi si a imbunatati performanta
    this.taskService.getMemberTasks(this.team.teamId, userId).subscribe(tasks => {
        this.memberTasks.update(current => ({
          ...current, //copiez taskurile deja existente pentru alti membri
          [userId]: tasks // adaug taskurile pentru membrul curent, indexate dupa userId
        }));

      });
  }


  canManageTeam(): boolean {
    const loggedUsername = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    return role === 'ADMIN' || loggedUsername === this.team.teamLeaderUsername;
  }


  // functia care gestioneaza afisarea taskurilor neatribuite pentru echipa
  toggleUnassignedTasks() {

    // verific daca taskurile neatribuite sunt deja afisate; daca da, le ascundem
    if (this.unassignedExpanded()) {
      this.unassignedExpanded.set(false);
      return;
    }

    //daca nu sunt afisate, le afisez si fac request pentru taskurile neatribuite
    this.unassignedExpanded.set(true);

    // verific daca am deja taskurile neatribuite; daca da, nu mai fac request
    if (this.unassignedTasksLoaded()) {
      return;
    }

    this.taskService.getUnassignedTeamTasks(this.team.teamId).subscribe(tasks => {
        this.unassignedTasks.set(tasks); // setez taskurile neatribuite in signal
        this.unassignedTasksLoaded.set(true); // setez flag-ul pentru a indica ca taskurile neatribuite au fost deja incarcate
      });
  }

}