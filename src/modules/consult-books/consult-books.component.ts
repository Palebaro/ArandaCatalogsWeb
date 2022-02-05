import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BooksModel } from 'src/app/models/booksModel';
import { BooksService } from 'src/app/api/services/books.service';
import { AuthorsService } from 'src/app/api/services/authors.service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'consult-books',
  templateUrl: './consult-books.component.html',
  styleUrls: ['./consult-books.component.scss']
})
export class ConsultBooksComponent implements OnInit {
  loadIsService: boolean = false;
  loadEnd: boolean = false;
  form;
  listaServicios;
  authors: BooksModel;
  maxDate: Date;
  minDate: Date;
  displayedColumns: string[] = ['id', 'title', 'description', 'pageCount','excerpt','publishDate'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<BooksModel>();
  sortedData: BooksModel[];

  constructor(private booksService : BooksService,private authorsService : AuthorsService,private formBuilder: FormBuilder,private snackBar: MatSnackBar) {
    this.form = formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      firstName: [''],
      lastName: ['']
    });
    this.sortedData = this.dataSource.data.slice();
   }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

/**
 * Consulta de turnos registrados
 */
 getBookByFilters(){
  this.loadIsService = true;
    this.booksService.getBooks(this.form.value).subscribe(resp => {
      this.dataSource.data = resp;
      this.loadIsService = false;
      this.loadEnd = true;
    },
    error =>{
      console.error(error);
    });
  }

  loadDataInDB(){
    this.dataSource.data = [];
    this.loadEnd = false;
    this.loadIsService = true;
    this.booksService.loadDataBooks().subscribe(() => {
      this.authorsService.loadDataAuthors().subscribe(() => {
        this.snackBar.open('Se realizó con exito la carga de libros y autores.','X',{
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.loadIsService = false;
      }, 
      error =>{
        console.error(error); 
        this.loadIsService = false;
      });
    },
    error =>{ 
      console.error(error); 
      this.loadIsService = false;
    });

  }

/**
 * Establece fecha minima de ingreso
 * @param event 
 */
  changeStartDate(event){
    this.minDate = event.value;
  }
/**
 * Establece fecha maxima de ingreso
 * @param event 
 */
  changeEndDate(event){
    this.maxDate = event.value;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Id':
          return this.compare(a.Id, b.Id, isAsc);
        case 'PageCount':
          return this.compare(a.PageCount, b.PageCount, isAsc);
        case 'PublishDate':
          return this.compare(a.PublishDate, b.PublishDate, isAsc);
        case 'Description':
          return this.compare(a.Description, b.Description, isAsc);
        case 'Title':
          return this.compare(a.Title, b.Title, isAsc);
        default:
          return 0;
      }
    });
  }


compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


}
