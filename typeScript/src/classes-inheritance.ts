export class Vehicle {
  private _speed: number = 0;

  constructor(
    public readonly brand: string,
    public readonly model: string,
  ) {}

  get speed(): number {
    return this._speed;
  }

  start(): void {
    console.log(`${this.brand} ${this.model} is starting`);
  }

  accelerate(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new RangeError(
        "Acceleration must be a positive finite number.",
      );
    }

    const newSpeed = this._speed + amount;

    if (!Number.isFinite(newSpeed)) {
      throw new RangeError("Resulting speed is too large.");
    }

    this._speed = newSpeed;
    console.log(`Current speed: ${this.speed} km/h`);
  }

  displayInfo(): void {
    console.log(`Brand: ${this.brand}`);
    console.log(`Model: ${this.model}`);
    console.log(`Speed: ${this.speed} km/h`);
  }
}

export class Car extends Vehicle {
  constructor(
    brand: string,
    model: string,
    public readonly doors: number,
  ) {
    super(brand, model);

    if (!Number.isInteger(doors) || doors <= 0) {
      throw new RangeError("Doors must be a positive integer.");
    }
  }

  override displayInfo(): void {
    super.displayInfo();
    console.log(`Doors: ${this.doors}`);
  }
}

export class ElectricCar extends Car {
  private _batteryLevel: number = 100;

  private static readonly accelerationCost: number = 2;

  get batteryLevel(): number {
    return this._batteryLevel;
  }

  override accelerate(amount: number): void {
    if (this._batteryLevel < ElectricCar.accelerationCost) {
      throw new Error("Battery is empty. Charge the car first.");
    }

    super.accelerate(amount);

    this._batteryLevel -= ElectricCar.accelerationCost;
    console.log(`Battery: ${this.batteryLevel}%`);
  }

  charge(): void {
    this._batteryLevel = 100;
    console.log("Battery fully charged!");
  }

  override displayInfo(): void {
    super.displayInfo();
    console.log(`Battery: ${this.batteryLevel}%`);
  }
}

// const car1 = new Car("Toyota", "Corolla", 4);
// const electricCar1 = new ElectricCar("Tesla", "Model 3", 4);

// car1.start();
// car1.accelerate(50);
// car1.displayInfo();

// electricCar1.start();
// electricCar1.accelerate(80);
// electricCar1.displayInfo(); 

// electricCar1.charge();
// electricCar1.displayInfo(); 

const testCar = new ElectricCar("Tesla", "Model 3", 4);


try {
  testCar.accelerate(-300);
} catch (error: unknown) {
  console.log(
    error instanceof Error ? error.message : "Unexpected error",
  );
}

console.log(testCar.speed);        
console.log(testCar.batteryLevel); 

for (let i = 0; i < 50; i++) {
  testCar.accelerate(1);
}

console.log(testCar.speed);        
console.log(testCar.batteryLevel); 

try {
  testCar.accelerate(1);
} catch (error: unknown) {
  console.log(
    error instanceof Error ? error.message : "Unexpected error",
  );
}

console.log(testCar.speed); 

testCar.charge();
testCar.accelerate(1);

console.log(testCar.speed);        
console.log(testCar.batteryLevel); 