import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RendezVous } from 'src/app/Modeles/Rendez-Vous';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { RendezVousService } from 'src/app/Services/Medecin/Rendez-vous/rendez-vous.service';
import { MedecinService } from 'src/app/Services/Medecin/medecin.service';

@Component({
  selector: 'app-view-rendez-vous',
  templateUrl: './view-rendez-vous.component.html',
  styleUrls: ['./view-rendez-vous.component.css']
})
export class ViewRendezVousComponent implements OnInit {
  p : number =1 ;
  medecin : any ; 
  nomPrenomMedecin : any ; 
  imagePath : any ; 
  imageParDefaut : any ;  
  rendez:RendezVous[]=[];
  constructor(private RendezService:RendezVousService,private router:Router , private service : AdminDigitalService){}
 
  ngOnInit() {
   this.service.getMedecin(parseInt(localStorage.getItem('idMedecin'))).subscribe(data=>{
     this.medecin=data;
     console.log( "Medecin Connecte  ", this.medecin.nom+" "+this.medecin.prenom);
     this.nomPrenomMedecin = this.medecin.nom+" "+this.medecin.prenom; 
     if(this.medecin.image ==null){
       this.imagePath="./assets/icons/user1.png";
       this.imageParDefaut="./assets/icons/user1.png";
     }
     else{
       this.imagePath="http://localhost:8281/medecin/getImageMedecin/"+this.medecin.id ; } 
   });
   this.RendezService.getRendez().subscribe(data =>{
    this.rendez=data ;
   })
 }

 Imprimer():void{
   window.print();
 }
 
 set texte(a:string){
   this.rendez=this.filtrer(a);
 }
 filtrer(a: string) {
   return this.rendez.filter(x=>x.Nom.indexOf(a)!= -1);
 }
 refreshList(){
   this.RendezService.getRendez().subscribe(data =>{
     this.rendez=data;
   } );
    }
 onDelete(id:number){
   this.RendezService.deleteRendez(id).subscribe({
 
     next:(res: any)=>{
     alert("Rendez-Vous Deleted successfully");
     this.refreshList();
     },
     error:(res: any)=>{
     alert("error");
     },
     })
 }
 logout() {
  localStorage.clear();
  this.router.navigate(['']);
}
 }
 