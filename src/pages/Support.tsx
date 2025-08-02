
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, User, ArrowDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });

  const faqs = [
    {
      question: "How do I create a profile on KannadaMatch?",
      answer: "Click on 'Join Free' button and follow the 3-step registration process. You'll need to provide basic details, verify your mobile number, and complete your profile with photos and preferences."
    },
    {
      question: "How are profiles verified?",
      answer: "We verify profiles through document verification (Aadhaar/PAN), mobile number verification, and manual review by our team. Verified profiles get a green verification badge."
    },
    {
      question: "Can I contact members directly?",
      answer: "Free members can send interests only. Premium members can view contact details and chat directly with other members. All communications are secure and private."
    },
    {
      question: "How does the matching algorithm work?",
      answer: "Our algorithm considers factors like age, location, community, education, profession, and personal preferences to suggest compatible matches. Premium members also get horoscope matching."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we use advanced security measures to protect your data. Your contact details are only visible to premium members, and you control who can see your profile information."
    },
    {
      question: "What if I face any issues with another member?",
      answer: "You can report any inappropriate behavior through the 'Report' button on profiles. Our team reviews all reports within 24 hours and takes appropriate action."
    },
    {
      question: "How do I cancel my membership?",
      answer: "You can cancel your membership anytime from your account settings. For premium memberships, you can contact our support team for assistance with cancellation and refunds."
    },
    {
      question: "Can I hide my profile temporarily?",
      answer: "Yes, you can make your profile invisible from the privacy settings. This will hide your profile from search results while keeping your account active."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Help & Support</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help you find your perfect match. Get answers to common questions or reach out to our support team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                  <Mail size={24} className="text-orange-500" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="border-orange-200 focus:border-orange-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="payment">Payment & Billing</SelectItem>
                      <SelectItem value="profile">Profile Related</SelectItem>
                      <SelectItem value="matching">Matching Issues</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="report">Report a Member</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of your query"
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please describe your issue in detail..."
                    rows={6}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Send Message
                </Button>

                <div className="text-center pt-4 border-t border-orange-100">
                  <p className="text-sm text-gray-600 mb-2">Need immediate help?</p>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    WhatsApp Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                  <User size={24} className="text-orange-500" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-orange-100 rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:text-orange-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6 border-orange-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="text-gray-600 ml-2">support@kannadamatch.com</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="text-gray-600 ml-2">+91 80-4567-8900</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">WhatsApp:</span>
                    <span className="text-gray-600 ml-2">+91 80-4567-8901</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Support Hours:</span>
                    <span className="text-gray-600 ml-2">24/7 (Chat & WhatsApp)</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Office Address:</span>
                    <span className="text-gray-600 ml-2">KannadaMatch Pvt Ltd, Brigade Road, Bangalore - 560001</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;
