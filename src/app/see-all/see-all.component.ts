import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardService } from '../card.service';

@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.css']
})
export class SeeAllComponent implements OnInit {
  getall: any[] = [];
  selectedItem: any = null; 
  isPopupVisible: boolean = false;

  constructor(private cardService: CardService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHomes();
  }
  openPopup(item: any): void {
    this.selectedItem = item;
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  deleteitem(item: any) {
    console.log('Deleting item with ID:', item.id);
    this.http.delete(`http://localhost:8088/borkizi/deletehome/${item.id}`, { responseType: 'text' })
      .subscribe({
        next: (dataResult: any) => {
          console.log(dataResult);
          alert(dataResult);
          this.loadHomes();
        }
      });
  }

  updatehome(item: any) {
    this.selectedItem = item; // Set selected item for editing
  }

  handleUpdate(updatedItem: any) {
    console.log('Updated Item:', updatedItem);
    this.http.put("http://localhost:8088/borkizi/updatehome", updatedItem, { responseType: 'text' })
    .subscribe((dataResult: any) => {
      console.log(dataResult);
      alert(dataResult);
      this.loadHomes();
    });
    this.loadHomes();
    this.closePopup();

  }

  loadHomes() {
    this.cardService.getAllHomes().subscribe({
      next: (data) => {
        this.getall = data;
      },
      error: (error) => {
        console.error('Error fetching homes:', error);
        alert('Failed to fetch homes. Please try again.');
      }
    });
  }
}
