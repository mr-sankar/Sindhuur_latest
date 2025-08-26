import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountFor: "",
    name: "",
    email: "",
    mobile: "",
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
    fieldOfStudy: "",
    otherEducation: "",
    occupation: "",
    income: "",
    city: "",
    state: "",
    otp: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [religions, setReligions] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [errors, setErrors] = useState({});

  const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Pune",
    "Jaipur",
    "Hospet",
  ];

  const stateCities = {
    andhra_pradesh: [
      "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool",
      "Rajahmundry", "Tirupati", "Kadapa", "Anantapur", "Chittoor", "Ongole"
    ],
    arunachal_pradesh: [
      "Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro"
    ],
    assam: [
      "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur"
    ],
    bihar: [
      "Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia"
    ],
    chhattisgarh: [
      "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"
    ],
    goa: [
      "Panaji", "Margao", "Vasco da Gama", "Mapusa"
    ],
    gujarat: [
      "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar",
      "Jamnagar", "Junagadh", "Gandhinagar"
    ],
    haryana: [
      "Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar",
      "Rohtak", "Sonipat"
    ],
    himachal_pradesh: [
      "Shimla", "Manali", "Dharamshala", "Mandi", "Kullu", "Solan"
    ],
    jharkhand: [
      "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"
    ],
    karnataka: [
      "Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi", "Davangere",
      "Tumakuru", "Shivamogga", "Ballari", "Udupi", "Hassan", "Raichur",
      "Bidar", "Chitradurga", "Gadag"
    ],
    kerala: [
      "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha",
      "Palakkad", "Kannur", "Malappuram", "Kollam", "Kottayam"
    ],
    madhya_pradesh: [
      "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Satna"
    ],
    maharashtra: [
      "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur",
      "Amravati", "Kolhapur", "Sangli", "Latur", "Jalgaon", "Akola",
      "Ahmednagar", "Satara", "Chandrapur"
    ],
    manipur: [
      "Imphal", "Thoubal", "Churachandpur", "Ukhrul"
    ],
    meghalaya: [
      "Shillong", "Tura", "Jowai"
    ],
    mizoram: [
      "Aizawl", "Lunglei", "Champhai"
    ],
    nagaland: [
      "Kohima", "Dimapur", "Mokokchung"
    ],
    odisha: [
      "Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"
    ],
    punjab: [
      "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Mohali"
    ],
    rajasthan: [
      "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar"
    ],
    sikkim: [
      "Gangtok", "Namchi", "Mangan", "Geyzing"
    ],
    tamil_nadu: [
      "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Erode",
      "Vellore", "Tirunelveli", "Thoothukudi", "Kanchipuram", "Thanjavur",
      "Dindigul", "Karur", "Cuddalore", "Nagapattinam"
    ],
    telangana: [
      "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam",
      "Mahbubnagar", "Adilabad", "Ramagundam", "Siddipet", "Mancherial"
    ],
    tripura: [
      "Agartala", "Udaipur", "Dharmanagar"
    ],
    uttar_pradesh: [
      "Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Meerut",
      "Ghaziabad", "Noida", "Bareilly", "Moradabad", "Aligarh", "Jhansi"
    ],
    uttarakhand: [
      "Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Roorkee", "Nainital"
    ],
    west_bengal: [
      "Kolkata", "Siliguri", "Asansol", "Durgapur", "Howrah", "Darjeeling"
    ],
    andaman_nicobar: ["Port Blair"],
    chandigarh: ["Chandigarh"],
    dadra_nagar_haveli_daman_diu: ["Silvassa", "Daman", "Diu"],
    delhi: ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh"],
    jammu_kashmir: ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
    ladakh: ["Leh", "Kargil"],
    lakshadweep: ["Kavaratti"],
    puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    other: []
  };

  const getCourseOptions = (education) => {
    const options = {
      'High-School': [
        { value: 'science-stream', label: 'Science Stream' },
        { value: 'commerce-stream', label: 'Commerce Stream' },
        { value: 'arts-humanities-stream', label: 'Arts/Humanities Stream' },
        { value: 'vocational', label: 'Vocational' },
        { value: 'other', label: 'Other' },
      ],
      'Diploma': [
        { value: 'civil-engineering', label: 'Civil Engineering' },
        { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
        { value: 'electrical-engineering', label: 'Electrical Engineering' },
        { value: 'electronics-engineering', label: 'Electronics Engineering' },
        { value: 'computer-engineering', label: 'Computer Engineering' },
        { value: 'automobile-engineering', label: 'Automobile Engineering' },
        { value: 'nursing', label: 'Nursing' },
        { value: 'pharmacy', label: 'Pharmacy' },
        { value: 'business-administration', label: 'Business Administration' },
        { value: 'information-technology', label: 'Information Technology' },
        { value: 'graphic-design', label: 'Graphic Design' },
        { value: 'hotel-management', label: 'Hotel Management' },
        { value: 'other', label: 'Other' },
      ],
      'Bachelor': [
        { value: 'B.Com', label: 'B.Com (Bachelor of Commerce)' },
        { value: 'B.Sc', label: 'B.Sc (Bachelor of Science)' },
        { value: 'B.Sc-BZC', label: 'B.Sc (Botany, Zoology, Chemistry)' },
        { value: 'B.Sc-CSE', label: 'B.Sc (Computer Science)' },
        { value: 'BE/Btech-Civil', label: 'B.E./B.Tech (Civil Engineering)' },
        { value: 'BE/Btech-Mechanical', label: 'B.E./B.Tech (Mechanical Engineering)' },
        { value: 'BE/Btech-Electrical', label: 'B.E./B.Tech (Electrical Engineering)' },
        { value: 'BE/Btech-ECE', label: 'B.E./B.Tech (Electronics and Communication)' },
        { value: 'BE/Btech-CSE', label: 'B.E./B.Tech (Computer Science Engineering)' },
        { value: 'BA', label: 'B.A. (Bachelor of Arts)' },
        { value: 'BBA', label: 'BBA (Bachelor of Business Administration)' },
        { value: 'BCA', label: 'BCA (Bachelor of Computer Applications)' },
        { value: 'B.Pharm', label: 'B.Pharm (Bachelor of Pharmacy)' },
        { value: 'B.Sc-Nursing', label: 'B.Sc (Nursing)' },
        { value: 'B.Sc-Agriculture', label: 'B.Sc (Agriculture)' },
        { value: 'Other', label: 'Other' },
      ],
      'Master': [
        { value: 'M.com', label: 'M.Com (Master of Commerce)' },
        { value: 'M.Sc-Chemistry', label: 'M.Sc (Chemistry)' },
        { value: 'M.Sc-Physics', label: 'M.Sc (Physics)' },
        { value: 'M.Sc-Mathematics', label: 'M.Sc (Mathematics)' },
        { value: 'M.Sc-Computer Science', label: 'M.Sc (Computer Science)' },
        { value: 'M.Sc-Biotechnology', label: 'M.Sc (Biotechnology)' },
        { value: 'MBA', label: 'MBA (Master of Business Administration)' },
        { value: 'M.Tech-Civil', label: 'M.Tech (Civil Engineering)' },
        { value: 'M.Tech-Mechanical', label: 'M.Tech (Mechanical Engineering)' },
        { value: 'M.Tech-CSE', label: 'M.Tech (Computer Science Engineering)' },
        { value: 'M.Tech-ECE', label: 'M.Tech (Electronics and Communication)' },
        { value: 'MA', label: 'M.A. (Master of Arts)' },
        { value: 'MCA', label: 'MCA (Master of Computer Applications)' },
        { value: 'MPH', label: 'MPH (Master of Public Health)' },
        { value: 'M.Sc-Psychology', label: 'M.Sc (Psychology)' },
        { value: 'Other', label: 'Other' },
      ],
      'Ph.D.': [
        { value: 'Ph.D.-Engineering', label: 'Ph.D. (Engineering)' },
        { value: 'Ph.D.-Physics', label: 'Ph.D. (Physics)' },
        { value: 'Ph.D.-Chemistry', label: 'Ph.D. (Chemistry)' },
        { value: 'Ph.D.-Biology', label: 'Ph.D. (Biology)' },
        { value: 'Ph.D.-Computer-Science', label: 'Ph.D. (Computer Science)' },
        { value: 'Ph.D.-Mathematics', label: 'Ph.D. (Mathematics)' },
        { value: 'Ph.D.-Psychology', label: 'Ph.D. (Psychology)' },
        { value: 'Ph.D.-Education', label: 'Ph.D. (Education)' },
        { value: 'Ph.D.-Management', label: 'Ph.D. (Management)' },
        { value: 'Ph.D.-Arts', label: 'Ph.D. (Arts)' },
        { value: 'Other', label: 'Other' },
      ],
      'Professional': [
        { value: 'MD', label: 'MD (Doctor of Medicine)' },
        { value: 'JD', label: 'JD (Juris Doctor - Law)' },
        { value: 'DDS', label: 'DDS (Doctor of Dental Surgery)' },
        { value: 'PharmD', label: 'PharmD (Doctor of Pharmacy)' },
        { value: 'DVM', label: 'DVM (Doctor of Veterinary Medicine)' },
        { value: 'CA', label: 'CA (Chartered Accountancy)' },
        { value: 'CFA', label: 'CFA (Chartered Financial Analyst)' },
        { value: 'CPA', label: 'CPA (Certified Public Accountant)' },
        { value: 'Other', label: 'Other' },
      ],
    };
    return options[education] || [];
  };

  useEffect(() => {
    const fetchReligions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/religions`);
        setReligions(response.data.map((item) => item.name));
        if (response.data.length === 0) {
          toast.warning('No religions found in the database.');
        }
      } catch (error) {
        toast.error('Failed to fetch religions: ' + error.message);
      }
    };

    const fetchCommunities = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/communities`);
        setCommunities(response.data.map((item) => item.name));
        if (response.data.length === 0) {
          toast.warning('No communities found in the database.');
        }
      } catch (error) {
        toast.error('Failed to fetch communities: ' + error.message);
      }
    };

    fetchReligions();
    fetchCommunities();
  }, []);

  const validateField = (field, value) => {
    switch (field) {
      case "accountFor":
        return value ? "" : "Please select who this account is for";
      case "name":
        return value ? "" : "Please enter your full name";
      case "email":
        if (!value) return "Please enter your email address";
        // Email: No numbers in domain or TLD
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? ""
          : "Please enter a valid email address (e.g., user@example.com, no numbers in domain or TLD)";
      case "mobile":
        if (!value) return "Please enter your mobile number";
        // Mobile: Must start with 6, 7, 8, or 9, followed by 9-14 digits, spaces, or hyphens
        return /^[6-9][\d\s-]{9,14}$/.test(value)
          ? ""
          : "Please enter a valid mobile number starting with 6, 7, 8, or 9 (10-15 digits)";
      case "gender":
        return value ? "" : "Please select your gender";
      case "lookingFor":
        return value ? "" : "Please select who you are looking for";
      case "birthDay":
        return value ? "" : "Please select your birth day";
      case "birthMonth":
        return value ? "" : "Please select your birth month";
      case "birthYear":
        return value ? "" : "Please select your birth year";
      case "height":
        return value ? "" : "Please select your height";
      case "maritalStatus":
        return value ? "" : "Please select your marital status";
      case "religion":
        return value ? "" : "Please select your religion";
      case "community":
        return value ? "" : "Please select your community";
      case "motherTongue":
        return value ? "" : "Please select your mother tongue";
      case "education":
        return value ? "" : "Please select your education level";
      case "fieldOfStudy":
        return formData.education && formData.education !== "other" && !value
          ? "Please select your field of study"
          : "";
      case "otherEducation":
        return formData.education === "other" && !value
          ? "Please specify your education details"
          : "";
      case "occupation":
        return value ? "" : "Please select your occupation";
      case "income":
        return value ? "" : "Please select your income range";
      case "state":
        return value ? "" : "Please select your state";
      case "city":
        return value ? "" : "Please enter or select your city";
      case "otp":
        if (!otpSent) return "";
        return value.length === 6 && /^\d{6}$/.test(value)
          ? ""
          : "Please enter a valid 6-digit OTP";
      case "password":
        if (!value) return "Please create a password";
        return value.length >= 6 ? "" : "Password must be at least 6 characters long";
      case "confirmPassword":
        if (!value) return "Please re-enter your password";
        return value === formData.password ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Validate the field in real-time
    const errorMessage = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));

    if (field === "city") {
      if (value.length > 0) {
        const availableCities = stateCities[formData.state] || indianCities;
        const filtered = availableCities
          .filter((city) => city.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 10);
        setFilteredCities(filtered);
        setShowCityDropdown(true);
      } else {
        setShowCityDropdown(false);
      }
    }

    if (field === "education" && value !== formData.education) {
      setFormData((prev) => ({ ...prev, fieldOfStudy: "", otherEducation: "" }));
      setErrors((prev) => ({
        ...prev,
        fieldOfStudy: validateField("fieldOfStudy", ""),
        otherEducation: validateField("otherEducation", ""),
      }));
    }

    // Validate dependent fields
    if (field === "password") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField("confirmPassword", formData.confirmPassword),
      }));
    }
    if (field === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField("confirmPassword", value),
      }));
    }
  };

  const handleMobileKeyDown = (e) => {
    const allowedKeys = [
      "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter", " ", "-"
    ];
    // Allow only 6, 7, 8, 9 for the first character if the input is empty
    if (formData.mobile.length === 0 && !["6", "7", "8", "9"].includes(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
    // Allow digits, spaces, and hyphens for subsequent characters
    else if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const selectCity = (city) => {
    setFormData((prev) => ({ ...prev, city }));
    setErrors((prev) => ({ ...prev, city: validateField("city", city) }));
    setShowCityDropdown(false);
  };

  const sendOTP = async (retries = 3, delay = 2000) => {
    const emailError = validateField("email", formData.email);
    if (!emailError) {
      setIsLoading(true);
      setError(null);
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await fetch(`${BASE_URL}/api/send-email-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
          });
          const data = await response.json();
          if (response.ok) {
            setOtpSent(true);
            setOtpButtonDisabled(true);
            setIsLoading(false);
            toast.success(
              `${data.message}\nCheck backend console for OTP (development only).`
            );
            return;
          } else {
            setError(data.error || "Failed to send OTP");
          }
        } catch (error) {
          if (attempt === retries) {
            setError(
              "Failed to connect to server. Please ensure the backend server is running on http://localhost:5000 and check your network."
            );
          } else {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
      setIsLoading(false);
    } else {
      setErrors((prev) => ({ ...prev, email: emailError }));
    }
  };

  const verifyOTP = async () => {
    const otpError = validateField("otp", formData.otp);
    if (!otpError) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/api/verify-email-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp: formData.otp }),
        });
        const data = await response.json();
        if (response.ok) {
          setSuccess("✅ OTP verified successfully!");
          setErrors((prev) => ({ ...prev, otp: "" }));
          setTimeout(() => setSuccess(null), 3000);
          return true;
        } else {
          setErrors((prev) => ({ ...prev, otp: data.error || "Invalid OTP" }));
          return false;
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          otp: "Failed to verify OTP. Please ensure the backend server is running and check your network."
        }));
        return false;
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors((prev) => ({ ...prev, otp: otpError }));
      return false;
    }
  };

  const validateStep = () => {
    const newErrors = {};
    switch (step) {
      case 1:
        newErrors.accountFor = validateField("accountFor", formData.accountFor);
        newErrors.name = validateField("name", formData.name);
        newErrors.email = validateField("email", formData.email);
        newErrors.mobile = validateField("mobile", formData.mobile);
        newErrors.gender = validateField("gender", formData.gender);
        newErrors.lookingFor = validateField("lookingFor", formData.lookingFor);
        break;
      case 2:
        newErrors.birthDay = validateField("birthDay", formData.birthDay);
        newErrors.birthMonth = validateField("birthMonth", formData.birthMonth);
        newErrors.birthYear = validateField("birthYear", formData.birthYear);
        newErrors.height = validateField("height", formData.height);
        newErrors.maritalStatus = validateField("maritalStatus", formData.maritalStatus);
        break;
      case 3:
        newErrors.religion = validateField("religion", formData.religion);
        newErrors.community = validateField("community", formData.community);
        newErrors.motherTongue = validateField("motherTongue", formData.motherTongue);
        break;
      case 4:
        newErrors.education = validateField("education", formData.education);
        newErrors.fieldOfStudy = validateField("fieldOfStudy", formData.fieldOfStudy);
        newErrors.otherEducation = validateField("otherEducation", formData.otherEducation);
        newErrors.occupation = validateField("occupation", formData.occupation);
        newErrors.income = validateField("income", formData.income);
        newErrors.state = validateField("state", formData.state);
        newErrors.city = validateField("city", formData.city);
        break;
      case 5:
        newErrors.email = validateField("email", formData.email);
        newErrors.otp = validateField("otp", formData.otp);
        newErrors.password = validateField("password", formData.password);
        newErrors.confirmPassword = validateField("confirmPassword", formData.confirmPassword);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.values(newErrors).every((error) => !error);
  };

  // Check if the current step has any errors
  const hasStepErrors = () => {
    const stepFields = {
      1: ["accountFor", "name", "email", "mobile", "gender", "lookingFor"],
      2: ["birthDay", "birthMonth", "birthYear", "height", "maritalStatus"],
      3: ["religion", "community", "motherTongue"],
      4: ["education", "fieldOfStudy", "otherEducation", "occupation", "income", "state", "city"],
      5: ["email", "otp", "password", "confirmPassword"],
    };
    return stepFields[step].some((field) => errors[field]);
  };

  const nextStep = () => {
    if (validateStep() && step < 5) {
      setStep(step + 1);
      setError(null);
    } else {
      setError("Please fill in all required fields correctly.");
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsLoading(true);
      setError(null);
      try {
        if (otpSent) {
          const isOtpValid = await verifyOTP();
          if (!isOtpValid) {
            setIsLoading(false);
            return;
          }
        }

        const submitButton = document.querySelector("[data-submit-btn]");
        if (submitButton) {
          submitButton.textContent = "Creating Profile...";
        }

        const profileData = {
          personalInfo: {
            accountFor: formData.accountFor,
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            gender: formData.gender,
            lookingFor: formData.lookingFor,
          },
          demographics: {
            dateOfBirth: `${formData.birthDay}-${formData.birthMonth}-${formData.birthYear}`,
            height: formData.height,
            maritalStatus: formData.maritalStatus,
            religion: formData.religion,
            community: formData.community,
            motherTongue: formData.motherTongue,
          },
          professionalInfo: {
            education: formData.education,
            fieldOfStudy: formData.fieldOfStudy,
            otherEducation: formData.otherEducation,
            occupation: formData.occupation,
            income: formData.income,
          },
          location: {
            city: formData.city,
            state: formData.state,
          },
          credentials: {
            password: formData.password,
            rememberMe: formData.rememberMe,
          },
          subscription: "free",
          profileCreatedAt: new Date().toISOString(),
          appVersion: "v2.1.3",
        };

        const response = await fetch(`${BASE_URL}/api/create-profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(
            `🎉 Congratulations ${formData.name}! Your profile has been created successfully! You can now log in.`
          );
          setFormData({
            accountFor: "",
            name: "",
            email: "",
            mobile: "",
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
            fieldOfStudy: "",
            otherEducation: "",
            occupation: "",
            income: "",
            city: "",
            state: "",
            otp: "",
            password: "",
            confirmPassword: "",
            rememberMe: false,
          });
          setStep(1);
          setOtpSent(false);
          setOtpButtonDisabled(false);
          setErrors({});
        } else {
          throw new Error(data.error || "Failed to create profile");
        }
      } catch (error) {
        setError(
          error.message ||
          "Failed to create profile. Please ensure the backend server is running and try again."
        );
      } finally {
        const submitButton = document.querySelector("[data-submit-btn]");
        if (submitButton) {
          submitButton.textContent = "Submit ✅";
        }
        setIsLoading(false);
      }
    } else {
      setError("Please fill in all required fields correctly.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-orange-100 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">
                Public Matrimony
              </CardTitle>
              <CardDescription>
                Step {step} of 5 - Create your profile
              </CardDescription>
              <div className="text-xs text-gray-500 mb-2">
                App Version: v2.1.3
              </div>
              <div className="flex items-center justify-center mt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        i <= step ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {i}
                    </div>
                    {i < 5 && (
                      <div
                        className={`w-6 h-0.5 ${i < step ? "bg-orange-500" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              {success && <div className="text-green-500 text-sm mt-2">{success}</div>}
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="accountFor">This account is for</Label>
                    <Select
                      value={formData.accountFor}
                      onValueChange={(value) => handleInputChange("accountFor", value)}
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="myself">Myself</SelectItem>
                        <SelectItem value="son">Son</SelectItem>
                        <SelectItem value="daughter">Daughter</SelectItem>
                        <SelectItem value="sister">Sister</SelectItem>
                        <SelectItem value="brother">Brother</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.accountFor && (
                      <p className="text-red-500 text-xs mt-1">{errors.accountFor}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="border-orange-200 focus:border-orange-400"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      className="border-orange-200 focus:border-orange-400"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      inputMode="numeric"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      onKeyDown={handleMobileKeyDown}
                      maxLength={15}
                      placeholder="Enter your mobile number"
                      className="border-orange-200 focus:border-orange-400"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lookingFor">Looking For</Label>
                    <Select
                      value={formData.lookingFor}
                      onValueChange={(value) => handleInputChange("lookingFor", value)}
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Looking for" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.lookingFor && (
                      <p className="text-red-500 text-xs mt-1">{errors.lookingFor}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Date of Birth</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Select
                          value={formData.birthDay}
                          onValueChange={(value) => handleInputChange("birthDay", value)}
                        >
                          <SelectTrigger className="border-orange-200 focus:border-orange-400">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 31 }, (_, i) => (
                              <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                {String(i + 1).padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.birthDay && (
                          <p className="text-red-500 text-xs mt-1">{errors.birthDay}</p>
                        )}
                      </div>
                      <div>
                        <Select
                          value={formData.birthMonth}
                          onValueChange={(value) => handleInputChange("birthMonth", value)}
                        >
                          <SelectTrigger className="border-orange-200 focus:border-orange-400">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ].map((month, i) => (
                              <SelectItem key={month} value={String(i + 1).padStart(2, "0")}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.birthMonth && (
                          <p className="text-red-500 text-xs mt-1">{errors.birthMonth}</p>
                        )}
                      </div>
                      <div>
                        <Select
                          value={formData.birthYear}
                          onValueChange={(value) => handleInputChange("birthYear", value)}
                        >
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
                        {errors.birthYear && (
                          <p className="text-red-500 text-xs mt-1">{errors.birthYear}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="height">Height</Label>
                    <Select
                      value={formData.height}
                      onValueChange={(value) => handleInputChange("height", value)}
                    >
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
                    {errors.height && (
                      <p className="text-red-500 text-xs mt-1">{errors.height}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) => handleInputChange("maritalStatus", value)}
                    >
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
                    {errors.maritalStatus && (
                      <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="religion">Religion</Label>
                    <Select
                      value={formData.religion}
                      onValueChange={(value) => handleInputChange("religion", value)}
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        {religions.map((religion) => (
                          <SelectItem key={religion} value={religion}>
                            {religion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.religion && (
                      <p className="text-red-500 text-xs mt-1">{errors.religion}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="community">Community</Label>
                    <Select
                      value={formData.community}
                      onValueChange={(value) => handleInputChange("community", value)}
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select community" />
                      </SelectTrigger>
                      <SelectContent>
                        {communities.map((community) => (
                          <SelectItem key={community} value={community}>
                            {community}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.community && (
                      <p className="text-red-500 text-xs mt-1">{errors.community}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="motherTongue">Mother Tongue</Label>
                    <Select
                      value={formData.motherTongue}
                      onValueChange={(value) => handleInputChange("motherTongue", value)}
                    >
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
                    {errors.motherTongue && (
                      <p className="text-red-500 text-xs mt-1">{errors.motherTongue}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Select
                      value={formData.education}
                      onValueChange={(value) => handleInputChange("education", value)}
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High-School">High School</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="Master">Master's Degree</SelectItem>
                        <SelectItem value="Ph.D.">PhD</SelectItem>
                        <SelectItem value="Professional">Professional Degree</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.education && (
                      <p className="text-red-500 text-xs mt-1">{errors.education}</p>
                    )}
                  </div>

                  {formData.education && formData.education !== 'other' && (
                    <div>
                      <Label htmlFor="fieldOfStudy">Field of Study</Label>
                      <Select
                        value={formData.fieldOfStudy}
                        onValueChange={(value) => handleInputChange("fieldOfStudy", value)}
                      >
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="Select field of study" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCourseOptions(formData.education).map((course) => (
                            <SelectItem key={course.value} value={course.value}>
                              {course.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.fieldOfStudy && (
                        <p className="text-red-500 text-xs mt-1">{errors.fieldOfStudy}</p>
                      )}
                    </div>
                  )}

                  {formData.education === 'other' && (
                    <div>
                      <Label htmlFor="otherEducation">Specify Other Education</Label>
                      <Input
                        id="otherEducation"
                        value={formData.otherEducation}
                        onChange={(e) => handleInputChange('otherEducation', e.target.value)}
                        placeholder="Enter your education details"
                        className="border-orange-200 focus:border-orange-400"
                      />
                      {errors.otherEducation && (
                        <p className="text-red-500 text-xs mt-1">{errors.otherEducation}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select
                      value={formData.occupation}
                      onValueChange={(value) => handleInputChange("occupation", value)}
                    >
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
                    {errors.occupation && (
                      <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="income">Annual Income</Label>
                    <Select
                      value={formData.income}
                      onValueChange={(value) => handleInputChange("income", value)}
                    >
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
                    {errors.income && (
                      <p className="text-red-500 text-xs mt-1">{errors.income}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => {
                          handleInputChange("state", value);
                          setFilteredCities([]);
                          handleInputChange("city", "");
                        }}
                      >
                        <SelectTrigger className="border-orange-200 focus:border-orange-400">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="andhra_pradesh">Andhra Pradesh</SelectItem>
                          <SelectItem value="arunachal_pradesh">Arunachal Pradesh</SelectItem>
                          <SelectItem value="assam">Assam</SelectItem>
                          <SelectItem value="bihar">Bihar</SelectItem>
                          <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                          <SelectItem value="goa">Goa</SelectItem>
                          <SelectItem value="gujarat">Gujarat</SelectItem>
                          <SelectItem value="haryana">Haryana</SelectItem>
                          <SelectItem value="himachal_pradesh">Himachal Pradesh</SelectItem>
                          <SelectItem value="jharkhand">Jharkhand</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                          <SelectItem value="madhya_pradesh">Madhya Pradesh</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="manipur">Manipur</SelectItem>
                          <SelectItem value="meghalaya">Meghalaya</SelectItem>
                          <SelectItem value="mizoram">Mizoram</SelectItem>
                          <SelectItem value="nagaland">Nagaland</SelectItem>
                          <SelectItem value="odisha">Odisha</SelectItem>
                          <SelectItem value="punjab">Punjab</SelectItem>
                          <SelectItem value="rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="sikkim">Sikkim</SelectItem>
                          <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                          <SelectItem value="tripura">Tripura</SelectItem>
                          <SelectItem value="uttar_pradesh">Uttar Pradesh</SelectItem>
                          <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                          <SelectItem value="west_bengal">West Bengal</SelectItem>
                          <SelectItem value="andaman_nicobar">Andaman & Nicobar Islands</SelectItem>
                          <SelectItem value="chandigarh">Chandigarh</SelectItem>
                          <SelectItem value="dadra_nagar_haveli_daman_diu">
                            Dadra & Nagar Haveli and Daman & Diu
                          </SelectItem>
                          <SelectItem value="delhi">Delhi (NCT)</SelectItem>
                          <SelectItem value="jammu_kashmir">Jammu & Kashmir</SelectItem>
                          <SelectItem value="ladakh">Ladakh</SelectItem>
                          <SelectItem value="lakshadweep">Lakshadweep</SelectItem>
                          <SelectItem value="puducherry">Puducherry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>

                    <div className="relative">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Enter city"
                        className="border-orange-200 focus:border-orange-400"
                        onFocus={() => {
                          const availableCities = stateCities[formData.state] || indianCities;
                          const filtered = availableCities.slice(0, 10);
                          setFilteredCities(filtered);
                          setShowCityDropdown(true);
                        }}
                        onBlur={() => {
                          setTimeout(() => setShowCityDropdown(false), 200);
                        }}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                      {showCityDropdown && filteredCities.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                          {filteredCities.map((city, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 hover:bg-orange-50 cursor-pointer text-sm"
                              onClick={() => selectCity(city)}
                            >
                              {city}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      className="border-orange-200 focus:border-orange-400"
                      disabled={otpSent || isLoading}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      🔒 Your email stays secure and private
                    </p>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={() => sendOTP()}
                      disabled={
                        otpButtonDisabled ||
                        isLoading ||
                        !!errors.email
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium"
                    >
                      {isLoading ? "Sending..." : "Verify Your Email"}
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      We'll send an OTP to verify your email
                    </p>
                  </div>
                  {otpSent && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label htmlFor="otp">Enter OTP</Label>
                          <Input
                            id="otp"
                            value={formData.otp}
                            onChange={(e) => handleInputChange("otp", e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="border-orange-200 focus:border-orange-400 text-center font-mono text-lg"
                            maxLength={6}
                            disabled={isLoading}
                          />
                          {errors.otp && (
                            <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
                          )}
                        </div>
                        <Button
                          onClick={verifyOTP}
                          variant="outline"
                          className="h-10"
                          disabled={
                            isLoading ||
                            !!errors.otp
                          }
                        >
                          {isLoading ? "Verifying..." : "Verify OTP"}
                        </Button>
                      </div>
                      <p className="text-xs text-center text-gray-500">
                        Didn't receive OTP?{" "}
                        <button
                          className="text-orange-600 hover:underline"
                          onClick={() => {
                            setOtpButtonDisabled(false);
                            sendOTP();
                          }}
                          disabled={isLoading}
                        >
                          Resend
                        </button>
                      </p>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="password">Create Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Create password"
                      className="border-orange-200 focus:border-orange-400"
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Re-enter Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Re-enter password"
                      className="border-orange-200 focus:border-orange-400"
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                      className="accent-orange-500 w-4 h-4"
                      disabled={isLoading}
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                      Remember me
                    </Label>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                {step > 1 && (
                  <Button variant="outline" onClick={prevStep} disabled={isLoading}>
                    ⬅ Back
                  </Button>
                )}
                {step < 5 ? (
                  <Button
                    onClick={nextStep}
                    disabled={isLoading || hasStepErrors()}
                    className={`ml-auto bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFC300] hover:to-[#FF8C00] text-white font-semibold rounded-md px-6 py-2 transition duration-300 ${
                      isLoading || hasStepErrors() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Continue ➡
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    data-submit-btn
                    className="ml-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-md px-6 py-2"
                    disabled={isLoading || hasStepErrors()}
                  >
                    {isLoading ? "Creating..." : "Submit ✅"}
                  </Button>
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