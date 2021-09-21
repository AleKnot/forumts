const usuariosController = require('../Controller/usuario-controller');

const bcryptjs = require("bcryptjs");


exports.efetuarLogin = async ({ senha, usuario }) => {

    console.log('Entrou no Efetuar Login - Login Controller')

    const usuarioEncontrado = await usuariosController.buscarUsuarioPorUsuario(usuario);
 
    if (!usuarioEncontrado) {
      throw new Error('Usuário não encontrado');
    }
    
    const {dataValues: usuarioValidado } = usuarioEncontrado;

    const hashed = usuarioValidado.senha;

    const isPassWordValid = bcryptjs.compareSync(senha, hashed);

          if (!isPassWordValid) {
            throw new Error('Senha Incorreta');
          }

    const {senha: removeSenha, ...usuarioSemSenha} = usuarioValidado;

    return usuarioSemSenha;

  };

  