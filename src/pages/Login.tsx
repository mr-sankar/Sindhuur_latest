import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const demoUser = {
      name: "Priya Sharma",
      age: 26,
      profession: "Software Engineer",
      location: "Bangalore, Karnataka",
      education: "B.Tech in Computer Science",
      salary: "₹8-12 LPA",
      height: "5'4\"",
      community: "Lingayat",
      motherTongue: "Kannada",
      about:
        "I am a passionate software engineer working in a leading tech company. I love traveling, reading books, and spending time with family. Looking for a caring and understanding life partner who shares similar values.",
      family: {
        father: "Business Owner",
        mother: "Homemaker",
        siblings: "1 Sister (Married)",
      },
      preferences: [
        "Age: 26-32 years",
        "Education: Graduate",
        "Profession: Any",
        "Location: Karnataka preferred",
      ],
      images: [
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      ],
    };

    setTimeout(() => {
      setIsLoading(false);
      login(); // update auth state
      localStorage.setItem("loggedInUser", JSON.stringify(demoUser));
      toast({
        title: "Login Successful!",
        description: "Welcome back to Public Matrimony",
        duration: 4000,
      });
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-yellow-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Welcome Back</CardTitle>
              <p className="text-gray-600">Sign in to your Public Matrimony account</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-4 pr-12 py-3 h-12 text-base border border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 rounded-md transition-all"
                      required
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg select-none pointer-events-none z-10">
                      ✉
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-4 pr-20 py-3 h-12 text-base border border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 rounded-md transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors text-lg w-8 h-8 flex items-center justify-center z-10"
                    >
                      {showPassword ? '🙈' : '👁'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mr-3 h-4 w-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2" 
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-yellow-600 hover:text-yellow-700 font-medium">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-medium py-3 px-4 h-12 text-base rounded-md transition-all duration-200 mt-6"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Join Free
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
