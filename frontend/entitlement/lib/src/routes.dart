import 'package:angular/angular.dart';
import 'package:angular_router/angular_router.dart';

import 'route_paths.dart' as paths;
import 'default/home/home_panel.template.dart' as homePanel;
import 'default/error/not_found_panel.template.dart' as notFoundPanel;
import 'cloudaz/home/home_panel.template.dart' as cloudazPanel;
import 'cloudaz/help/help_panel.template.dart' as cloudazHelpPanel;
import 'cloudaz/privacy/privacy_panel.template.dart' as cloudazPrivacyPanel;
import 'cloudaz/register/cloudaz_ack.template.dart' as cloudazAckPanel;
import 'cloudaz/register/cloudaz_register.template.dart' as cloudazRegPanel;

export 'route_paths.dart';

@Injectable()
class Routes {
  RoutePath get home => paths.RoutePaths.home;
  RoutePath get help => paths.RoutePaths.help;
  RoutePath get privacy => paths.RoutePaths.privacy;
  RoutePath get contact => paths.RoutePaths.contact;
  RoutePath get cloudaz => paths.RoutePaths.cloudaz;
  RoutePath get cloudazReg => paths.RoutePaths.cloudaz_reg;
  RoutePath get cloudazAck => paths.RoutePaths.cloudaz_ack;
  RoutePath get skydrm => paths.RoutePaths.skydrm;
  RoutePath get notFound => paths.RoutePaths.others;

  final List<RouteDefinition> all = [
    RouteDefinition.redirect(
        path: '', redirectTo: paths.RoutePaths.cloudaz.toUrl()),
    RouteDefinition(
      path: paths.RoutePaths.home.path,
      component: homePanel.HomePanelNgFactory,
    ),
    RouteDefinition(
      path: paths.RoutePaths.privacy.path,
      component: cloudazPrivacyPanel.CloudAzPrivacyPanelNgFactory,
    ),
    RouteDefinition(
      path: paths.RoutePaths.help.path,
      component: cloudazHelpPanel.CloudAzHelpPanelNgFactory,
    ),
    RouteDefinition(
      path: paths.RoutePaths.cloudaz.path,
      component: cloudazPanel.CloudAzHomePanelNgFactory,
    ),
    RouteDefinition(
      path: paths.RoutePaths.cloudaz_reg.path,
      component: cloudazRegPanel.CloudAzRegistrationPanelNgFactory,
    ),
    RouteDefinition(
      path: paths.RoutePaths.cloudaz_ack.path,
      component: cloudazAckPanel.CloudAzAcknowledgePanelNgFactory,
    ),
    RouteDefinition(
      path: paths.RoutePaths.others.path,
      component: notFoundPanel.NotFoundPanelNgFactory,
    ),
  ];
}
