import {Component,EventEmitter,inject,Input,OnInit,Output, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../services/teamservice';

@Component({
  selector: 'app-add-member-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-member-modal.html',
  styleUrl: './add-member-modal.css'
})
export class AddMemberModal implements OnInit {
  private teamService = inject(TeamService);

  @Input() teamId!: number;

  @Output() saved = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  users = signal<any[]>([]);

  selectedUserId: number | null = null;

  ngOnInit(): void {
    this.teamService.getUsersNotInTeam(this.teamId)
      .subscribe(res => this.users.set(res));

  }

  addMember() {
    if (!this.selectedUserId) {
      return;
    }

    this.teamService.addMember(this.teamId, this.selectedUserId).subscribe(() => this.saved.emit());

  }

}