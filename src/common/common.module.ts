import { Global, Module } from "@nestjs/common";
import { CommonService } from "./common.services";
import { DatabaseModule } from "src/database/database.module";
import { ConfigModule } from "@nestjs/config";


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [CommonService],
  exports: [CommonService]
})

export class CommonModule { }