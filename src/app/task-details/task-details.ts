import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { TaskService } from '../../services/tasksservice';
import { TaskComment } from '../models/TaskComment';
import { TaskCommentService } from '../../services/taskcommentservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css'
})
export class TaskDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private commentService = inject(TaskCommentService);
  comments = signal<TaskComment[]>([]);
  newComment = '';
  task = signal<any>(null);
  taskId!: number;
  expandedReplies = signal<number[]>([]);  // contine id-urile comentariilor pentru care sunt afisate raspunsurile
  loggedUsername = localStorage.getItem('username');
  replyingTo: TaskComment | null = null;
  replyText = '';
  editingComment: TaskComment | null = null;
  editedText = '';

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('taskId'));

    this.taskService.getTaskById(this.taskId).subscribe(res => {
      this.task.set(res);
    });

    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(this.taskId).subscribe({
      next: comments => this.comments.set(comments)
    });
  }


  createComment() {

    if (!this.newComment.trim()) {
      return;
    }

    this.commentService.createComment(this.taskId, {content: this.newComment}).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments();
      }
    });
  }


  toggleReplies(commentId: number) {
    const expanded = this.expandedReplies(); //iau lista de comentarii deja expandate

    // verific daca comentariul curent este deja in lista de comentarii expandate. 
    if (expanded.includes(commentId)) {
      this.expandedReplies.set( expanded.filter(id => id !== commentId)); // daca este deja expandat, il elimin din lista de comentarii expandate, pentru a ascunde reply-urile
    } else {
      this.expandedReplies.set([ // daca nu este expandat, il adaug in lista de comentarii expandate, pentru a afisa reply-urile
        ...expanded,
        commentId
      ]);
    }

  }

  // Metoda pentru a verifica daca reply-urile unui comentariu sunt expandate sau nu
  areRepliesExpanded(commentId: number): boolean {
    return this.expandedReplies().includes(commentId);
  }


  deleteComment(comment: TaskComment) {

    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    this.commentService.deleteComment(this.taskId, comment.commentId).subscribe({
        next: () => this.loadComments()
      });
  }


  replyTo(comment: TaskComment) {
    this.replyingTo = comment;
    this.replyText = '';
  }

  cancelReply() {
    this.replyingTo = null;
    this.replyText = '';
  }


  submitReply() {

    if (!this.replyingTo || !this.replyText.trim()) {
      return;
    }

    const parentId = this.replyingTo.commentId;

    this.commentService.createComment(this.taskId, {content: this.replyText, parentCommentId: parentId}).subscribe({
      next: () => {
        this.replyText = '';
        this.replyingTo = null;

        if (!this.areRepliesExpanded(parentId)) {
          this.toggleReplies(parentId);
        }

        this.loadComments();
      }
    });

  }



  editComment(comment: TaskComment) {
    this.editingComment = comment;
    this.editedText = comment.content;
  }


  cancelEdit() {
    this.editingComment = null;
    this.editedText = '';
  }


  saveEdit() {

    if (!this.editingComment || !this.editedText.trim()) {
      return;
    }

    this.commentService.updateComment(this.taskId, this.editingComment.commentId, {content: this.editedText}).subscribe({
      next: () => {
        this.editingComment = null;
        this.editedText = '';

        this.loadComments();
      }
    });

  }

  



}