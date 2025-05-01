import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.scss']
})
export class StudentResultComponent implements OnInit {
  resultForm!: FormGroup;
  grades: number[] = [3, 4, 5, 6, 7, 8];
  pdfUrl: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.resultForm = this.fb.group({
      grade: ['', Validators.required],
      uid: ['', [Validators.required, Validators.maxLength(12)]]
    });
  }

  viewResult() {
    this.error = '';
    this.pdfUrl = '';

    if (this.resultForm.invalid) return;

    const { uid, grade } = this.resultForm.value;

    this.api.viewStudent(uid, grade).subscribe({
      next: (res: any) => {
        if (res.pdfFilename) {
          this.pdfUrl = `https://result-portal-backend.onrender.com/api/student/pdf/${res.pdfFilename}`;
        } else {
          this.error = 'Result not found. Please check your UID or standard.';
        }
      },
      error: () => {
        this.error = 'Unable to fetch result. Please try again.';
      }
    });
  }
}
