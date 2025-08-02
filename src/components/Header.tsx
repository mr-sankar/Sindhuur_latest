import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Users,
  Heart,
  MessageSquare,
  Search,
  Grid3X3,
  Bell,
  User,
  LogOut,
  Crown,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-yellow-400">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={isLoggedIn ? "/home" : "/"} className="flex items-center space-x-3">
            <img src={logo} alt="Public Matrimony Logo" className="h-14 w-14 object-contain" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                Public Matrimony
              </span>
              <span className="text-xs text-yellow-600 font-medium">Find Your Perfect Match</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {isLoggedIn ? (
              <>
                <Link to="/home" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link to="/search" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium">
                  <Users className="h-4 w-4" />
                  <span>Matches</span>
                </Link>
                <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium">
                  <Heart className="h-4 w-4" />
                  <span>Interests</span>
                </Link>
                <Link to="/messages" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messages</span>
                </Link>
                <Link to="/events" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium">
                  <Grid3X3 className="h-4 w-4" />
                  <span>Events</span>
                </Link>
                <Link to="/membership" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium">
                  <Crown className="h-4 w-4" />
                  <span>Membership</span>
                </Link>
                <Link to="/notifications" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium relative">
                  <Bell className="h-4 w-4" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link to="/search" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-all duration-200 font-medium border border-yellow-200">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </Link>
                <Link to="/membership" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium">
                  <Crown className="h-4 w-4" />
                  <span>Membership</span>
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Button variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-medium px-6" onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button onClick={handleLogout} variant="outline" className="border-red-400 text-red-700 hover:bg-red-50 font-medium px-6">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-medium px-6">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold px-6 shadow-lg">
                    Join Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-yellow-50 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} className="text-yellow-700" /> : <Menu size={24} className="text-yellow-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 flex flex-col space-y-3">
            {isLoggedIn ? (
              <>
                <Link to="/home" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Home</Link>
                <Link to="/search" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Matches</Link>
                <Link to="/dashboard" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Interests</Link>
                <Link to="/messages" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Messages</Link>
                <Link to="/events" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Events</Link>
                <Link to="/membership" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Membership</Link>
                <Link to="/notifications" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Notifications</Link>
                <Button variant="ghost" className="text-left text-yellow-700" onClick={() => navigate("/profile")}>Profile</Button>
                <Button variant="ghost" className="text-left text-red-600" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Home</Link>
                <Link to="/search" className="px-4 py-2 text-yellow-700 hover:bg-yellow-100 bg-yellow-50 rounded border border-yellow-200">Search</Link>
                <Link to="/membership" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Membership</Link>
                <Link to="/login" className="px-4 py-2 text-gray-700 hover:bg-yellow-50 rounded">Login</Link>
                <Link to="/signup" className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded">Join Free</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
