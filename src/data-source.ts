import 'reflect-metadata';
import { DataSource, MultiPolygon } from 'typeorm';
import { Observable, map } from 'rxjs';
import * as fs from 'fs';
import { env } from './libs/common';
import { District, Member, Score } from './entity';
import path = require('path');
import { logger } from './libs/common/logger';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: +env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: false,
  logging: false,
  entities: [Member, Score, District],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
});

export async function databaseInit(retryCount = 0) {
  if (retryCount !== 0) {
    logger.error(`Retry Database Init : ${retryCount}`);
  }

  AppDataSource.initialize()
    .then(async () => {
      // Member Data Seeding
      const memberRepo = AppDataSource.getRepository(Member);

      if (!(await memberRepo.exists())) {
        logger.info('[Start] Member Data Seeding ...');

        memberJsonStream.subscribe(async (datas) => {
          const members: Member[] = datas.map((data) => ({
            ...data,
            location: {
              type: 'Point',
              coordinates: data.coordinates.map((val) => parseFloat(val)),
            },
          }));

          // issue : 대량의 데이터를 save시 오류가 발생하여 chunk로 나눠서 실행
          await memberRepo.save(members, { chunk: members.length / 1000 });
          logger.info('[End] Member Data Seeding ...');
        });
      }

      // District Data Seeding
      const districtRepo = AppDataSource.getRepository(District);

      if (!(await districtRepo.exists())) {
        logger.info('[Start] District Data Seeding ...');

        districtGeoJsonStream.subscribe({
          next: async (data) => {
            const districts = data.features.map((geo) =>
              districtRepo.create({
                osm_id: geo.properties.osm_id.toString(),
                geometry: geo.geometry,
              })
            );

            await districtRepo.save(districts, {
              chunk: districts.length / 1000,
            });

            logger.info('[End] District Data Seeding ...');
          },
        });
      }
    })
    .catch((error) => {
      logger.error(error);
      if (retryCount !== 10) {
        setTimeout(() => {
          databaseInit(retryCount + 1);
        }, 3000);
      }
    });
}

const memberJsonStream = new Observable<string>((sub) => {
  sub.next(path.join(__dirname, '../data/user_data/user01.json'));
  sub.next(path.join(__dirname, '../data/user_data/user02.json'));
  sub.next(path.join(__dirname, '../data/user_data/user03.json'));
  sub.next(path.join(__dirname, '../data/user_data/user04.json'));
  sub.next(path.join(__dirname, '../data/user_data/user05.json'));
  sub.next(path.join(__dirname, '../data/user_data/user06.json'));
  sub.next(path.join(__dirname, '../data/user_data/user07.json'));
  sub.next(path.join(__dirname, '../data/user_data/user08.json'));
  sub.next(path.join(__dirname, '../data/user_data/user09.json'));
  sub.next(path.join(__dirname, '../data/user_data/user10.json'));
  sub.next(path.join(__dirname, '../data/user_data/user11.json'));
  sub.next(path.join(__dirname, '../data/user_data/user12.json'));
  sub.complete();
}).pipe(
  map((path) => {
    const data = fs.readFileSync(path, 'utf-8');
    console.log('[Wait] Read file : ', path);
    return JSON.parse(data) as any[];
  })
);

const districtGeoJsonStream = new Observable<string>((sub) => {
  sub.next(path.join(__dirname, '../data/korea.geojson'));
  sub.complete();
}).pipe(
  map((path) => {
    const data = fs.readFileSync(path, 'utf-8');
    console.log('[Wait] Read file : ', path);
    return JSON.parse(data) as {
      type: string;
      features: {
        type: string;
        geometry: MultiPolygon;
        properties: { osm_id: number };
      }[];
    };
  })
);
