
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, User, MapPin, Briefcase, Bell, Search } from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  const recentMatches = [
    {
      id: 1,
      name: "Priya S.",
      age: 26,
      profession: "Software Engineer",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Kavya R.",
      age: 24,
      profession: "Teacher",
      location: "Mysore",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Lakshmi M.",
      age: 28,
      profession: "Doctor",
      location: "Hubli",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const notifications = [
    { type: "interest", message: "Ananya K. showed interest in your profile", time: "2 hours ago" },
    { type: "message", message: "New message from Divya N.", time: "5 hours ago" },
    { type: "match", message: "3 new matches found for you", time: "1 day ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Here's what's happening with your matrimony journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-yellow-200">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link to="/search">
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700">
                      <Search size={18} className="mr-2" />
                      Find Matches
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="outline" className="w-full border-yellow-300 text-yellow-600 hover:bg-yellow-50">
                      <MessageSquare size={18} className="mr-2" />
                      Messages
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="outline" className="w-full border-yellow-300 text-yellow-600 hover:bg-yellow-50">
                      <Heart size={18} className="mr-2" />
                      Interests
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card className="border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Recent Matches</h2>
                  <Link to="/dashboard" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {recentMatches.map((profile) => (
                    <Card key={profile.id} className="overflow-hidden hover:shadow-md transition-shadow border-yellow-100">
                      <div className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-200">
                        <img 
                          src={profile.image} 
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <CardContent className="p-3">
                        <h3 className="font-semibold text-gray-800 mb-1">{profile.name}</h3>
                        <div className="space-y-1 text-xs text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span>{profile.age} years</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase size={12} />
                            <span>{profile.profession}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span>{profile.location}</span>
                          </div>
                        </div>
                        
                        <Link to={`/profile/${profile.id}`}>
                          <Button size="sm" variant="outline" className="w-full text-xs border-yellow-300 text-yellow-600 hover:bg-yellow-50">
                            View Profile
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Stats */}
            <Card className="border-yellow-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Profile</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-semibold text-yellow-600">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Interests Received</span>
                    <span className="font-semibold text-yellow-600">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Messages</span>
                    <span className="font-semibold text-yellow-600">8</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700">
                  Complete Profile
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-yellow-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-gray-500 text-xs">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link to="/messages">
                  <Button variant="ghost" className="w-full mt-4 text-yellow-600 hover:bg-yellow-50">
                    View All Activity
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
