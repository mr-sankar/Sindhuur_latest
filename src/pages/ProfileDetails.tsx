import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Camera } from "lucide-react";

export default function ProfileDetails() {
  const [profile, setProfile] = useState({
    name: "M Bharathyadav",
    age: "32",
    height: "5 ft 10 in",
    location: "Warangal, Telangana",
    profession: "Software Professional",
    religion: "Hindu",
    caste: "Yadav - Govetchaudaga",
    education: "B.E. – Bachelor of Engineering",
    family: {
      father: "Business",
      mother: "Homemaker",
    },
    hobbies: "Reading, Technology, Cricket, Music, Traveling",
    dob: "7/3/1993",
    tob: "23:50",
    pob: "Mothkur, Telangana",
    language: "Telugu",
    chartStyle: "South Indian",
  });

  const [editableSections, setEditableSections] = useState({
    basic: false,
    religion: false,
    professional: false,
    family: false,
    hobbies: false,
    horoscope: false,
  });

  const [horoscopeGenerated, setHoroscopeGenerated] = useState(false);
  const [horoscopeData, setHoroscopeData] = useState<null | {
    compatibility: string;
    luckyNumbers: number[];
    luckyColors: string[];
    favorableTime: string;
    message: string;
  }>(null);

  const [loading, setLoading] = useState(false);
  const [familyTree, setFamilyTree] = useState([
    { name: "Rajesh Kumar", relation: "Father", details: "Business Owner" },
    { name: "Sunita Kumar", relation: "Mother", details: "Homemaker" },
    { name: "Priya Kumar", relation: "Sister", details: "Doctor" },
  ]);

  const [newMember, setNewMember] = useState({ name: "", relation: "", details: "" });
  const [addingMember, setAddingMember] = useState(false);

  const generateHoroscope = () => {
    setLoading(true);
    setTimeout(() => {
      const mockResponse = {
        compatibility: "85%",
        luckyNumbers: [3, 7, 21, 33],
        luckyColors: ["Blue", "Green", "Yellow"],
        favorableTime: "Morning 6–8 AM",
        message: "This is a favorable time for new beginnings and relationships.",
      };
      setHoroscopeData(mockResponse);
      setHoroscopeGenerated(true);
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleFamilyChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      family: { ...prev.family, [field]: value },
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6 bg-[#fffdeb]">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-1">My Profile</h1>
        <p className="text-muted-foreground">Manage your profile information and preferences</p>
      </div>

      {/* Basic Info */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="relative w-20 h-20">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <label htmlFor="profilePhoto" className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100 cursor-pointer">
              <Camera className="w-4 h-4 text-gray-600" />
              <input id="profilePhoto" type="file" accept="image/*" className="hidden" />
            </label>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              {editableSections.basic ? (
                <Input value={profile.name} onChange={(e) => handleInputChange("name", e.target.value)} />
              ) : (
                <h2 className="text-xl font-semibold">{profile.name}</h2>
              )}
              <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => setEditableSections(prev => ({ ...prev, basic: !prev.basic }))} />
            </div>
            <p>{profile.age} Years, {profile.height}</p>
            <p>{profile.location}</p>
            <p>{profile.profession}</p>
          </div>
        </CardContent>
      </Card>

      {/* Religion Info */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Religion Information</CardTitle>
          <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => setEditableSections(prev => ({ ...prev, religion: !prev.religion }))} />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm p-6 pt-0">
          {editableSections.religion ? (
            <>
              <Input value={profile.religion} onChange={(e) => handleInputChange("religion", e.target.value)} />
              <Input value={profile.caste} onChange={(e) => handleInputChange("caste", e.target.value)} />
            </>
          ) : (
            <>
              <div>Religion: {profile.religion}</div>
              <div>Caste: {profile.caste}</div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Professional Info */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Professional Information</CardTitle>
          <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => setEditableSections(prev => ({ ...prev, professional: !prev.professional }))} />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm p-6 pt-0">
          {editableSections.professional ? (
            <>
              <Input value={profile.education} onChange={(e) => handleInputChange("education", e.target.value)} />
              <Input value={profile.profession} onChange={(e) => handleInputChange("profession", e.target.value)} />
            </>
          ) : (
            <>
              <div>Education: {profile.education}</div>
              <div>Profession: {profile.profession}</div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Family Details */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Family Details</CardTitle>
          <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => setEditableSections(prev => ({ ...prev, family: !prev.family }))} />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm p-6 pt-0">
          {editableSections.family ? (
            <>
              <Input value={profile.family.father} onChange={(e) => handleFamilyChange("father", e.target.value)} />
              <Input value={profile.family.mother} onChange={(e) => handleFamilyChange("mother", e.target.value)} />
            </>
          ) : (
            <>
              <div>Father's Occupation: {profile.family.father}</div>
              <div>Mother's Occupation: {profile.family.mother}</div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Horoscope */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Horoscope</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6 pt-0 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>Date of Birth: {profile.dob}</div>
            <div>Time of Birth: {profile.tob}</div>
            <div>Birth Place: {profile.pob}</div>
            <div>Language: {profile.language}</div>
            <div>Chart Style: {profile.chartStyle}</div>
          </div>
{loading ? (
  <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl flex flex-col items-center justify-center space-y-2 text-center">
    <div className="w-6 h-6 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-sm font-medium">Generating Horoscope...</p>
  </div>
) : !horoscopeGenerated ? (
  <div className="bg-yellow-400 text-black p-4 rounded-xl flex flex-col items-center justify-center space-y-4 text-center">
    <span className="text-sm md:text-base">
      Generate your horoscope and get more responses
    </span>
    <Button
      onClick={generateHoroscope}
      className="bg-white text-yellow-600 font-semibold hover:bg-gray-100"
    >
      GENERATE HOROSCOPE
    </Button>
  </div>
) : horoscopeData && (
  <div className="bg-green-100 border border-green-300 rounded p-4 text-green-800">
    <p className="font-semibold">Horoscope Generated Successfully!</p>
    <p><strong>Compatibility:</strong> {horoscopeData.compatibility}</p>
    <p><strong>Lucky Numbers:</strong> {horoscopeData.luckyNumbers.join(", ")}</p>
    <p><strong>Lucky Colors:</strong> {horoscopeData.luckyColors.join(", ")}</p>
    <p><strong>Favorable Time:</strong> {horoscopeData.favorableTime}</p>
    <p>{horoscopeData.message}</p>
  </div>
)}

        </CardContent>
      </Card>

      {/* Hobbies */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Hobbies and Interests</CardTitle>
          <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => setEditableSections(prev => ({ ...prev, hobbies: !prev.hobbies }))} />
        </CardHeader>
        <CardContent className="text-sm p-6 pt-0">
          {editableSections.hobbies ? (
            <Input value={profile.hobbies} onChange={(e) => handleInputChange("hobbies", e.target.value)} />
          ) : (
            profile.hobbies
          )}
        </CardContent>
      </Card>

      {/* Family Tree */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Family Tree</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-6 pt-0">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {familyTree.map((member, idx) => (
              <li key={idx} className="border p-4 rounded-xl shadow-sm">
                <strong>{member.name}</strong><br />
                {member.relation} – {member.details}
              </li>
            ))}
          </ul>

          {addingMember && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-4">
              <Input placeholder="Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
              <Input placeholder="Relation" value={newMember.relation} onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })} />
              <Input placeholder="Details" value={newMember.details} onChange={(e) => setNewMember({ ...newMember, details: e.target.value })} />
              <Button className="col-span-1 md:col-span-3 mt-2" onClick={() => {
                if (newMember.name && newMember.relation) {
                  setFamilyTree([...familyTree, newMember]);
                  setNewMember({ name: "", relation: "", details: "" });
                  setAddingMember(false);
                }
              }}>
                Add
              </Button>
            </div>
          )}
          {!addingMember && (
            <Button variant="outline" className="mt-4" onClick={() => setAddingMember(true)}>
              + Add Member
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
