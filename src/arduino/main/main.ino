int ir1 = A0;
int ir2 = A1;

String sensor1;
String sensor2;
void setup()
{
  pinMode(ir1, INPUT);
  pinMode(ir2, INPUT);
  Serial.begin(9600);
}
void loop()
{
  String data = "";
  park1();
  park2();
  data = sensor1 + " " + sensor2 + " ";
  Serial.println(data);
}
void park1()
{
  if (analogRead(ir1) > 60)
  {
    sensor1 = "0";
    delay(200);
  }
  if (analogRead(ir1) < 60)
  {
    sensor1 = "1";
    delay(200);
  }
}
void park2()
{
  if (analogRead(ir2) > 60)
  {
    sensor2 = "0";
    delay(200);
  }
  if (analogRead(ir2) < 60)
  {
    sensor2 = "1";
    delay(200);
  }
}