import 'package:angular/angular.dart';
import 'package:angular_components/angular_components.dart';

import 'help_form_component.dart';

@Component(
  selector: 'cloudaz-help-panel',
  styleUrls: ['help_panel.css'],
  templateUrl: 'help_panel.html',
  directives: [
    DeferredContentDirective,
    MaterialButtonComponent,
    MaterialIconComponent,
    HelpFormComponent
  ],
)
class CloudAzHelpPanel {}
