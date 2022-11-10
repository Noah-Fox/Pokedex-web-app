import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-checkbox-dialog',
  templateUrl: './checkbox-dialog.component.html',
  styleUrls: ['./checkbox-dialog.component.css']
})
export class CheckboxDialogComponent implements OnInit {

  checkForm = this.fb.group({
    type1: [true],
    type2: [false],
    type3: [false],
  });

  testForm = this.fb.group({
    name: [""],
    description: [""],
    isTall: [true],
  })

  constructor(
    private dialogRef: MatDialogRef<CheckboxDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      typesForm: FormGroup,
      typesList: string[]
    },
  ) {
    this.checkForm = this.data.typesForm;
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.dialogRef.close(this.checkForm);
  }

  onCancel(): void{
    this.dialogRef.close(this.data.typesForm);
  }

  selectAll(): void{
    for (let i = 0; i < this.data.typesList.length; i ++){
      this.checkForm.get(this.data.typesList[i])?.setValue(true);
    }
  }

  unselectAll(): void{
    for (let i = 0; i < this.data.typesList.length; i ++){
      this.checkForm.get(this.data.typesList[i])?.setValue(false);
    }
  }

}
