import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    // Compile app module
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // Get the controller from the app module
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('Controller should be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
