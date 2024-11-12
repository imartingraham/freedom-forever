import axios from 'axios'
import ReactDOM from 'react-dom/client'
import Home from './components/Home'
window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

ReactDOM.createRoot(document.getElementById('app')).render(<Home />)
