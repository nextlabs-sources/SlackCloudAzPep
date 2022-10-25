import 'package:angular/angular.dart';
import 'package:angular_components/angular_components.dart';

@Component(
  selector: 'cloudaz-home-panel',
  styleUrls: ['home_panel.css'],
  templateUrl: 'home_panel.html',
  directives: [
    DeferredContentDirective,
    MaterialButtonComponent,
    MaterialIconComponent
  ],
)
class CloudAzHomePanel {
  /* Production */
  String clientId = "335057168789.357562556610";

  /* Development */
  // String clientId = "335057168789.364048172481";

}
