import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
  public privacyPolicyDialog:boolean = false;
  public policyDialog:boolean = false;

  closePopup() {
    this.privacyPolicyDialog = false;
    this.policyDialog = false;
  }
}
