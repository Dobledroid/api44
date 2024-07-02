import nodemailer from 'nodemailer';
import { generateRandomCode } from './generate_token.controller';

import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

export const sendRecoveryEmail = async (req, res) => {
  const { to } = req.body;

  try {
    const randomCode = generateRandomCode();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sportgymcenterinfo@gmail.com',
        pass: 'faol swhy ktje sibg',
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: 'sportgymcenterinfo@gmail.com',
      to,
      subject: 'Sport Gym Center Recuperación',
      html: `
      <h2>Recuperación de contraseña</h2>
      <p>Usted ha solicitado la recuperación de su contraseña. En caso de no requerirla, simplemente ignore este mensaje.</p>
      <p style="text-align: center; color: green; font-size: 20px;"><strong>Sport Gym Center</strong></p>
      </br>
      <p style="font-size: 20px;">Su token es: <strong>${randomCode}</strong></p>
      </br>
      </br>
      <p>Gracias por utilizar el sistema integral Sport Gym Center, estamos a sus órdenes…</p>
      <br>
      <div">
        <p><strong>ATENTAMENTE</strong></p>
        <p>Administradores del Sport Gym Center</p>
        <p>Lic. Jair Morales Franco</p>
        <p>Lic. Leonardo Angeles</p>
        <p>Ing. Carlos Alberto Hernández Hernández</p>
        <p>Ing. Osmar Aldair Yerana Martinez</p>

        <div>
          <div id="m_-1593910572140205789">
            <div dir="ltr" style="margin-left:0pt" align="left">
                <table style="border:none;border-collapse:collapse">
                  <colgroup>
                      <col width="128">
                      <col width="237">
                      <col width="16">
                      <col width="252">
                  </colgroup>
                  <tbody>
                      <tr style="height:57.354pt">
                        <td rowspan="2" style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:Nunito,sans-serif"><span style="font-size:12pt;font-weight:800;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:98px;height:99px"><img src="https://res.cloudinary.com/dubearvua/image/upload/v1708208527/CorreoSportGymCenter/g1we2d92ikclrnzbtsno.jpg" width="98" height="99" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></span></span></span></span><br></p>
                        </td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><b><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:14pt;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">Jair Morales Franco</span></span></b></span></span><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,153,153)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:600;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">Jefe De Operaciones</span></span></span></span><br></p>
                        </td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br></td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-left:13.5pt;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(0,0,0)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:125px;height:51px"><img src="https://res.cloudinary.com/dubearvua/image/upload/v1708208557/CorreoSportGymCenter/rgmd406khgbgmjyue261.jpg" width="124.99999999999999" height="46.211331659074744" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></span></span></span></span><br></p>
                        </td>
                      </tr>
                      <tr style="height:45pt">
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">+52 77-17-93-55-63</span></span></span></span><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><a href="mailto:sportgymcenterinfo@gmail.com" target="_blank"><span class="il">sportgymcenterinfo@gmail.com</span></a></span></span></span></span><br></p>
                        </td>
                        <td style="border-right:solid rgb(139,197,64) 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br></td>
                        <td style="border-left:solid rgb(139,197,64) 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.38;margin-left:18pt;margin-top:0pt;margin-bottom:0pt">
                              <a href="http://" style="text-decoration:none" target="_blank" ><span style="background-color:transparent">
                              <span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">
                                www.</span></span></span></span></a><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-left:18pt;margin-top:0pt;margin-bottom:0pt">
                              <a href="https://www.facebook.com/profile.php?id=100063449692054" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/TresiteMx/&amp;source=gmail&amp;ust=1708294497091000&amp;usg=AOvVaw1eKgcTpkqJEQD7upOrovKJ"><span style="background-color:transparent"><span style="color:rgb(17,85,204)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt"><u style="font-weight:400;font-style:normal;font-variant:normal;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:19px;height:19px"><img src="https://lh5.googleusercontent.com/me18V6ysrRI24Zypj-knh44XvUlKsOhZWq8zgazy3dmTMmvjLqvyFyr7Q0bfXCwhQvkh8jnwOGDrqSOinFSZmfnQGZfvPWnTePfxuTgj-Jxju9Kjv-DkqG2fFc68PaeKoHWerD8LKoTdyOdbRpwiROHU9DkaaSo3XkHmIo6gpkR_-dGtrucnQBs" width="19" height="19" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></u></span></span></span></span></a>
                        </td>
                      </tr>
                  </tbody>
                </table>
            </div>
            <div class="yj6qo"></div>
            <div class="adL"><br></div>
          </div>
        </div>
      </div>


      `,
    };

    // Envío del correo
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);

    res.status(200).json({ message: 'Correo enviado con éxito', randomCode });

  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};

export const envioCorreoAccesoNoBloqueado = async (req, res) => {
  const { to, intentosFallidos } = req.body;
  console.log("to, intentosFallidos", to, intentosFallidos)
  try {
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sportgymcenterinfo@gmail.com',
        pass: 'faol swhy ktje sibg',
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: 'sportgymcenterinfo@gmail.com',
      to,
      subject: 'Intento de Acceso a tu Cuenta Sport Gym Center',
      html: `
      <h2>Intento de Acceso a tu Cuenta</h2>
      <p>Recientemente hemos detectado intentos de acceso fallidos a tu cuenta. Si has sido tú quien ha realizado estos intentos, puedes ignorar este mensaje con tranquilidad.</p>
      <p style="text-align: center; color: green; font-size: 20px;"><strong>Sport Gym Center</strong></p>
      <br/>
      <p style="font-size: 20px;">Número de Intentos Fallidos: <strong>${intentosFallidos}</strong></p>
      <br/><br/>
      <p>Para obtener más información o si tienes alguna preocupación, por favor contáctanos en sportgymcenterinfo@gmail.com.</p>
      <br/>
      <p>Agradecemos tu confianza en nuestro sistema integral de Sport Gym Center. ¡Estamos aquí para ayudarte!</p>
      <br/>
      
      <br>
      <div">
        <p><strong>ATENTAMENTE</strong></p>
        <p>Administradores del Sport Gym Center</p>
        <p>Lic. Jair Morales Franco</p>
        <p>Lic. Leonardo Angeles</p>
        <p>Ing. Carlos Alberto Hernández Hernández</p>
        <p>Ing. Osmar Aldair Yerana Martinez</p>

        <div>
          <div id="m_-1593910572140205789">
            <div dir="ltr" style="margin-left:0pt" align="left">
                <table style="border:none;border-collapse:collapse">
                  <colgroup>
                      <col width="128">
                      <col width="237">
                      <col width="16">
                      <col width="252">
                  </colgroup>
                  <tbody>
                      <tr style="height:57.354pt">
                        <td rowspan="2" style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:Nunito,sans-serif"><span style="font-size:12pt;font-weight:800;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:98px;height:99px"><img src="https://res.cloudinary.com/dubearvua/image/upload/v1708208527/CorreoSportGymCenter/g1we2d92ikclrnzbtsno.jpg" width="98" height="99" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></span></span></span></span><br></p>
                        </td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><b><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:14pt;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">Jair Morales Franco</span></span></b></span></span><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,153,153)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:600;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">Jefe De Operaciones</span></span></span></span><br></p>
                        </td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br></td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-left:13.5pt;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(0,0,0)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:125px;height:51px"><img src="https://res.cloudinary.com/dubearvua/image/upload/v1708208557/CorreoSportGymCenter/rgmd406khgbgmjyue261.jpg" width="124.99999999999999" height="46.211331659074744" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></span></span></span></span><br></p>
                        </td>
                      </tr>
                      <tr style="height:45pt">
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">+52 77-17-93-55-63</span></span></span></span><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><a href="mailto:sportgymcenterinfo@gmail.com" target="_blank"><span class="il">sportgymcenterinfo@gmail.com</span></a></span></span></span></span><br></p>
                        </td>
                        <td style="border-right:solid rgb(139,197,64) 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br></td>
                        <td style="border-left:solid rgb(139,197,64) 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.38;margin-left:18pt;margin-top:0pt;margin-bottom:0pt">
                              <a href="http://" style="text-decoration:none" target="_blank" ><span style="background-color:transparent">
                              <span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">
                                www.</span></span></span></span></a><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-left:18pt;margin-top:0pt;margin-bottom:0pt">
                              <a href="https://www.facebook.com/profile.php?id=100063449692054" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/TresiteMx/&amp;source=gmail&amp;ust=1708294497091000&amp;usg=AOvVaw1eKgcTpkqJEQD7upOrovKJ"><span style="background-color:transparent"><span style="color:rgb(17,85,204)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt"><u style="font-weight:400;font-style:normal;font-variant:normal;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:19px;height:19px"><img src="https://lh5.googleusercontent.com/me18V6ysrRI24Zypj-knh44XvUlKsOhZWq8zgazy3dmTMmvjLqvyFyr7Q0bfXCwhQvkh8jnwOGDrqSOinFSZmfnQGZfvPWnTePfxuTgj-Jxju9Kjv-DkqG2fFc68PaeKoHWerD8LKoTdyOdbRpwiROHU9DkaaSo3XkHmIo6gpkR_-dGtrucnQBs" width="19" height="19" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></u></span></span></span></span></a>
                        </td>
                      </tr>
                  </tbody>
                </table>
            </div>
            <div class="yj6qo"></div>
            <div class="adL"><br></div>
          </div>
        </div>
      </div>


      `,
    };

    // Envío del correo
    const info = await transporter.sendMail(mailOptions);
    // console.log('Correo enviado:', info.response);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};

export const envioCorreoCuentaBloqueada = async (req, res) => {
  const { to, tiempoBloqueo } = req.body;
  console.log("to, tiempoBloqueo", to, tiempoBloqueo)
  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sportgymcenterinfo@gmail.com',
        pass: 'faol swhy ktje sibg',
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: 'sportgymcenterinfo@gmail.com',
      to,
      subject: '¡Aviso de Bloqueo de Cuenta Sport Gym Center!',
      html: `
      <h2>¡Aviso de Bloqueo de Cuenta!</h2>
      <p>Le informamos que su cuenta ha sido bloqueada debido a varios intentos fallidos de acceso.</p>
      <p>La hora de desbloqueo está programada para: <strong>${tiempoBloqueo}</strong>.</p>
      <p>Si no recuerda su contraseña, puede intentar cambiarla utilizando el proceso de recuperación de contraseña en nuestro sitio web.</p>
      <p>Si experimenta problemas para acceder a su cuenta o necesita asistencia adicional, no dude en contactarnos por correo electrónico o por teléfono. Estamos aquí para ayudarlo.</p>
      
      <br/>
      
      <br>
      <div">
        <p><strong>ATENTAMENTE</strong></p>
        <p>Administradores del Sport Gym Center</p>
        <p>Lic. Jair Morales Franco</p>
        <p>Lic. Leonardo Angeles</p>
        <p>Ing. Carlos Alberto Hernández Hernández</p>
        <p>Ing. Osmar Aldair Yerana Martinez</p>

        <div>
          <div id="m_-1593910572140205789">
            <div dir="ltr" style="margin-left:0pt" align="left">
                <table style="border:none;border-collapse:collapse">
                  <colgroup>
                      <col width="128">
                      <col width="237">
                      <col width="16">
                      <col width="252">
                  </colgroup>
                  <tbody>
                      <tr style="height:57.354pt">
                        <td rowspan="2" style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:Nunito,sans-serif"><span style="font-size:12pt;font-weight:800;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:98px;height:99px"><img src="https://res.cloudinary.com/dubearvua/image/upload/v1708208527/CorreoSportGymCenter/g1we2d92ikclrnzbtsno.jpg" width="98" height="99" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></span></span></span></span><br></p>
                        </td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><b><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:14pt;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">Jair Morales Franco</span></span></b></span></span><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,153,153)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:600;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">Jefe De Operaciones</span></span></span></span><br></p>
                        </td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br></td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-left:13.5pt;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(0,0,0)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:125px;height:51px"><img src="https://res.cloudinary.com/dubearvua/image/upload/v1708208557/CorreoSportGymCenter/rgmd406khgbgmjyue261.jpg" width="124.99999999999999" height="46.211331659074744" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></span></span></span></span><br></p>
                        </td>
                      </tr>
                      <tr style="height:45pt">
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">+52 77-17-93-55-63</span></span></span></span><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><a href="mailto:sportgymcenterinfo@gmail.com" target="_blank"><span class="il">sportgymcenterinfo@gmail.com</span></a></span></span></span></span><br></p>
                        </td>
                        <td style="border-right:solid rgb(139,197,64) 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br></td>
                        <td style="border-left:solid rgb(139,197,64) 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.38;margin-left:18pt;margin-top:0pt;margin-bottom:0pt">
                              <a href="http://" style="text-decoration:none" target="_blank" ><span style="background-color:transparent">
                              <span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">
                                www.</span></span></span></span></a><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-left:18pt;margin-top:0pt;margin-bottom:0pt">
                              <a href="https://www.facebook.com/profile.php?id=100063449692054" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/TresiteMx/&amp;source=gmail&amp;ust=1708294497091000&amp;usg=AOvVaw1eKgcTpkqJEQD7upOrovKJ"><span style="background-color:transparent"><span style="color:rgb(17,85,204)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt"><u style="font-weight:400;font-style:normal;font-variant:normal;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:19px;height:19px"><img src="https://lh5.googleusercontent.com/me18V6ysrRI24Zypj-knh44XvUlKsOhZWq8zgazy3dmTMmvjLqvyFyr7Q0bfXCwhQvkh8jnwOGDrqSOinFSZmfnQGZfvPWnTePfxuTgj-Jxju9Kjv-DkqG2fFc68PaeKoHWerD8LKoTdyOdbRpwiROHU9DkaaSo3XkHmIo6gpkR_-dGtrucnQBs" width="19" height="19" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></u></span></span></span></span></a>
                        </td>
                      </tr>
                  </tbody>
                </table>
            </div>
            <div class="yj6qo"></div>
            <div class="adL"><br></div>
          </div>
        </div>
      </div>


      `,
    };

    // Envío del correo
    const info = await transporter.sendMail(mailOptions);
    // console.log('Correo enviado:', info.response);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};

export const envioCorreoInicioSesion = async (req, res) => {
  const { to } = req.body;
  try {
    const ahora = new Date();
    const fechaActual = ahora.toLocaleDateString('es-ES');
    const horaActual = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sportgymcenterinfo@gmail.com',
        pass: 'faol swhy ktje sibg',
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: 'sportgymcenterinfo@gmail.com',
      to,
      subject: 'Nuevo Inicio de Sesión Detectado',
      html: `
      <h2>Nuevo Inicio de Sesión Detectado</h2>
      <p>Hemos detectado un nuevo inicio de sesión en tu cuenta el ${fechaActual} a las ${horaActual}. Si has sido tú quien ha iniciado sesión recientemente, puedes ignorar este mensaje.</p>
      <p>Si no reconoces este inicio de sesión o crees que alguien más ha accedido a tu cuenta sin autorización, te recomendamos que nos contactes de inmediato para revisar la seguridad de tu cuenta y cambiar tu contraseña.</p>
      <p>Estamos aquí para ayudarte a proteger tu cuenta.</p>
      
      <br/>
      
      <br>
      <div">
        <p><strong>ATENTAMENTE</strong></p>
        <p>Administradores del Sport Gym Center</p>
        <p>Lic. Jair Morales Franco</p>
        <p>Lic. Leonardo Angeles</p>
        <p>Ing. Carlos Alberto Hernández Hernández</p>
        <p>Ing. Osmar Aldair Yerana Martinez</p>

        <div>
          <div id="m_-1593910572140205789">
            <div dir="ltr" style="margin-left:0pt" align="left">
                <table style="border:none;border-collapse:collapse">
                  <colgroup>
                      <col width="128">
                      <col width="237">
                      <col width="16">
                      <col width="252">
                  </colgroup>
                  <tbody>
                      <tr style="height:57.354pt">
                        <td rowspan="2" style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:Nunito,sans-serif"><span style="font-size:12pt;font-weight:800;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:98px;height:99px"><img src="https://res.cloudinary.com/dubearvua/image/upload/v1708208527/CorreoSportGymCenter/g1we2d92ikclrnzbtsno.jpg" width="98" height="99" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></span></span></span></span><br></p>
                        </td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><b><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:14pt;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">Jair Morales Franco</span></span></b></span></span><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,153,153)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:600;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">Jefe De Operaciones</span></span></span></span><br></p>
                        </td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br></td>
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-left:13.5pt;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(0,0,0)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:125px;height:51px"><img src="https://res.cloudinary.com/dubearvua/image/upload/v1708208557/CorreoSportGymCenter/rgmd406khgbgmjyue261.jpg" width="124.99999999999999" height="46.211331659074744" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></span></span></span></span><br></p>
                        </td>
                      </tr>
                      <tr style="height:45pt">
                        <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">+52 77-17-93-55-63</span></span></span></span><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="background-color:transparent"><span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap"><a href="mailto:sportgymcenterinfo@gmail.com" target="_blank"><span class="il">sportgymcenterinfo@gmail.com</span></a></span></span></span></span><br></p>
                        </td>
                        <td style="border-right:solid rgb(139,197,64) 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br></td>
                        <td style="border-left:solid rgb(139,197,64) 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                            <p dir="ltr" style="line-height:1.38;margin-left:18pt;margin-top:0pt;margin-bottom:0pt">
                              <a href="http://" style="text-decoration:none" target="_blank" ><span style="background-color:transparent">
                              <span style="color:rgb(38,64,96)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt;font-weight:300;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap">
                                www.</span></span></span></span></a><br></p>
                            <p dir="ltr" style="line-height:1.2;margin-left:18pt;margin-top:0pt;margin-bottom:0pt">
                              <a href="https://www.facebook.com/profile.php?id=100063449692054" style="text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/TresiteMx/&amp;source=gmail&amp;ust=1708294497091000&amp;usg=AOvVaw1eKgcTpkqJEQD7upOrovKJ"><span style="background-color:transparent"><span style="color:rgb(17,85,204)"><span style="font-family:&quot;Nunito Sans&quot;,sans-serif"><span style="font-size:12pt"><u style="font-weight:400;font-style:normal;font-variant:normal;vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:19px;height:19px"><img src="https://lh5.googleusercontent.com/me18V6ysrRI24Zypj-knh44XvUlKsOhZWq8zgazy3dmTMmvjLqvyFyr7Q0bfXCwhQvkh8jnwOGDrqSOinFSZmfnQGZfvPWnTePfxuTgj-Jxju9Kjv-DkqG2fFc68PaeKoHWerD8LKoTdyOdbRpwiROHU9DkaaSo3XkHmIo6gpkR_-dGtrucnQBs" width="19" height="19" style="margin-left:0px;margin-top:0px" crossorigin="" class="CToWUd" data-bit="iit"></span></u></span></span></span></span></a>
                        </td>
                      </tr>
                  </tbody>
                </table>
            </div>
            <div class="yj6qo"></div>
            <div class="adL"><br></div>
          </div>
        </div>
      </div>


      `,
    };

    // Envío del correo
    const info = await transporter.sendMail(mailOptions);
    // console.log('Correo enviado:', info.response);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};