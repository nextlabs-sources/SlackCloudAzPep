import 'package:angular/angular.dart';
import 'package:angular_components/angular_components.dart';
import 'package:angular_router/angular_router.dart';

import 'src/routes.dart';

@Component(selector: 'my-app', templateUrl: 'app_component.html', styleUrls: [
  'app_component.css'
], directives: [
  DeferredContentDirective,
  MaterialButtonComponent,
  MaterialIconComponent,
  MaterialPersistentDrawerDirective,
  MaterialToggleComponent,
  MaterialListComponent,
  MaterialListItemComponent,
  MaterialMenuComponent,
  DropdownMenuComponent,
  routerDirectives,
], providers: [
  materialProviders,
  ClassProvider(Routes),
], exports: [
  RoutePaths,
  Routes
])
class AppComponent {
  var name = 'Angular';

  final String title = 'Entitlement for Slack';
  final Routes routes;

  AppComponent(this.routes);
}
