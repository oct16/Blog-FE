#include <iostream>
using namespace std;

const double PI = 3.14159246;
class circle
{
public:
  circle(double r){ radius = r;};
  virtual double area() { return 0.0; };
  virtual double volume() {return 0.0; };
protected:
  double radius;
};

class sphere:public circle
{
public:
  sphere(double r):circle(r){};
  virtual double area() { return 4*radius*radius*PI; };
  virtual double volume() { return 4*radius*radius*radius*PI/3; };
};

int main()
{
  // sphere s(2);
  // circle *c = &s;
  circle *c = new sphere(2);
  cout << c->area() << endl;
  cout << c->volume() << endl;

}
