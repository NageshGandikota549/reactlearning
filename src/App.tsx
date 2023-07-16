import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./navigation/navigation.js";
import { Dashboard } from "./dashboard/dashboard.js";
import { Register } from "./register/register.js";
import { Login } from "./login/login.js";
import { Products } from "./products";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/products" Component={Products} />
          <Route  path="/" Component={Dashboard} />
          <Route path="*" Component={Dashboard} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
