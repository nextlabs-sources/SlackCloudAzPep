import 'package:angular/angular.dart';
import 'package:angular_components/angular_components.dart';

@Component(
    selector: 'default-home-panel',
    styleUrls: ['home_panel.css'],
    templateUrl: 'home_panel.html',
    directives: [
      DeferredContentDirective,
      MaterialButtonComponent,
      MaterialIconComponent
    ])
class HomePanel {}
