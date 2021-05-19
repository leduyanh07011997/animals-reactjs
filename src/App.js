import logo from './logo.svg';
import Header from './components/Header/index'
import './App.css';
import Animals from 'features/Animals';
import { useDispatch, useSelector } from 'react-redux';
import { clickOpen } from 'components/Header/loginSlice';

function App() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user.currentUser)
  const isLogin = !!loggedInUser.email
  console.log(isLogin)

  const handleClickOpenLoginForm = () => {
    const action = clickOpen()
    dispatch(action)
  }


  return (
    <div className="App">
      <Header />
      {isLogin ? <Animals /> : <>
        <div className="message-login" onClick={handleClickOpenLoginForm}>
          Login an account here
        </div>
      </>}
      
    </div>
  );
}

export default App;
