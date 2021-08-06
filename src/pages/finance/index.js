import createApp from '@/app'
import './styles/index.scss'
import router from './routes/index'
import store from './store/index'


const app = createApp(store, router)