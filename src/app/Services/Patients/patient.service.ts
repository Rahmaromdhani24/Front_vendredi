import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  islogin = false;
  admin = false;
  DepartementData :any=[];
  testTabDepartement : number ; 
  MedecinData :any=[];
  testTabMedecins : number ; 
  PatientData :any=[];
  testTabPatients : number ;
  SecretairesData :any=[];
  testTabSecretaires : number ; 
  constructor(private http: HttpClient) { }
 

  private urlRegistrePatient = 'http://localhost:8281/patient/signupPatient';
  registre( value: any): Observable<any> {
  return this.http.post(`${this.urlRegistrePatient}` , value);} 

  private urlLogin = 'http://localhost:8281/patient/login';
  login(username : string, password: string) {
  return this.http.post(`${this.urlLogin}`,{username, password});}
  
  private urlAdminDigital = 'http://localhost:8281/patient/getPatient';
  getPatient(id: number): Observable<Object> {
  return this.http.get(`${this.urlAdminDigital}/${id}`);}

  private urlUpdate= 'http://localhost:8281/patient/updatePatient';
  updatPatient(id: number, value: any ): Observable<Object> {
  return this.http.put(`${this.urlUpdate}/${id}`, value);}

  private urlImage= 'http://localhost:8281/patient/updateImageProfilePatient';  
  updateImagePatient(id: number, file : File): Observable<any> {
  return this.http.put(`${this.urlImage}/${id}`,file);}
      
 
}
