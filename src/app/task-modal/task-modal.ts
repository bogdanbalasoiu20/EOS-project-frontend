import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/tasksservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { StatusService } from '../../services/statusservice';

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

  @Input() task: any = {
    taskName: '',
    dueDate: '',
    statusTypeId: 'P',   
    userId: 1,           
    createdBy: 'Ioana'   
  };

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  statuses: any[] = [];

  ngOnInit(): void {
    this.statusService.getStatuses().subscribe(res => {

      console.log('RES:', res);

      this.statuses = res.filter(status =>
        ['Pending', 'In Progress', 'Completed', 'Cancelled']
          .includes(status.statusName)
      );

      console.log('FILTERED:', this.statuses);

    });
  }


  saveTask() {
    if (!this.task.userId) {
      this.task.userId = 1;
    }

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
