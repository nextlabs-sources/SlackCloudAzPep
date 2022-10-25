import 'package:angular/angular.dart';
import 'package:angular_components/angular_components.dart';

@Component(
  selector: 'cloudaz-privacy-panel',
  styleUrls: ['privacy_panel.css'],
  templateUrl: 'privacy_panel.html',
  directives: [
    DeferredContentDirective,
    MaterialButtonComponent,
    MaterialIconComponent
  ],
  //providers: const [materialProviders]
)
class CloudAzPrivacyPanel {}
