import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  uploadForm!: FormGroup;
  selectedFile: File | null = null;
  success: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.uploadForm = this.fb.group({
      uid: ['', Validators.required],
      grade: ['', Validators.required],
      name: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  upload() {
    this.success = '';
    this.error = '';

    if (this.uploadForm.invalid || !this.selectedFile) {
      this.error = 'All fields and a PDF file are required.';
      return;
    }

    const formData = new FormData();
    formData.append('uid', this.uploadForm.value.uid);
    formData.append('grade', this.uploadForm.value.grade);
    formData.append('name', this.uploadForm.value.name);
    formData.append('file', this.selectedFile);

    const token = localStorage.getItem('token') || '';

    this.api.uploadStudent(formData, token).subscribe({
      next: () => {
        this.success = 'Student record uploaded successfully!';
        this.uploadForm.reset();
        this.selectedFile = null;
      },
      error: () => {
        this.error = 'Upload failed. Please check your input or token.';
      }
    });
  }
}
