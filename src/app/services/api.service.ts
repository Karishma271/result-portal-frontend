import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'https://result-portal-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  // 🎓 Student view
  viewStudent(uid: string, grade: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/student/view?uid=${uid}&grade=${grade}`);
  }

  // 🔐 Admin login
  login(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/login`, data);
  }

  // 📤 Admin upload marksheet
  uploadStudent(data: FormData, token: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/student/upload`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // 🗑 Delete student
  deleteStudent(uid: string, grade: number, token: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/student/delete?uid=${uid}&grade=${grade}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
