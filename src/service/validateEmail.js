import axios from 'axios';

if (process.env.MBLAYER_KEY === undefined) {
  console.error(
    'env var MBLAYER_KEY não definida. Os emailS não serão verificados.'
  );
}
const access_key = process.env.MBLAYER_KEY;

async function validEmail(email_address) {
  if (!access_key) {
    return {
      did_you_mean: '',
      valid: true,
    };
  }
  const res = await axios.get(
    `http://apilayer.net/api/check?access_key=${access_key}&email=${email_address}`
  );
  if (res.data.success === false) {
    throw new Error(res.data.error.info);
  }
  return {
    did_you_mean: res.data.did_you_mean,
    valid: res.data.format_valid === true && res.data.mx_found === true,
  };
}

export default validEmail;
