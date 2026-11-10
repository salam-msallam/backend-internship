
class Vehicle {
  brand: string;
  model: string;
  speed: number;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
    this.speed = 0;
  }

  start(): void {
    console.log(`${this.brand} ${this.model} is starting`);
  }

  accelerate(amount: number): void {
    this.speed += amount;
    console.log(`Current speed: ${this.speed} km/h`);
  }

  displayInfo(): void {
    console.log(`Brand: ${this.brand}`);
    console.log(`Model: ${this.model}`);
    console.log(`Speed: ${this.speed}`);
  }
}


class Car extends Vehicle {
  doors: number;

  constructor(brand: string, model: string, doors: number) {
    super(brand, model);
    this.doors = doors;
  }

  override displayInfo(): void {
    super.displayInfo();
    console.log(`Doors: ${this.doors}`);
  }
}


class ElectricCar extends Car {
  batteryLevel: number;

  constructor(brand: string, model: string, doors: number) {
    super(brand, model, doors);
    this.batteryLevel = 100;
  }

  charge(): void {
    this.batteryLevel = 100;
    console.log("Battery fully charged!");
  }

  override displayInfo(): void {
    super.displayInfo();
    console.log(`Battery: ${this.batteryLevel}%`);
  }
}


const car1 = new Car("Toyota", "kia", 4);
const electricCar1 = new ElectricCar("Tesla", "Model 3", 4);


car1.start();
car1.accelerate(50);
car1.displayInfo();


electricCar1.start();
electricCar1.accelerate(80);
electricCar1.charge();
electricCar1.displayInfo();
