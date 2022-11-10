import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.css']
})
export class ValueDialogComponent implements OnInit {

  valuesForm = this.fb.group({});
  valuesList:string[] = [];

  constructor(
    private dialogRef: MatDialogRef<ValueDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      valuesForm: FormGroup,
      valuesList: string[],
    }
  ) { 
    this.valuesForm = this.data.valuesForm;
    this.valuesList = this.data.valuesList;
  }

  ngOnInit(): void {
  }

  onCancel():void{
    this.dialogRef.close(this.data.valuesForm);
  }

  onSubmit():void{
    this.dialogRef.close(this.valuesForm);
  }

  toggleDisabled(controlName: string): void{
    if (!this.valuesForm.get(controlName + "_use")?.value){
      this.valuesForm.get(controlName + "_min")?.enable();
      this.valuesForm.get(controlName + "_max")?.enable();
    }
    else{
      this.valuesForm.get(controlName + "_min")?.disable();
      this.valuesForm.get(controlName + "_max")?.disable();
    }
  }
}
