import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, X, User, MapPin, Briefcase } from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    ageRange: "",
    community: "",
    location: "",
    education: ""
  });

  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Priya S.",
      age: 26,
      profession: "Software Engineer",
      location: "Bangalore",
      education: "B.Tech in Computer Science",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Kavya R.",
      age: 24,
      profession: "Teacher",
      location: "Mysore",
      education: "M.A in English",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Lakshmi M.",
      age: 28,
      profession: "Doctor",
      location: "Hubli",
      education: "MBBS",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      name: "Sowmya K.",
      age: 25,
      profession: "Chartered Accountant",
      location: "Mangalore",
      education: "B.Com, CA",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ]);

  const [interestsSent, setInterestsSent] = useState<number[]>([]);

  const handleInterest = (id: number) => {
    setInterestsSent((prev) => [...prev, id]);
    toast.success("Interest Sent!\nYour interest has been sent successfully.", {
      position: "top-right"
    });
  };

  const handlePass = (id: number) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Header />
      <ToastContainer />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Matches</h1>
          <p className="text-gray-600">Discover compatible profiles based on your preferences</p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-yellow-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Matches</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger className="border-yellow-300">
                  <SelectValue placeholder="Age Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-25">18-25 years</SelectItem>
                  <SelectItem value="26-30">26-30 years</SelectItem>
                  <SelectItem value="31-35">31-35 years</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="border-yellow-300">
                  <SelectValue placeholder="Community" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lingayat">Lingayat</SelectItem>
                  <SelectItem value="brahmin">Brahmin</SelectItem>
                  <SelectItem value="vokkaliga">Vokkaliga</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="border-yellow-300">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mysore">Mysore</SelectItem>
                  <SelectItem value="hubli">Hubli</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow border-yellow-200">
              <div className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-200">
                <img 
                  src={profile.image} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {profile.name}
                </h3>

                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{profile.age} years</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase size={14} />
                    <span>{profile.profession}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{profile.location}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handlePass(profile.id)}
                  >
                    <X size={16} className="mr-1" />
                    Pass
                  </Button>
                  {interestsSent.includes(profile.id) ? (
                    <Button size="sm" disabled className="flex-1 bg-green-600 text-white">
                      <Heart size={16} className="mr-1" />
                      Interest Sent
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
                      onClick={() => handleInterest(profile.id)}
                    >
                      <Heart size={16} className="mr-1" />
                      Interest
                    </Button>
                  )}
                </div>

                <Link to={`/profile/${profile.id}`}>
                  <Button variant="ghost" className="w-full mt-2 text-yellow-600 hover:bg-yellow-50">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700">
            Load More Profiles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
