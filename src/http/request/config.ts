let BASE_URL = ''
const TIME_OUT = 5000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:9001/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'production'
} else {
  BASE_URL = 'test'
}

export { BASE_URL, TIME_OUT }
