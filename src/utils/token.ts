import { ITokenPayload } from "@/interfaces/user";
import jwt from "jsonwebtoken";

export const generateUserToken = ({
  //מייבא אובייקטים מהסוג של האינטרפייס הנל
  _id,
  username,
  email,
}: ITokenPayload): string => {
  //יוצר להם טוקאן
  return jwt.sign(
    {
      _id,
      username,
      email,
    },
    process.env.TOKEN_SECRET as string
  );
};
