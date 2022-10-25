import 'dart:html';
import 'package:angular/angular.dart';
import 'package:angular_router/angular_router.dart';
import 'package:angular_components/angular_components.dart';

@Component(
  selector: 'cloudaz-ack-panel',
  styleUrls: ['cloudaz_ack.css'],
  templateUrl: 'cloudaz_ack.html',
  directives: [
    DeferredContentDirective,
    MaterialButtonComponent,
    MaterialIconComponent,
    routerDirectives
  ],
)
class CloudAzAcknowledgePanel implements OnActivate {
  String teamId = "";
  String workspaceName = "";

  @override
  void onActivate(_, RouterState current) async {
    workspaceName = current.parameters['workspace'];
    teamId = current.parameters['team'];
  }

  void gotoSlackWorkspace() {
    //String workspaceUrl = "https://slack.com/app_redirect?app=AAHGJGCHY?team=${teamId}";
    String workspaceUrl = "https://app.slack.com/client/${teamId}";
    window.open(workspaceUrl, "_target");
  }

  void gotoDesktopWorkspace() {
    String workspaceUrl = "slack://open?team=${teamId}";
    window.open(workspaceUrl, "_blank");
  }
}
