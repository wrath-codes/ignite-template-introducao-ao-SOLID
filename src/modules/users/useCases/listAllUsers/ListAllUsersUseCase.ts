import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);
    if (!user) {
      throw new Error(`User ${user.id} not found`);
    }
    if (user.admin === false) {
      throw new Error(`User ${user.id} is not an administrator`);
    }
    const users = this.usersRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
