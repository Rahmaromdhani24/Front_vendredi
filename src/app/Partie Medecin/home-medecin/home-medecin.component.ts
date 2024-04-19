import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDigitalService } from 'src/app/Services/Admin Digital/admin-digital.service';

@Component({
  selector: 'app-home-medecin',
  templateUrl: './home-medecin.component.html',
  styleUrls: ['./home-medecin.component.css']
})
export class HomeMedecinComponent implements OnInit {
  medecin :any ; 
  nomPrenomAdmin : any ;
  imagePath : any ; 
   
  public constructor(private service : AdminDigitalService , private router : Router , private route : ActivatedRoute) { }

  ngOnInit() {
    this.service.getMedecin(parseInt(localStorage.getItem('idMedecin'))).subscribe(data=>{
      this.medecin=data;
      console.log( "Medecin Connecte  ", this.medecin.nom+" "+this.medecin.prenom);
      this.nomPrenomAdmin = this.medecin.nom+" "+this.medecin.prenom; 
      if(this.medecin.image ==null){
        this.imagePath="./assets/icons/user1.png"
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
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
