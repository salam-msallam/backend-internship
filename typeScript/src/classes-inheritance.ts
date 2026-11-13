export enum VehicleStatus {
  Stopped = "STOPPED",
  Running = "RUNNING",
}

export type Coordinates = [
  latitude: number,
  longitude: number,
];

function assertNever(value: never): never {
  throw new Error(`Unhandled vehicle status: ${value}`);
}

export abstract class Vehicle {
  private _speed = 0;
  private _status: VehicleStatus = VehicleStatus.Stopped;
  private _location: Coordinates = [0, 0];

  constructor(
    public readonly brand: string,
    public readonly model: string,
  ) {}

  get speed(): number {
    return this._speed;
  }

  get status(): VehicleStatus {
    return this._status;
  }

  start(): void {
    this._status = VehicleStatus.Running;
    console.log(`${this.brand} ${this.model} started`);
  }

  stop(): void {
    this._speed = 0;
    this._status = VehicleStatus.Stopped;
  }

  getStatusLabel(): string {
    const status = this._status;

    switch (status) {
      case VehicleStatus.Stopped:
        return "Stopped";

      case VehicleStatus.Running:
        return "Running";

      default:
        return assertNever(status);
    }
  }

  protected parseAcceleration(amount: number | string): number {
    const value =
      typeof amount === "string"
        ? Number(amount.trim())
        : amount;

    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError(
        "Acceleration must be a positive finite number.",
      );
    }

    return value;
  }

  accelerate(amount: number | string): void {
    const value = this.parseAcceleration(amount);

    if (this._status !== VehicleStatus.Running) {
      throw new Error("Start the vehicle before accelerating.");
    }

    const newSpeed = this._speed + value;

    if (!Number.isFinite(newSpeed)) {
      throw new RangeError("Resulting speed is too large.");
    }

    this._speed = newSpeed;
  }

  setLocation(latitude: number, longitude: number): void {
    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new RangeError("Invalid coordinates.");
    }

    this._location = [latitude, longitude];
  }

  getLocation(): Coordinates {
    return [...this._location];
  }

  displayInfo(): void {
    console.log(`${this.brand} ${this.model}`);
    console.log(`Status: ${this.getStatusLabel()}`);
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
  private _batteryLevel = 100;
  private static readonly accelerationCost = 2;

  get batteryLevel(): number {
    return this._batteryLevel;
  }

  override accelerate(amount: number | string): void {
    if (this._batteryLevel < ElectricCar.accelerationCost) {
      throw new Error("Battery is empty. Charge the car first");
    }

    super.accelerate(amount);
    this._batteryLevel -= ElectricCar.accelerationCost;
  }

  charge(): void {
    this._batteryLevel = 100;
  }

  override displayInfo(): void {
    super.displayInfo();
    console.log(`Battery: ${this.batteryLevel}%`);
  }
}


const car = new ElectricCar("Tesla", "Model 3", 4);

car.start();
car.accelerate("20");
car.accelerate(10);
car.setLocation(33.5, 36.3);

const [latitude, longitude] = car.getLocation();

car.displayInfo();

console.log({ latitude, longitude });

car.stop();
console.log(car.speed); 

try {
  car.accelerate(10);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
    
  }
}