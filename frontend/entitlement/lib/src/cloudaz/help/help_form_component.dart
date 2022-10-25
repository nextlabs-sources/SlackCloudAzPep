import 'package:angular/angular.dart';
import 'package:angular_forms/angular_forms.dart';
import 'package:entitlementForSlack/src/services/data_service.dart';

import 'help_model.dart';

@Component(
    selector: 'help-form',
    styleUrls: ['help_form_component.css'],
    templateUrl: 'help_form_component.html',
    directives: [coreDirectives, formDirectives],
    providers: [DataStorageService])
class HelpFormComponent {
  HelpModel helpModel = HelpModel();

  DataStorageService dataService;

  HelpFormComponent(this.dataService);

  void onSubmit() {
    dataService.saveUserQuery(helpModel);
  }
}
