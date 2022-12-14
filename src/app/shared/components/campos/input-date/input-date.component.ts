import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { ValidarCamposService } from "../validar-campos.service";

@Component({
  selector: "dio-input-date",
  templateUrl: "./input-date.component.html",
  styleUrls: ["./input-date.component.scss"],
})
export class InputDateComponent implements OnInit {
  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validacao: ValidarCamposService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  ngOnInit() {}
}
