var app = angular.module("app", []);
var l = null ;

app.controller('LanguageCtrl', ['$scope', function LanguageController($scope) {
  l = $scope.language = texts.sk;
  $scope.setLanguage = function (language) {
    $scope.language = texts[language];
    l = $scope.language ;
  };
}]);

var texts = {
  ru: {
    contact_us: "Cвязаться с нами",
    phone_number: "Номер телефона",
    your_name: "Ваше имя",
    submit: "Отправить",
    adress: "Наш адрес",
    sent : "Отправлено!",
    comment:"Введите сообщение",
    partner:"Партнер",
    certificate:"Сертификаты",
    sent_error: "Действие временно недоступное! \r\n Попробуйте позже или отправьте ваши контакты на нашу электронную почту указанную в контактах!" 
  },
  sk: {
    contact_us: "Kontaktujte nás", 
    phone_number: "Telefónne číslo",
    your_name: "Vaše meno",
    submit: "Predložiť",
    adress: "Naša adresa",
    sent: "Poslal!",
    comment:"Vložte vašu správu",
    partner:"Partner",
    certificate:"Certifikáty",
    sent_error: "Akcia je dočasne nedostupný!  \r\n Skúste to prosím neskôr alebo odoslať svoje kontaktné informácie na e-mailu uvedenom v kontaktoch"
      
  },
  en: {
    contact_us: "Contact us",
    phone_number: "Phone number",
    your_name: "Your name",
    submit: "Submit",
    adress: "Our adress",
    comment:"Enter your message",
    sent : "Sent!",
    partner:"Partner",
    certificate:"Certificates",
    sent_error: "Action is temporarily unavailable! \r\n Please try again later or send your contact information on our e-mail indicated in contacts"
  }
};

var myform = $("form#myform");
myform.submit(function(event){
	event.preventDefault();

	var params = myform.serializeArray().reduce(function(obj, item) {
      obj[item.name] = item.value;
      return obj;
  }, {});

  // Change to your service ID, or keep using the default service
  var service_id = "mandrill";

  var template_id = "feedback";
  myform.find("button").text("Sending...");
  emailjs.send(service_id,'for_pv',params);
  emailjs.send(service_id,'for_ml',params);
  emailjs.send(service_id,template_id,params)
  	.then(function(){ 
       myform.find("button").hide();
       myform.find("#form_sent").show();;
    }, function(err) {
       alert(l.sent_error);
    });
  return false;
});