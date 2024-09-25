import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UserService;

  const mockUserService = {
    createUser: jest.fn((userData) => {
      return {
        id: 1,
        ...userData,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UserService>(UserService);
  });

  describe('signUser', () => {
    it('should create a user and return it', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      expect(await usersController.signUser(userData)).toEqual({
        id: 1,
        ...userData,
      });
      expect(usersService.createUser).toHaveBeenCalledWith(userData);
    });
  });
});

