import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ListsModule } from './lists/lists.module';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { ListsController } from './lists/lists.controller';
import { ListsService } from './lists/lists.service';
import { List } from './lists/lists.entity';
import { Item } from './items/items.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'todo',
      entities: [List, Item],
      synchronize: process.env.PRODUCTION === 'true',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ListsModule,
    ItemsModule,
  ],
  controllers: [ItemsController, ListsController],
  providers: [ItemsService, ListsService],
})
export class AppModule {}
