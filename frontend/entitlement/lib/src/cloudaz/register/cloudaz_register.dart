import 'package:angular/angular.dart';
import 'package:angular_router/angular_router.dart';
import 'package:angular_components/angular_components.dart';
import 'package:angular_forms/angular_forms.dart';

@Component(
    selector: 'cloudaz-register-panel',
    styleUrls: ['cloudaz_register.css'],
    templateUrl: 'cloudaz_register.html',
    directives: [
      DeferredContentDirective,
      MaterialButtonComponent,
      MaterialIconComponent,
      routerDirectives,
      formDirectives
    ])
class CloudAzRegistrationPanel {}
