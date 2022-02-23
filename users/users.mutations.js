import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      const encryptedPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: encryptedPassword,
        },
      });
    },
  },
};
