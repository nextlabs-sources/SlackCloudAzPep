class HelpModel {
  String name, email, subject, phone, company, message;
  final String _sourceType = "slack";

  HelpModel({this.name: "", this.email: "", this.subject: "", this.message: "",
    this.phone: "", this.company: ""});

  String toString() => "$company, $name, $email, $phone, $subject, $message";


  factory HelpModel.fromJson(Map<String, dynamic> model) =>
    HelpModel(name: model['name'], email: model['email'],
        phone: model['phone'], company: model['company'],
        subject: model['subject'],
        message: model['message']);

  Map toJson() => {
    'sourceType' : _sourceType,
    'name' : name, 
    'email': email, 
    'subject': subject,
    'phone' : phone, 
    'company': company,
    'message': message
  };

}