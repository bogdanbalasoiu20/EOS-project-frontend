import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/tasksservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { StatusService } from '../../services/statusservice';
import { UserService } from '../../services/userservice';

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
  private userService = inject(UserService);

  @Input() task: any = {
    taskName: '',
    dueDate: '',
    statusTypeId: 'P',   
    userId: null,           
    createdBy: 'Ioana'   
  };

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  statuses: any[] = [];
  users: any[] = [];

  ngOnInit(): void {
    this.statusService.getStatuses().subscribe(res => {

      this.statuses = res.filter(status =>
        ['Pending', 'In Progress', 'Completed', 'Cancelled']
          .includes(status.statusName)
      );

      this.userService.getUsers().subscribe(users => {
        this.users = users;
      });

    });
  }


  saveTask() {
    if (!this.task.createdBy) {
      this.task.createdBy = 'Ioana';
    }

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
