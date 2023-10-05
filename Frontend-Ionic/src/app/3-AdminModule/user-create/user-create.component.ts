import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/Models/user';
import { AdminService } from 'src/app/Services/admin.service';
import { AlertService } from 'src/app/Services/alert.service';
import { CustomValidatorsService } from 'src/app/Services/custom-validators.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent{

  createUserForm: FormGroup;
  user: User;
  selectLine:string;
  emailAlert:boolean = false;

  constructor(
    public adminService: AdminService,
    private formBuilder:FormBuilder,
    private alert:AlertService,
    private validator:CustomValidatorsService,
    private loadingCtrl:LoadingController
    ) {
    
    this.createUserForm = this.formBuilder.group({
      name: ['',
              [
                Validators.required,
                Validators.minLength(2)
              ]
            ],
      surname: ['',
              [
                Validators.required,
                Validators.minLength(2)
              ]
            ],
      email: ['',
              [
                Validators.required,
                this.validator.emailPattern()
              ]
            ],
      role: ['', Validators.required
        ]
    })

  }
  async createUser(user) {
      user.email = user.email.toLowerCase();
      user.name = this.replaceInput(user.name);
      user.surname= this.replaceInput(user.surname);
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom'

      });
      await loading.present();
      this.adminService.addUser(user).subscribe(res => {
        if(res.success===false){
          this.alert.alertToast(res.message,false)
        }else{
          this.adminService.dataUsers.push(res.data)
          this.alert.alertToast(res.message, true)
        }
        loading.dismiss()
      });
  }

  replaceInput(data:string){
    let dataLower = data.toLowerCase();
    return dataLower[0].toUpperCase()+dataLower.slice(1)
  }

}
