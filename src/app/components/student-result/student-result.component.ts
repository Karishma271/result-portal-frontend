import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html'
})
export class StudentResultComponent {
  resultForm: FormGroup;
  pdfUrl: string | null = null; 
  notFound = false;
  grades: string[] = ['3', '4', '5', '6', '7', '8'];

  constructor(private fb: FormBuilder, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.resultForm = this.fb.group({
      uid: ['', Validators.required],
      grade: ['', Validators.required]
    });
  }

  viewResult() {
    const { uid, grade } = this.resultForm.value;
    this.http.get<any>(`https://result-portal-backend.onrender.com/api/student/view?uid=${uid}&grade=${grade}`).subscribe({
      next: (res) => {
        this.notFound = false;
        this.pdfUrl = `https://result-portal-backend.onrender.com/api/student/pdf/${res.pdfFilename}`;

      },
      error: () => {
        this.pdfUrl = null;
        this.notFound = true;
      }
    });
  }
}
