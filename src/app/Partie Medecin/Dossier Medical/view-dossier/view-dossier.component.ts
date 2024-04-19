import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DossierMedical } from 'src/app/Modeles/DossierMedecial';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';
import { DossierService } from 'src/app/Services/Medecin/Dossier Medical/dossier.service';

@Component({
  selector: 'app-view-dossier',
  templateUrl: './view-dossier.component.html',
  styleUrls: ['./view-dossier.component.css']
})
export class ViewDossierComponent implements OnInit {
  imageParDefaut : string='';
  medecin : any ; 
  nomPrenomMedecin : any ; 
  imagePath : any ; 
  p : number =1 ; 
  dossiers:DossierMedical[] =[];

 constructor(private dossierService:DossierService,private router:Router  , private service : AdminDigitalService){}

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

      this.service.getAllMedecins().subscribe(data => {
        this.service.MedecinData =  data;
        this.service.testTabMedecins = this.service.MedecinData.length;
        console.log("les mdecins sont :"+this.service.MedecinData) ;
  }); 
  });
}
  
  set texte(a:string){
    this.dossiers=this.filtrer(a);
  }
  filtrer(a: string) {
    return this.dossiers.filter(x => x.idDossier.toString().indexOf(a) !== -1);
}


refreshList(){
  this.dossierService.getDossier().subscribe(data =>{
    this.dossiers=data;
  } );
   }
   onDelete(id:number){
    this.dossierService.deleteDossier(id).subscribe({

      next:(res: any)=>{
      alert("Dossier Deleted successfully");
      this.refreshList();
      },
      error:(res: any)=>{
      alert("error");
      },
      })
   }
   onEdit(id:number){
    this.router.navigateByUrl(`/update/${id}`);
   }
   logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
