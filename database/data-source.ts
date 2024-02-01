import { DataSource } from "typeorm";
import { MatchEntity } from "./entity/Match.entity";
import { typeORMDriver } from 'react-native-quick-sqlite';
import { TemplateEntity } from "./entity/Template.entity";

export const dataSource = new DataSource({
  database: 'scoutingapp-typeorm.db',
  entities: [MatchEntity, TemplateEntity],
  location: './entity',
  logging: [],
  synchronize: true,
  type: 'react-native',
  driver: typeORMDriver,
})