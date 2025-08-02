import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    lookingFor: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    religion: "",
    community: "",
    motherTongue: "",
    maritalStatus: "",
    height: "",
    education: "",
    occupation: "",
    income: "",
    city: "",
    state: "",
    mobile: "",
    otp: ""
  });

  const appVersion = "v2.1.3";

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.gender && formData.lookingFor;
      case 2:
        return formData.birthDay && formData.birthMonth && formData.birthYear && formData.height && formData.maritalStatus;
      case 3:
        return formData.religion && formData.community && formData.motherTongue;
      case 4:
        return formData.education && formData.occupation && formData.income && formData.city && formData.state;
      case 5:
        return formData.mobile.length === 10;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-orange-100 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Join KannadaMatch</CardTitle>
              <CardDescription>Step {step} of 5 - Create your profile</CardDescription>
              <div className="text-xs text-gray-500 mb-2">App Version: {appVersion}</div>
              <div className="flex items-center justify-center mt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      i <= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {i}
                    </div>
                    {i < 5 && <div className={`w-6 h-0.5 ${i < step ? 'bg-orange-500' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lookingFor">Looking For</Label>
                    <Select value={formData.lookingFor} onValueChange={(value) => handleInputChange('lookingFor', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Looking for" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Date of Birth</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Select value={formData.birthDay} onValueChange={(value) => handleInputChange('birthDay', value)}>
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 31 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={formData.birthMonth} onValueChange={(value) => handleInputChange('birthMonth', value)}>
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                            <SelectItem key={month} value={String(i + 1).padStart(2, '0')}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={formData.birthYear} onValueChange={(value) => handleInputChange('birthYear', value)}>
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 50 }, (_, i) => (
                            <SelectItem key={2005 - i} value={String(2005 - i)}>
                              {2005 - i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="height">Height</Label>
                    <Select value={formData.height} onValueChange={(value) => handleInputChange('height', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select height" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4.6-4.8">4'6" - 4'8"</SelectItem>
                        <SelectItem value="4.9-4.11">4'9" - 4'11"</SelectItem>
                        <SelectItem value="5.0-5.2">5'0" - 5'2"</SelectItem>
                        <SelectItem value="5.3-5.5">5'3" - 5'5"</SelectItem>
                        <SelectItem value="5.6-5.8">5'6" - 5'8"</SelectItem>
                        <SelectItem value="5.9-5.11">5'9" - 5'11"</SelectItem>
                        <SelectItem value="6.0-6.2">6'0" - 6'2"</SelectItem>
                        <SelectItem value="6.3+">6'3" and above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never-married">Never Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                        <SelectItem value="separated">Separated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="religion">Religion</Label>
                    <Select value={formData.religion} onValueChange={(value) => handleInputChange('religion', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindu">Hindu</SelectItem>
                        <SelectItem value="muslim">Muslim</SelectItem>
                        <SelectItem value="christian">Christian</SelectItem>
                        <SelectItem value="sikh">Sikh</SelectItem>
                        <SelectItem value="buddhist">Buddhist</SelectItem>
                        <SelectItem value="jain">Jain</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="community">Community</Label>
                    <Select value={formData.community} onValueChange={(value) => handleInputChange('community', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lingayat">Lingayat</SelectItem>
                        <SelectItem value="brahmin">Brahmin</SelectItem>
                        <SelectItem value="vokkaliga">Vokkaliga</SelectItem>
                        <SelectItem value="kuruba">Kuruba</SelectItem>
                        <SelectItem value="devanga">Devanga</SelectItem>
                        <SelectItem value="naidu">Naidu</SelectItem>
                        <SelectItem value="reddy">Reddy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="motherTongue">Mother Tongue</Label>
                    <Select value={formData.motherTongue} onValueChange={(value) => handleInputChange('motherTongue', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select mother tongue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kannada">Kannada</SelectItem>
                        <SelectItem value="telugu">Telugu</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="malayalam">Malayalam</SelectItem>
                        <SelectItem value="marathi">Marathi</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="professional">Professional Degree</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-engineer">Software Engineer</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="government">Government Service</SelectItem>
                        <SelectItem value="banking">Banking</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="income">Annual Income</Label>
                    <Select value={formData.income} onValueChange={(value) => handleInputChange('income', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-5">₹2-5 Lakhs</SelectItem>
                        <SelectItem value="5-10">₹5-10 Lakhs</SelectItem>
                        <SelectItem value="10-15">₹10-15 Lakhs</SelectItem>
                        <SelectItem value="15-25">₹15-25 Lakhs</SelectItem>
                        <SelectItem value="25-50">₹25-50 Lakhs</SelectItem>
                        <SelectItem value="50+">₹50+ Lakhs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      className="border-orange-200 focus:border-orange-400"
                      maxLength={10}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      🔒 Your number stays secure and private
                    </p>
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Verify Your Mobile</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      We'll send an OTP to verify your number
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="otp">Enter OTP (if received)</Label>
                    <Input
                      id="otp"
                      value={formData.otp}
                      onChange={(e) => handleInputChange('otp', e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="border-orange-200 focus:border-orange-400 text-center font-mono text-lg"
                      maxLength={6}
                    />
                    <p className="text-xs text-center text-gray-500 mt-1">
                      Didn’t receive OTP? <Link to="#" className="text-orange-600 hover:underline">Resend</Link>
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-4">
                {step > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    ⬅ Back
                  </Button>
                )}
                {step < 5 ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`ml-auto bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFC300] hover:to-[#FF8C00] text-white font-semibold rounded-md px-6 py-2 transition duration-300 ${
                    !isStepValid() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Continue ➡
                </Button>

                ) : (
                  <Button className="ml-auto">Submit ✅</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
