import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProductsModel } from 'src/app/models/ProductsModel';

import { ProductsService } from 'src/app/api/services/products.service';
import { CategorysService } from 'src/app/api/services/categorys.service';
import {Sort} from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'consult-products',
  templateUrl: './consult-products.component.html',
  styleUrls: ['./consult-products.component.scss']
})
export class ConsultProductsComponent implements OnInit {
  loadIsService: boolean = false;
  loadEnd: boolean = false;
  form;
  listaServicios;
  products: ProductsModel;
  maxDate: Date;
  minDate: Date;
  displayedColumns: string[] = ['Name', 'Description', 'Category','Image','Action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<ProductsModel>();
  sortedData: ProductsModel[];
  categorysList: any;

  constructor(private productsService : ProductsService,
              private categorysService : CategorysService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
              this.form = formBuilder.group({
                Name: [''],
                Description: [''],
                CategoryId: [''],
                Image: ['']
              });
              this.sortedData = this.dataSource.data.slice();
   }

  ngOnInit(): void {
    this.getCategorys();
  }

  ngAfterViewInit() {
  }

/**
 * Consulta de turnos registrados
 */
 getCategorys(){
  this.loadIsService = true;
    this.categorysService.getCategorys().subscribe(resp => {
      this.categorysList = resp;
      this.loadIsService = false;
      this.loadEnd = true;
    },
    error =>{
      console.error(error);
    });
  }

 getByFilters(){
  this.loadIsService = true;
    this.productsService.getProducts(this.form.value).subscribe(resp => {
      this.dataSource.data = [...resp];
      this.loadIsService = false;
      this.loadEnd = true;
    },
    error =>{
      console.error(error);
    });
  }

  CreateProductsInDB(){
    this.loadIsService = true;
      this.productsService.createProduct(this.form.value).subscribe(() => {
        this.snackBar.open('Se ha creado el producto '+ this.form.value.Name,'X',{
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.getByFilters();
        this.loadIsService = false;
      }, 
      error =>{
        console.error(error); 
        this.loadIsService = false;
      });
  }

  DeleteProductsInDB(Product){
    this.productsService.deleteProduct(Product.Id).subscribe(() => {
      this.snackBar.open('Se elimino el producto '+ Product.Name,'X',{
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      const indexData = this.dataSource.data.findIndex(d => d.Id == Product.Id);
      if(indexData != -1){
        this.dataSource.data.splice(indexData,1);
        this.dataSource.data = [...this.dataSource.data];
      }
      this.loadIsService = false;
    }, 
    error =>{
      console.error(error); 
      this.loadIsService = false;
    });
  }

  showModalEdit(data){

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
        case 'Name':
          return this.compare(a.Name, b.Name, isAsc);
        case 'Description':
          return this.compare(a.Description, b.Description, isAsc);
        case 'CategoryName':
          return this.compare(a.CategoryName, b.CategoryName, isAsc);
        default:
          return 0;
      }
    });
  }


  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
