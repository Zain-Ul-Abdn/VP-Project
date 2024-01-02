import './App.css';
import ChatsSections from './Assets/components/ChatsSections';
import Header from './Assets/components/Header';

function App() {
  return (
    <div className="App">
      <Header name = 'GPT Clone'/>
      <ChatsSections/>
    </div>
  );
}

export default App;
