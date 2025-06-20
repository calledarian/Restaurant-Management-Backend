import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableModule } from './table/table.module';
import { SessionModule } from './session/session.module';
import { MenuItemModule } from './menu-item/menu-item.module';


@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    synchronize: true,

  }),
    TableModule,
    SessionModule,
    MenuItemModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
