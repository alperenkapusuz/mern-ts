import Errors from "../exceptions/Errors";
import { HttpException } from "../exceptions/HttpException";
import { IUserModel } from "../interfaces/model/user.interface";
import { IUser } from "../interfaces/service/auth.interface";
import User from "../models/User";
import { isEmpty } from "../utils/util";
// import { validateEmail } from "../utils/validation";
import bcrypt from "bcrypt";
import { validateEmail } from "../utils/validation";

class AuthService {

  public async registerUser(userData: IUserModel): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, Errors.Empty);
    const email = userData.email.toLowerCase();
    const isEmailValid = await validateEmail(email);
    if(!isEmailValid) throw new HttpException(400, Errors.EmailInvalid);
    const findUser: IUser | null = await User.findOne({ email });
    if (findUser) throw new HttpException(409, Errors.EmailExist);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser = new User({ ...userData, email, password: hashedPassword });
    await createdUser.save();
    return createdUser;
  }
}

export default AuthService;