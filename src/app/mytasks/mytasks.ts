import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/tasksservice';
import { TaskModal } from '../task-modal/task-modal';


@Component({
  selector: 'app-mytasks',
  standalone: true,
  imports: [TaskModal, CommonModule],
  templateUrl: './mytasks.html',
  styleUrl: './mytasks.css',
})
export class Mytasks implements OnInit {
  private taskService = inject(TaskService);
  tasks: any[] = [];
  showModal = false;
  selectedTask: any = {};

  ngOnInit(): void {   
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(res => {this.tasks = res;});
  }

  openNewTaskModal() {

    this.selectedTask = {
      taskName: '',
      dueDate: '',
      statusTypeId: 'P',
      userId: 1,
      createdBy: 'Ioana'
    };

    this.showModal = true;
  }

  editTask(task: any) {
    this.selectedTask = { ...task };
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
}
