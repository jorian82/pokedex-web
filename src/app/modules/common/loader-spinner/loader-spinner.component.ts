import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {LoaderService} from "../../../services/loader.service";

@Component({
  selector: 'app-loader-spinner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.css'
})
export class LoaderSpinnerComponent {
  constructor(public loader: LoaderService) {
  }
}
