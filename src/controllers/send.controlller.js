
export const sendMethod = async (req, res) => {
  const { method, email } = req.body;
  console.log("sendMethod", method, email)
  if ((method == null || method === '') || (email == null || email === '')) {
    return res.status(400).json({ msg: 'Bad Request. Please enter all fields' });
  }

  try {

    // const emailResponse = await fetch(`http://localhost:3010/api/users/email/${email}`);
    const emailResponse = await fetch(`https://api-rest-sport.vercel.app/api/users/email/${email}`);

    if (emailResponse.status === 404) {
      return res.status(401).json({ msg: 'User not found' });
    }

    if (emailResponse.status !== 200) {
      return res.status(500).json({ msg: 'Error retrieving user data' });
    }

    const userData = await emailResponse.json();
    //console.log('userData ', userData)
    if (method === '1') {
      const response = await fetch('https://api-rest-sport.vercel.app/api/send-email', {
      // const response = await fetch('http://localhost:3001/api/send-email', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Fallo al enviar tu correo de recuperación');
      }

      const responseData = await response.json();
      const randomCode = responseData.randomCode;

      userData.randomCode = randomCode;
      // console.log('userData ', userData)
    } else if (method === '2') {

      console.log('Método en desarrollo');
      return res.status(200).json(userData);

    } else {
      return res.status(400).json({ msg: 'Invalid method' });
    }

    try {
      // const response = await fetch('http://localhost:3001/api/token', {
      const response = await fetch('https://api-rest-sport.vercel.app/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id: userData.ID_usuario,
          recovery_code: userData.randomCode
        }),
      });
      if (!response.ok) {
        throw new Error('Failed');
      }

      return res.status(200).json(userData);
    } catch (error) {
      console.log('error5005 ', error.message)
      return res.status(500).json({ msg: error.message });
    }
  } catch (error) {
    console.log('error5005 ', error.message)
    return res.status(500).json({ msg: error.message });
  }
};

export const enviarCorreoBloquear = async (req, res) => {
  const { intentosFallidos, email } = req.body;
  console.log("intentosFallidos", intentosFallidos, email)
  if ((intentosFallidos == null || intentosFallidos === '') || (email == null || email === '')) {
    return res.status(400).json({ msg: 'Bad Request. Please enter all fields' });
  }

  try {

    const response = await fetch('https://api-rest-sport.vercel.app/api/envio-cuenta-nobloqueada', {
    // const response = await fetch('http://localhost:3001/api/envio-cuenta-nobloqueada', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        intentosFallidos
      }),
    });
    // console.log("NObloqueddo", response)
    if (!response.ok) {
      throw new Error('Fallo al enviar correo cuenta por bloquear');
    }
    // console.log("Envio correo casi bloqueado con exito")
    // res.status(200).json({ message: 'Envio correo casi bloqueado con exito' });
  } catch (error) {
    console.log('error5005 ', error.message)
    return res.status(500).json({ msg: error.message });
  }
};

export const enviarCorreoBloqueado = async (req, res) => {
  const { tiempoBloqueo, email } = req.body;
  console.log("tiempoBloqueo", tiempoBloqueo, email)
  if ((tiempoBloqueo == null || tiempoBloqueo === '') || (email == null || email === '')) {
    return res.status(400).json({ msg: 'Bad Request. Please enter all fields' });
  }

  try {
    // const response = await fetch('http://localhost:3001/api/envio-cuenta-bloqueado', {
    const response = await fetch('https://api-rest-sport.vercel.app/api/envio-cuenta-bloqueado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        tiempoBloqueo
      }),
    });
    // console.log("resbloqueddo", response)
    if (!response.ok) {
      throw new Error('Fallo al enviar tu correo de recuperación');
    }
    // console.log("Envio correo bloqueado con exito")
    // res.status(200).json({ message: 'Envio correo bloqueado con exito' });
  } catch (error) {
    console.log('error5005 ', error.message)
    return res.status(500).json({ msg: error.message });
  }
};

export const enviarCorreoNuevoInicioSesion = async (req, res) => {
  const { email } = req.body;
  if ((email == null || email === '')) {
    return res.status(400).json({ msg: 'Bad Request. Please enter all fields' });
  }

  try {
    // const response = await fetch('http://localhost:3001/api/envio-cuenta-nueva-sesion', {
    const response = await fetch('https://api-rest-sport.vercel.app/api/envio-cuenta-nueva-sesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
      }),
    });
    // console.log("NObloqueddo", response)
    if (!response.ok) {
      throw new Error('Fallo al enviar correo cuenta por bloquear');
    }
    // console.log("Envio correo casi bloqueado con exito")
    // res.status(200).json({ message: 'Envio correo casi bloqueado con exito' });
  } catch (error) {
    console.log('error5005 ', error.message)
    return res.status(500).json({ msg: error.message });
  }
};