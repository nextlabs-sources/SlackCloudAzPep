import 'package:angular/angular.dart';
import 'package:angular_components/angular_components.dart';

@Component(
    selector: 'contact-panel',
    styleUrls: ['contact_panel.css'],
    templateUrl: 'contact_panel.html',
    directives: [
      DeferredContentDirective,
      MaterialButtonComponent,
      MaterialIconComponent
    ])
class ContactPanel {}
