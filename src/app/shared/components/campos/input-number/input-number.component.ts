import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { ValidarCamposService } from "../validar-campos.service";

@Component({
  selector: "dio-input-number",
  templateUrl: "./input-number.component.html",
  styleUrls: ["./input-number.component.scss"],
})
export class InputNumberComponent implements OnInit {
  @Input() titulo: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() minimo: 0;
  @Input() maximo: 10;
  @Input() step: 1;

  constructor(public validacao: ValidarCamposService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  ngOnInit() {}
}
