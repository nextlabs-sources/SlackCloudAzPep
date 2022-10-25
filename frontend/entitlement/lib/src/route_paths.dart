import 'package:angular_router/angular_router.dart';

class RoutePaths {
  static final home = RoutePath(path: 'home');
  static final privacy = RoutePath(path: 'privacy');
  static final help = RoutePath(path: 'help');
  static final contact = RoutePath(path: 'contact');
  static final cloudaz = RoutePath(path: 'cloudaz');
  static final cloudaz_reg = RoutePath(path: 'cloudaz_reg');
  static final skydrm = RoutePath(path: 'skydrm');
  static final cloudaz_ack = RoutePath(path: 'cloudaz_ack/:workspace/:team');
  static final others = RoutePath(path: '/**');
}
