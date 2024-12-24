import { ITokenPayload } from "@/interfaces/user";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const checkauthorisation = () => {
  const token = cookies().get("access_token")?.value;
  if (!token) return false;

  //מאמת לי את הטוקאן הנוכחי לצורך אבטחה ובודק שהוא לא שונה מהטוקאן שג"ינרטתי
  const decodedToken = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string
  ) as ITokenPayload;
  return decodedToken; //לאחר שבדקתי שיש לי טוקאן והוא שווה לטוקאן שג"נרטתי אז אני מחזיר אותו כאן
};
