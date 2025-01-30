#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Ethernet.h>

//Rede
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};

// (port 80 is default for HTTP):
EthernetServer server(80);
EthernetClient client;

#define idEstufa 3;
#define nome "arduino";
#define idEmpresa 1;
//FUNÇÕES
void controlador(float&,float&);

// PINS
#define pin_dht 22
#define pin_relayUm 23
#define pin_relayCooler 24
#define pin_relayHeater 25

DHT_Unified dht(pin_dht, DHT11);
// ALVOS - SUBSTITUIR POR ENTRADA BD
// Valores usados tomando cultivo ideal de shimejis como referência
#define PISO_UMIDADE 80.00
#define PISO_TEMP 13.00
#define TETO_TEMP 18.00

int Status = 1;
int delayMS;
void setup() {
  
  Serial.begin(9600);

  //inicializacao de rede
  Ethernet.begin(mac);
  server.begin();
  Serial.print("server esta: ");
  Serial.println(Ethernet.localIP());


  //inicialização de sensores

  dht.begin();

  pinMode(pin_relayUm, OUTPUT);
  pinMode(pin_relayCooler, OUTPUT);
  pinMode(pin_relayHeater, OUTPUT); 

  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  //DIAGNÓSTICO DO SENSOR
  /* Serial.println(F("------------------------------------"));
  Serial.println(F("Temperature Sensor"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("°C"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("°C"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("°C"));
  Serial.println(F("------------------------------------")); */
  // Print humidity sensor details.
  dht.humidity().getSensor(&sensor);
  /* Serial.println(F("Humidity Sensor"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("%"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("%"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("%"));
  Serial.println(F("------------------------------------")); */
  int delayMS = sensor.min_delay / 1000;
}

//delay assincronos 
//um s é equivalente a 25 segundos
int s = 146;

void loop() {

  delay(2000);

  sensors_event_t event;
  float temp;
  float umidade;
  int status = 1;
  // Obtenção de valores pelo evento do DHT e alocação em variáveis específicas para uso posterior
  dht.temperature().getEvent(&event);
  temp = event.temperature;
  dht.humidity().getEvent(&event);
  umidade = event.relative_humidity;

  //verificação da Estufa servidor 
  if (client.connect("otboxserver.000webhostapp.com", 80)){
  if(!isOnline()){
    PrimeiraConexao(temp, umidade);
  }else{
    //145 s é uma hora
    if(s > 144){
    s = 0;
    addHistoico(temp, umidade);
    }
  }
  }else{
    //Serial.print("conexacao falhou, tentando novamente ...");
  }

  // Descomente para monitorar a entrada
  /*if (isnan(temp)) {
    Serial.println("Erro de temperatura!");
  } else {
    Serial.print("Temperatura: ");
    Serial.print(temp);
    Serial.println(("C"));
  }

  if (isnan(umidade)) {
    Serial.println("Erro de umidade!");
  } else {
    Serial.print("Umidade: ");
    Serial.print(umidade);
    Serial.println(("%"));
  }*/
  
  controlador(temp, umidade);
  delay(20000);
  s++;
}


// Liga os climatizadores correspondentes caso estejam fora da range alvo, desliga-os caso entrem na range (com uma margem de segurança)
// Valores passados por referência (&) para otimização de memória
void controlador(float &temp, float &umidade) {
  String alvos = getAlvos();
  int PISO_UMIDADE1 =  alvos.substring(0,2).toInt();
  double tempAlvo =  alvos.substring(2,6).toDouble();
  double TETO_TEMP1 = tempAlvo + 3;
  double PISO_TEMP1 = tempAlvo - 3;

  if (temp > TETO_TEMP1) {
    digitalWrite(pin_relayCooler, HIGH);
    //Serial.println("Alto Umidade");
    Status = 2;
  }
  delay(100);
  if (temp < PISO_TEMP1) {   
    digitalWrite(pin_relayHeater, HIGH);
    //Serial.println("baixa Temp");
    Status = 2;
  }
  delay(100);
  if (umidade < PISO_UMIDADE1) {
    digitalWrite(pin_relayUm, HIGH);
    //Serial.println("baixa Umidade");
  }
  delay(100);

  // Por se tratar de cogumelos, a umidade alvo é sempe um valo alto, deixando a margem de segurança extensa (+5)
  if (umidade > PISO_UMIDADE1+5) {
    digitalWrite(pin_relayUm, LOW);
    //Serial.println("alta Umidade");
  }
  delay(100);
  // De forma similar, a temperatura dos cogumelos deve estar em uma range sensível, por isso optado o uso de +2 e -2 para a margem de segurança
  if ((temp < TETO_TEMP1-2) && (temp > PISO_TEMP1+2)) {
    digitalWrite(pin_relayCooler, LOW);
    digitalWrite(pin_relayHeater, LOW);
  }
  delay(100);
}


//Pedaço de rede
void PrimeiraConexao(float &temp, float &umidade) {
  //A Primeira conexão assim que for inciado a primeira vez do arduino ele se adicionara ao banco de dados.
  
  //Serial.println("Iniciando Primeira Conexao...");
  String dados = "{\"Operation\":\"addEstufa\",\"Content\":{\"nome\":\"";
  dados += nome;
  dados += "\",\"temp\":\"";
  dados += String(temp,2);
  dados += "\",\"umidade\":\""; 
  dados += String(umidade,2);
  dados += "\",\"status\":\"";
  dados += "1";
  dados += "\",\"idEstufa\":\"";
  dados += idEstufa;
  dados += "\",\"fk_idEmpresa\":\"";
  dados += "1";
  dados += "\"}}";

  String result = Operacao(dados);
  //Serial.println(result);
}

String getAlvos () {
    String dados = "{\"Operation\":\"getEstufaAlvo\",\"Content\":{\"idEstufa\":\"";
  dados += idEstufa;
  dados += "\"}}";

  String result = Operacao(dados);
  return result;
}

void addHistoico(float &temp, float &umidade){
  String dados = "{\"Operation\":\"addHistorico\",\"Content\":{\"idEstufa\":\"";
  dados += idEstufa;
  dados += "\",\"temp\":\"";
  dados += String(temp,2);
  dados += "\",\"umidade\":\""; 
  dados += String(umidade,2);
  dados += "\"}}";

  String result = Operacao(dados);
  //Serial.println(result + " Historico");
}

void UpdateEstufa(float &temp, float &umidade){
 String dados = "{\"Operation\":\"UpdateEstufa\",\"Content\":{\"idEstufa\":\"";
  dados += idEstufa;
  dados += "\",\"temp\":\"";
  dados += "\",\"status\":\""; 
  dados += Status;
  dados += "\",\"fk_idEmpresa\":\""; 
  dados += idEmpresa;
  dados += "\"}}";  

  String result = Operacao(dados);
  //Serial.println(result + " atualizado");
}

String Operacao(String dados){
  if (client.connect("otboxserver.000webhostapp.com", 80)){
  String line = "";
  String envio = "";
  envio = "POST /Connect.php HTTP/1.1\n";
  envio += "Host: otboxserver.000webhostapp.com\n";

  envio += String("Device-Token: ") + "f7b5f893-b980-4f6f-9400-15ff7f7438d4" + "\n";
  envio += " ssl: false\n";
  envio += String("Content-Type: ") + "application/json" + "\n";

  envio += String("Content-Length: ") + String(dados.length()) + "\n";
  envio += "\n";
  envio += dados;
  //Serial.println(envio);

  client.print(envio);
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 10000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }

  // Read all the lines of the reply from server and print them to Serial
  String result = "";
  int c = 0;
  while (client.available()) {
    line = client.readStringUntil('\r');
    if (c == 13){
      result = line;
    }
    //Descomente a linha abaixo para ver o cabecalho da operacao
    //Serial.print(line + " " + c);
    c++;
  }
  client.stop();
  //Serial.println();
  result.trim();
  return result;
  //Serial.println("closing connection");
  //Serial.println();
  }else{
  //Serial.println("falho");
  }
}

bool isOnline () {
  //Verificara se ja fostes adicionado antes.
  String dados = "{\"Operation\":\"VerifyEstufa\",\"Content\":{\"idEstufa\":\"";
  dados += idEstufa;
  dados += "\"}}";

  String result = Operacao(dados);
  if (result ==  "0"){
    return false;
  }else {
    return true;
  }
  //Serial.println(result);
}
