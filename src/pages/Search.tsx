
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Grid, List, Search as SearchIcon, Heart, X, User, MapPin, Briefcase } from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [ageRange, setAgeRange] = useState([25, 35]);
  const [showResults, setShowResults] = useState(false);
  const [passedProfiles, setPassedProfiles] = useState<number[]>([]);
  const [interestedProfiles, setInterestedProfiles] = useState<number[]>([]);
  const { toast } = useToast();

  const profiles = [
    {
      id: 1,
      name: "Ananya K.",
      age: 27,
      profession: "Software Developer",
      location: "Bangalore",
      education: "B.E in IT",
      image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Divya N.",
      age: 25,
      profession: "Nurse",
      location: "Chennai",
      education: "B.Sc Nursing",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Rashmi P.",
      age: 29,
      profession: "Bank Manager",
      location: "Hubli",
      education: "MBA Finance",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      name: "Shreya M.",
      age: 26,
      profession: "Civil Engineer",
      location: "Mysore",
      education: "B.E Civil",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 5,
      name: "Varsha S.",
      age: 24,
      profession: "Graphic Designer",
      location: "Mangalore",
      education: "B.Des",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 6,
      name: "Pooja R.",
      age: 28,
      profession: "Pharmacist",
      location: "Davangere",
      education: "B.Pharm",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  const handlePass = (profileId: number) => {
    setPassedProfiles(prev => [...prev, profileId]);
    toast({
      title: "Profile Passed",
      description: "You have passed on this profile.",
    });
  };

  const handleInterest = (profileId: number) => {
    setInterestedProfiles(prev => [...prev, profileId]);
    toast({
      title: "Interest Sent!",
      description: "Your interest has been sent successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Advanced Search</h1>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Search Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-yellow-200 sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Search Filters</h2>
                
                <div className="space-y-6">
                  {/* Age Range */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Age Range: {ageRange[0]} - {ageRange[1]} years
                    </Label>
                    <Slider
                      value={ageRange}
                      onValueChange={setAgeRange}
                      min={18}
                      max={60}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Community */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Community</Label>
                    <Select>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lingayat">Lingayat</SelectItem>
                        <SelectItem value="brahmin">Brahmin</SelectItem>
                        <SelectItem value="vokkaliga">Vokkaliga</SelectItem>
                        <SelectItem value="kuruba">Kuruba</SelectItem>
                        <SelectItem value="all">All Communities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Location</Label>
                    <Select>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="mysore">Mysore</SelectItem>
                        <SelectItem value="hubli">Hubli</SelectItem>
                        <SelectItem value="mangalore">Mangalore</SelectItem>
                        <SelectItem value="davangere">Davangere</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Education */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Education</Label>
                    <Select>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">Post Graduate</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="doctorate">Doctorate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Profession */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Profession</Label>
                    <Select>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select profession" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineer">Engineer</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="government">Government Job</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Income Range */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Annual Income</Label>
                    <Select>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-5">₹3-5 LPA</SelectItem>
                        <SelectItem value="5-8">₹5-8 LPA</SelectItem>
                        <SelectItem value="8-12">₹8-12 LPA</SelectItem>
                        <SelectItem value="12-20">₹12-20 LPA</SelectItem>
                        <SelectItem value="20+">₹20+ LPA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Horoscope Match */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="horoscope" className="text-sm font-medium text-gray-700">
                      Horoscope Match
                    </Label>
                    <Switch id="horoscope" />
                  </div>

                  {/* Photo Available */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="photo" className="text-sm font-medium text-gray-700">
                      Photo Available
                    </Label>
                    <Switch id="photo" defaultChecked />
                  </div>

                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
                  >
                    <SearchIcon size={16} className="mr-2" />
                    Search Profiles
                  </Button>

                  <Button variant="outline" className="w-full border-yellow-300 text-yellow-600 hover:bg-yellow-50">
                    Save This Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
                <p className="text-gray-600">
                  {showResults ? `Showing ${profiles.length} profiles matching your criteria` : 'Use filters to find your perfect match'}
                </p>
              </div>
              
              {showResults && (
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-yellow-300'}
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-yellow-300'}
                  >
                    <List size={16} />
                  </Button>
                </div>
              )}
            </div>

            {!showResults ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon size={32} className="text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Use filters to find your perfect match
                </h3>
                <p className="text-gray-600">
                  Apply filters from the sidebar to discover compatible profiles
                </p>
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 gap-6' : 'gap-4'}`}>
                {profiles.filter(profile => !passedProfiles.includes(profile.id)).map((profile) => (
                  <Card key={profile.id} className={`overflow-hidden hover:shadow-lg transition-shadow border-yellow-200 ${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`${viewMode === 'list' ? 'w-32 h-32' : 'aspect-square'} bg-gradient-to-br from-yellow-100 to-yellow-200`}>
                      <img 
                        src={profile.image} 
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
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

                      <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-wrap' : ''}`}>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handlePass(profile.id)}
                        >
                          <X size={16} className="mr-1" />
                          Pass
                        </Button>
                        <Button 
                          size="sm" 
                          className={`flex-1 ${
                            interestedProfiles.includes(profile.id)
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
                          }`}
                          onClick={() => handleInterest(profile.id)}
                        >
                          <Heart size={16} className="mr-1" />
                          {interestedProfiles.includes(profile.id) ? "Interest Sent" : "Interest"}
                        </Button>
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
            )}

            {showResults && (
              <div className="text-center mt-12">
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700">
                  Load More Profiles
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
