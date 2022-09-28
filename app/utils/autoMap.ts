import { ClassConstructor, plainToInstance } from 'class-transformer';

function autoMap<T, V>(dto: ClassConstructor<T>, model: V[]): T[];
// eslint-disable-next-line no-redeclare
function autoMap<T, V>(dto: ClassConstructor<T>, model: V): T;

// eslint-disable-next-line no-redeclare
function autoMap<T, V>(dto: ClassConstructor<T>, model: unknown): unknown {
  return plainToInstance(dto, model, {
    excludeExtraneousValues: true
  });
}

export default autoMap;
