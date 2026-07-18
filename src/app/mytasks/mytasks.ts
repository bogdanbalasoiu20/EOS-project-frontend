import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/tasksservice';
import { TaskModal } from '../task-modal/task-modal';
import { StatusService } from '../../services/statusservice';
import { UserService } from '../../services/userservice';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mytasks',
  standalone: true,
  imports: [TaskModal, CommonModule,FormsModule],
  templateUrl: './mytasks.html',
  styleUrl: './mytasks.css',
})
export class Mytasks implements OnInit {
  private taskService = inject(TaskService);
  private statusService = inject(StatusService);
  private userService = inject(UserService);
  tasks = signal<any[]>([]);
  showModal = false;
  selectedTask: any = {};
  statuses: any[] = [];
  users: any[] = [];
  showFilters = false;

  searchCriteria = {
    keyword: '',
    status: '',
    userId: null as number | 'unassigned' | null,
    unassigned: false,
    dueDate: ''
  };

  ngOnInit(): void {
    this.loadTasks();

    this.statusService.getStatuses().subscribe(res => {
      this.statuses = res.filter(status =>
        ['Pending', 'In Progress', 'Completed', 'Cancelled']
          .includes(status.statusName)
      );
    });

    this.userService.getUsers().subscribe(res => {this.users = res;});
  }

  loadTasks(filters = this.searchCriteria) {
    this.taskService.getTasks(filters).subscribe(res => {
      this.tasks.set(res);
    });
  }

  openNewTaskModal() {

    //trimit catre TaskModal
    this.selectedTask = {
      taskName: '',
      dueDate: '',
      statusTypeId: 'P',
      userId: null,
      createdBy: 'Ioana'
    };

    this.showModal = true;
  }

  editTask(task: any) {
    this.selectedTask = { ...task }; //face o copie a obiectului task pentru a evita modificarea directa a acestuia
    this.showModal = true;
  }

  onTaskSaved() {
    this.showModal = false;
    this.loadTasks();
  }

  closeModal() {
    this.showModal = false;
  }

  deleteTask(taskId: number) {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(taskId).subscribe(() => {
      console.log("Deleted");
      this.loadTasks();
    });

  }

  searchTasks() {

    const filters = {
      ...this.searchCriteria
    };

    if (filters.userId === 'unassigned') {
      filters.userId = null;
      filters.unassigned = true;
    } else {
      filters.unassigned = false;
    }

    this.loadTasks(filters);

  }

  resetFilters() {
    this.searchCriteria = {
        keyword: '',
        status: '',
        userId: null,
        unassigned: false,
        dueDate: ''
    };

    this.loadTasks();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
