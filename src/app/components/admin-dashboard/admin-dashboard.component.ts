import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {
  uploadForm: FormGroup;
  file: File | null = null;
  success = false;
  error = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      uid: ['', Validators.required],
      grade: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    if (!this.file) return;

    const formData = new FormData();
    formData.append('uid', this.uploadForm.value.uid);
    formData.append('grade', this.uploadForm.value.grade);
    formData.append('file', this.file);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('https://result-portal-backend.onrender.com/api/admin/upload', formData, { headers })
      .subscribe({
        next: () => {
          this.success = true;
          this.error = false;
        },
        error: () => {
          this.success = false;
          this.error = true;
        }
      });
  }
}
