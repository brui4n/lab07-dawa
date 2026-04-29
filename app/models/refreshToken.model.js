import crypto from "crypto";

export default (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define("refreshToken", {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    expiryDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  // Método estático para crear un token
  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();

    // 24 horas de expiración (86400 segundos)
    const expiredSeconds = 86400;
    expiredAt.setSeconds(expiredAt.getSeconds() + expiredSeconds);

    let _token = crypto.randomUUID();

    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt
    });

    return refreshToken.token;
  };

  // Método estático para verificar expiración
  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return RefreshToken;
};
