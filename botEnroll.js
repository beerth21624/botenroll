//bot fetch api enroll course
import fetch from 'node-fetch'
import crypto from 'crypto'

let count = 1

const username = 'b6510405822'
const password = 'Beer0849266487!'

let token = ''

const encodeString = (str) => {
  return crypto
    .publicEncrypt(
      {
        key: '-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAytOhlq/JPcTN0fX+VqObE5kwIaDnEtso2KGHdi9y7uTtQA6pO4fsPNJqtXOdrcfDgp/EQifPwVRZpjdbVrD6FgayrQQILAnARKzVmzwSMDdaP/hOB6i9ouKsIhN9hQUmUhbhaMkh7UXoxGW+gCSK8dq0+FJVnlt1dtJByiVAJRi2oKSdLRqNjk8yGzuZ6SrEFzAgYZwmQiywUF6V1ZaMUQDz8+nr9OOVU3c6Z2IQXCbOv6S7TAg0VhriFL18ZxUPS6759SuKC63VOOSf4EEHy1m0qBgpCzzlsB7D4ssF9x0ZVXLREFrqikP71Hg6tSGcu4YBKL+VwIDWWaXzz6szxeDXdYTA3l35P7I9uBUgMznIjTjNaAX4AXRsJcN9fpF7mVq4eK1CorBY+OOzOc+/yVBpKysdaV/yZ+ABEhX93B2kPLFSOPUKjSPK2rtqE6h2NSl5BFuGEoVBerKn+ymOnmE4/SDBSe5S6gIL5vwy5zNMsxWUaUF5XO9Ez+2v8+yPSvQydj3pw5Rlb07mAXcI18ZYGClO6g/aKL52KYnn1FZ/X3r8r/cibfDbuXC6FRfVXJmzikVUqZdTp0tOwPkh4V0R63l2RO9Luy7vG6rurANSFnUA9n842KkRtBagQeQC96dbC0ebhTj+NPmskklxr6/6Op/P7d+YY76WzvQMvnsCAwEAAQ==\n-----END PUBLIC KEY-----',
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(str, 'utf8')
    )
    .toString('base64')
}
const fetchLogin = async () => {
  try {
    const response = await fetch('https://myapi.ku.th/auth/login', {
      method: 'POST',
      headers: {
        authority: 'myapi.ku.th',
        accept: '*/*',
        'accept-language': 'th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7',
        'app-key': 'txCR5732xYYWDGdd49M3R19o1OVwdRFc',
        'content-type': 'application/json',
        origin: 'https://my.ku.th',
        referer: 'https://my.ku.th/',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        username: encodeString(username),
        password: encodeString(password),
      }),
    })
    //get access token
    const data = await response.json()
    const accessToken = data.accesstoken
    console.log('get accesstoken success')
    token = accessToken
    fetchApi()
  } catch (err) {
    console.log(err)
  }
}
fetchLogin()

const fetchApi = async () => {
  try {
    const dataReq = {
      academicYear: 2565,

      sections: [
        {
          sectionId: 205124,
          subjectCode: '01177141-64',
          subjectShow: '01177141',
          credit: 3,
          enrollType: '92201',
          sectionType: '16901',
        },
      ],
      semester: 2,
    }
    const response = await fetch('https://myapi.ku.th/enroll/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        'app-key': 'txCR5732xYYWDGdd49M3R19o1OVwdRFc',
      },
      body: JSON.stringify(dataReq),
    })

    const data = await response.json()
    if (data?.code === 'full') {
      console.log(data?.code)
      setTimeout(() => {
        fetchApi()
        const getdate = new Date()

        console.log(getdate, 'fetch count =>>', count++)
      }, 3000)
    } else if (data?.code === 'success') {
      console.log('you enroll success')
      return
    } else {
      console.log('no api key', data?.code)
      fetchLogin()
    }
    return data?.code
  } catch (err) {
    console.log(err)
  }
}
// fetchApi()
