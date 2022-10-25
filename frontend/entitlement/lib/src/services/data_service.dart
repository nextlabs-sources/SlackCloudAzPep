import 'dart:convert';

import 'package:http/http.dart';

import '../config/app_config.dart';
import '../cloudaz/help/help_model.dart';

class DataStorageService {
  final Client _http;

  DataStorageService(this._http);

  Future saveUserQuery(HelpModel helpModel) async {
    //fb.DatabaseReference  ref = fb.database().ref('pkg_firebase/examples/database');

    dynamic _headers = {
      "Content-Type": "application/json",
      "x-api-key": AppConfig.questionApiKey,
    };

    try {
      final Response response = await _http.post(AppConfig.questionUrl,
          headers: _headers, body: json.encode(helpModel.toJson()));

      dynamic data = json.decode(response.body)['data'];
    } catch (e) {
      print(e);
      return Exception('Server error; cause: $e');
    }
  }
}
