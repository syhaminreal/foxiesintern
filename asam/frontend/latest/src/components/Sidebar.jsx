import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-60 p-4">
      <ul>
        <li>
          <Link to="/" className="block py-2">Dashboard</Link>
        </li>
        <li>
          <Link to="/reports" className="block py-2">Reports</Link>
        </li>
        <li>
          <Link to="/settings" className="block py-2">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
