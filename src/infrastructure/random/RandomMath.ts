import { Minute } from "../../domain/models/Minute.js";
import { Random } from "../../domain/services/Random.js";

export class RandomMath implements Random {
  generateWithin(maxRandomMinute: Minute) {
    const randomness = Math.floor(Math.random() * maxRandomMinute.value);

    return new Minute(randomness);
  }
}
