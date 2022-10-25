import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart';

import 'help_model.dart';

class HelpService {

  static final _headers = {'Content-Type': 'application/json'};
  static const _helpUrl = 'slack/cloudaz/help/email'; // URL to web API

  final Client _http;

  HelpService(this._http);

  dynamic _extractData(Response resp) => json.decode(resp.body)['data'];

  Future<String> sendHelp(HelpModel help) async {
    try {
      final response = await _http.post(_helpUrl,
          headers: _headers, body: help.toJson());

      return _extractData(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  Exception _handleError(dynamic e) {
    print(e); // for debug purposes only
    return Exception('Server error; cause: $e');
  }

}