import 'package:angular/angular.dart';
import 'package:angular_components/angular_components.dart';

@Component(
    selector: 'not-found-panel',
    styleUrls: ['not_found_panel.css'],
    templateUrl: 'not_found_panel.html',
    directives: [
      DeferredContentDirective,
      MaterialButtonComponent,
      MaterialIconComponent
    ])
class NotFoundPanel {}
