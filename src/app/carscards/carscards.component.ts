import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carscards',
  templateUrl: './carscards.component.html',
  styleUrls: ['./carscards.component.css']
})
export class CarscardsComponent {
  getall: any[] = [];

  @Input() showExplore: boolean = false; // Default to true
  @Input() numberOfCards: number = 100000;  // Number total of cards

  // A method to return the first `numberOfCards` items
  get displayedCards() {
    return this.getall.slice(0, this.numberOfCards);
  }
  carNumber: string = '';
  carName: string = '';
  ownerName: string = '';
  ownerPhoneNumber: string = '';
  whatsappNumber: string = '';
  email: string = '';
  manufacturer: string = '';
  model: string = '';
  year: number | null = null;
  color: string = '';
  idCar: number | null = null;
  vin: string = '';
  type: string = '';
  price: Number = 0;
  isediting :boolean = false;
  isadding :boolean = false;
  constructor(private http: HttpClient,  private el: ElementRef, private router: Router) {
    this.getallvehicles();
  }
  closePopup() {
    this.isadding = false;
    this.isediting = false;
  }
 // In your component TypeScript file
carPicture: File | null = null; // Change from string to File or null

additem() {
    const formData = new FormData();
    formData.append('carNumber', this.carNumber);
    formData.append('carName', this.carName);
    formData.append('ownerName', this.ownerName);
    formData.append('ownerPhoneNumber', this.ownerPhoneNumber);
    formData.append('whatsappNumber', this.whatsappNumber);
    formData.append('email', this.email);
    formData.append('manufacturer', this.manufacturer);
    formData.append('model', this.model);
    if (this.year != null) {
        formData.append('year', this.year.toString());
    } else {
        formData.append('year', '0');
    }
    formData.append('color', this.color);
    formData.append('vin', this.vin);
    formData.append('type', this.type);
    if (this.price != null) {
        formData.append('price', this.price.toString());
    } else {
        formData.append('price', '0');
    }

    if (this.carPicture) { // Check if a file is selected
        formData.append('carPicture', this.carPicture, this.carPicture.name);
    }

    this.http.post("http://localhost:8088/borkizi/addvehicle", formData, {
        responseType: 'text'
    }).subscribe({
        next: (dataResult: any) => {
            console.log(dataResult);
            alert(dataResult);
            this.getallvehicles(); // Refresh the list after adding
        }
    });

    this.isadding = false;
}

onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
        this.carPicture = file; // Store the selected file
    }
  }

  logout() {
    this.router.navigate(['/']); // Navigate to the login page
  }
  getallvehicles() {
    this.http.get("http://localhost:8088/borkizi/getvehicle").subscribe({
      next: (dataResult: any) => {
        console.log(dataResult);
        this.getall = dataResult;
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
        alert('Failed to fetch vehicles. Please try again.');
      }
    });
  }
  adding(){
    this.isadding = true ;
  }
  updatevehicle(item: any) {
    console.log('Updating vehicle:', item); 
    this.carName = item.carName;
    this.idCar = item.idCar
    this.carPicture = item.carPicture;
    this.ownerName = item.ownerName;
    this.ownerPhoneNumber = item.ownerPhoneNumber;
    this.whatsappNumber = item.whatsappNumber;
    this.email = item.email;
    this.manufacturer = item.manufacturer;
    this.model = item.model;
    this.year = item.year;
    this.color = item.color;
    this.vin = item.vin;
    this.type = item.type;
    this.price = item.price;
    this.carNumber = item.carNumber;
    this.isediting = true
  }
  save() {
    const formData = new FormData();
    if (this.idCar != null) {
      formData.append('idCar', this.idCar.toString());
  } else {
      console.error("ID is missing or null.");
      return;  // You can choose how to handle this case (e.g., showing an error message or stopping the form submission)
  }    
  formData.append('carNumber', this.carNumber);
    formData.append('carName', this.carName);
    formData.append('ownerName', this.ownerName);
    formData.append('ownerPhoneNumber', this.ownerPhoneNumber);
    formData.append('whatsappNumber', this.whatsappNumber);
    formData.append('email', this.email);
    formData.append('manufacturer', this.manufacturer);
    formData.append('model', this.model);
    console.log('Car Name:', this.carName);

    
    if (this.year != null) {
        formData.append('year', this.year.toString());
    } else {
        formData.append('year', '0');
    }
    
    formData.append('color', this.color);
    formData.append('vin', this.vin);
    formData.append('type', this.type);
    
    if (this.price != null) {
        formData.append('price', this.price.toString());
    } else {
        formData.append('price', '0');
    }
    
    if (this.carPicture) {
        formData.append('carPicture', this.carPicture, this.carPicture.name);
    }

    this.http.put("http://localhost:8088/borkizi/updatevehicle", formData, {
        responseType: 'text'
    }).subscribe({
        next: (response: any) => {
            console.log('Vehicle updated:', response);
            alert(response);
            this.getallvehicles(); // Refresh list
        }
    });
    this.isediting = false;
}


  
  deleteitem(item: any) {
    this.http.delete('http://localhost:8088/borkizi/deletevehicle/' + item.idCar, { responseType: 'text' })
      .subscribe((dataResult: any) => {
        console.log(dataResult);
        alert(dataResult);
        this.getallvehicles();
      });

  }
}